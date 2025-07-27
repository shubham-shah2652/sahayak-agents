import os
from PIL import Image
from PyPDF2 import PdfReader
# import pytesseract
import google.genai as genai
from google.adk.agents import Agent
from dotenv import load_dotenv
load_dotenv()
from firebase_admin import credentials, firestore
import firebase_admin
from google.cloud import firestore


# genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
cred = credentials.Certificate(os.getenv("FIREBASE_JSON_PATH"))
firebase_admin.initialize_app(cred)


def extract_text_from_pdf(file_path: str) -> dict:
    """Extracts text from a student's PDF file."""
    try:
        reader = PdfReader(file_path)
        text = "\n".join([page.extract_text() or "" for page in reader.pages])
        return {"status": "success", "text": text.strip()}
    except Exception as e:
        return {"status": "error", "error_message": f"PDF extraction failed: {str(e)}"}
    


def extract_text_from_image(image_path: str) -> dict:
    """Uses Gemini Vision to extract and describe text from an image."""
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        image = Image.open(image_path)
        response = model.generate_content(["Extract all visible written text from this image:", image])
        return {"status": "success", "text": response.text.strip()}
    except Exception as e:
        return {"status": "error", "error_message": f"Gemini Vision failed: {str(e)}"}



def list_all_assignments() -> dict:
    try:
        db = firestore.Client()
        collection_ref = db.collection("assignments")
        docs = collection_ref.stream()
        courses = []
        for doc in docs:
            data = doc.to_dict()
            data["id"] = doc.id  # add ID
            courses.append(data)
        return {"status": "success", "assignments": courses}
    except Exception as e:
        return {"status": "error", "error_message": str(e)}


def grade_combined_answer(answer_text: str, rubric: str) -> dict:
    """Grades the student's answer using a rubric via Gemini."""
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        prompt = f"""
        You are a grading assistant. Grade the following student's answer using the rubric.

        Rubric:
        {rubric}

        Answer:
        {answer_text}

        Respond in JSON format:
        {{"student_name": string, "assignment_name": string, "score": float (out of 20), "feedback": as markdown in string}}
        """
        response = model.generate_content(prompt).text
        return {"status": "success", "grading": response}
    except Exception as e:
        return {"status": "error", "error_message": f"Grading failed: {str(e)}"}


grader_agent = Agent(
    name="pdf_image_grader",
    model="gemini-2.0-flash",
    description="Agent that grades student answers from PDFs and images based on a rubric.",
    instruction=(
        "You are a helpful academic assistant. You can extract answers from student-submitted PDF and image files, "
        "combine the text, and grade the answer using a defined rubric. "\
        "Call extract_text_from_pdf or extract_text_from_image to extract content, "\
        "use list_all_assignments to get 'questions' which are being answered by the students to get the context."
        "then grade_combined_answer."
    ),
    tools=[extract_text_from_pdf, extract_text_from_image, grade_combined_answer,list_all_assignments],
    output_key="grading"
)



def list_all_students() -> dict:
    try:
        db = firestore.Client()
        collection_ref = db.collection("students")
        docs = collection_ref.stream()
        courses = []
        for doc in docs:
            data = doc.to_dict()
            data["id"] = doc.id  # add ID
            courses.append(data)
        return {"status": "success", "students": courses}
    except Exception as e:
        return {"status": "error", "error_message": str(e)}
    

def store_grading_result(student_id: str, 
                         student_name: str, 
                         assignment_id: float, 
                         assignment_name: str, 
                         score: float, 
                         feedback: str,
                         clarity: str,
                         correctness: str,
                         structure: str,
                         originality: str,
                         ) -> dict:
    """Stores the grading result in Firestore under the student's document."""
    try:
        db = firestore.Client()
        doc_ref = db.collection("student_grades").document(student_id)
        doc_ref.set({
            "student_id": student_id,
            "student_name": student_name, 
            "assignment_id": assignment_id, 
            "assignment_name": assignment_name, 
            "score": score,
            "feedback": feedback,
            "clarity": clarity,
            "correctness": correctness, 
            "structure": structure,
            "originality": originality
        })
        return {"status": "success", "message": f"Stored for student {student_id}."}
    except Exception as e:
        return {"status": "error", "error_message": str(e)}


firestore_agent = Agent(
    name="firestore_agent",
    model="gemini-2.0-flash",
    description="Stores grading results in Firestore.",
    instruction=(
        "You store grading results in Firestore. Use the tool to save a student's score and overall feedback from {grading}. Use {grading} to capture" \
        "clarity, correctness, structure and originaliry scores, along with comprehensive feedback for each of the 4 evaluation metrics." \
        "use 'list_all_students' to find the correct student_id against student_name, save both in the db"\
        "use 'list_all_assignments' to find the assignment_id against the assignment_name, save all values in db using 'students_grades' db"
    ),
    tools=[store_grading_result, list_all_assignments, list_all_students]
)


# sequential_grader_pipeline.py
from google.adk.agents import SequentialAgent

sequential_grader = SequentialAgent(
    name="grading_pipeline",
    description="Grades the student's assignment and stores it in Firestore.",
    sub_agents=[grader_agent,firestore_agent,],
)



