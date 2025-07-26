import os
from firebase_admin import credentials, firestore
import firebase_admin
from google.cloud import firestore
from google.adk.agents import Agent
from dotenv import load_dotenv
import google.generativeai as genai

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


cred = credentials.Certificate(os.getenv("FIREBASE_JSON_PATH"))
firebase_admin.initialize_app(cred)

def store_grading_result(student_id: str, 
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
        "clarity, correctness, structure and originaliry scores, along with comprehensive feedback for each of the 4 evaluation metrics."
    ),
    tools=[store_grading_result]
)
