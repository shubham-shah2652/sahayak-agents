import os
from firebase_admin import credentials, firestore
import firebase_admin
from google.cloud import firestore
from google.adk.agents import Agent, LlmAgent
from dotenv import load_dotenv
import google.generativeai as genai

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


# cred = credentials.Certificate(os.getenv("FIREBASE_JSON_PATH"))
# firebase_admin.initialize_app(cred)

# firebase_fetch_agent.py
def get_courses_by_grade(course_id: str) -> dict:
    """Fetches the grading result for a specific student from Firestore."""
    try:
        db = firestore.Client()
        doc_ref = db.collection("courses").document(course_id)
        doc = doc_ref.get()
        if doc.exists:
            return {"status": "success", "data": doc.to_dict()}
        else:
            return {"status": "error", "error_message": f"No course found for {course_id}"}
    except Exception as e:
        return {"status": "error", "error_message": str(e)}


def list_all_courses() -> dict:
    try:
        db = firestore.Client()
        collection_ref = db.collection("courses")
        docs = collection_ref.stream()
        courses = []
        for doc in docs:
            data = doc.to_dict()
            data["id"] = doc.id  # add ID
            courses.append(data)
        return {"status": "success", "courses": courses}
    except Exception as e:
        return {"status": "error", "error_message": str(e)}


firebase_fetch_agent = Agent(
    name="firebase_fetch_agent",
    model="gemini-2.0-flash",
    instruction=(
        "You can fetch student courses data from Firestore and Return all the courses with ids, subject matter and grade level"
    ),
    tools=[list_all_courses],
    output_key='courses'
)

def store_assignments(course_id: str, assignment_id: str, questions: str) -> dict:
    """Stores the assignments in Firestore in a new document."""
    try:
        db = firestore.Client()
        doc_ref = db.collection("assignments").document(assignment_id)
        doc_ref.set({
            "course_id": course_id,
            "assignment_id": assignment_id,
            "questions": questions
        })
        return {"status": "success", "message": f"Stored for course {course_id}."}
    except Exception as e:
        return {"status": "error", "error_message": str(e)}


assignment_generator_agent = LlmAgent(
    name="assignment_generator_agent",
    model="gemini-2.0-flash",
    instruction=(
        "You are given a list of courses in {courses}. For each course, generate 10 assignment with 20 questions each.\n"
        "- 10 questions should be easy, 7 medium, and 3 hard.\n"
        "- The assignment should be relevant to the subject and grade level.\n"
        "- Call 'store_assignments' for each course, passing course_id, assignment_id (unique), and questions as a string.\n"
        "Each course dictionary in {courses} has keys: 'id', 'subject', 'grade_level'."
    ),
    tools=[store_assignments],
)