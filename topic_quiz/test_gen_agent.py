import os
from firebase_admin import credentials, firestore
import firebase_admin
from google.cloud import firestore
from google.adk.agents import Agent, LlmAgent
from dotenv import load_dotenv
import google.generativeai as genai
import PyPDF2
# from drive_utils import get_curriculum_file
from google.adk.agents import SequentialAgent
load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

try:
    app = firebase_admin.get_app()
except ValueError:
    cred = credentials.Certificate(os.getenv("FIREBASE_JSON_PATH"))
    app = firebase_admin.initialize_app(cred)

# firebase_fetch_agent.py
# def get_courses_by_grade(course_id: str) -> dict:
#     """Fetches the grading result for a specific student from Firestore."""
#     try:
#         db = firestore.Client()
#         doc_ref = db.collection("courses").document(course_id)
#         doc = doc_ref.get()
#         if doc.exists:
#             return {"status": "success", "data": doc.to_dict()}
#         else:
#             return {"status": "error", "error_message": f"No course found for {course_id}"}
#     except Exception as e:
#         return {"status": "error", "error_message": str(e)}


# def list_all_courses() -> dict:
#     try:
#         db = firestore.Client()
#         collection_ref = db.collection("courses")
#         docs = collection_ref.stream()
#         courses = []
#         for doc in docs:
#             data = doc.to_dict()
#             data["id"] = doc.id  # add ID
#             courses.append(data)
#         return {"status": "success", "courses": courses}
#     except Exception as e:
#         return {"status": "error", "error_message": str(e)}


def list_teachers_and_subjects_in_class() -> dict:
    """
    Lists all teacher IDs for a given class.
    
    Args:
        class_id (str): e.g., 'class_5'
        
    Returns:
        dict: {'status': 'success', 'teachers': ['T001', 'T002']} or error
    """
    try:
        db = firestore.Client()
        teachers_ref = db.collection("classes").document("class_5").collection("teachers")
        docs = teachers_ref.stream()
        teacher_ids = [doc.id for doc in docs]
        for teacher_id in teacher_ids:
            subject_ref = db.collection("classes").document("class_5").collection("teachers").document(teacher_id).collection("subjects")
            docs = subject_ref.stream()
            subject_names = [doc.id for doc in docs]
        return {"status": "success", "teachers": teacher_ids, "subjects": subject_names}
    except Exception as e:
        return {"status": "error", "error_message": str(e)}

def list_topics_for_teacher(class_id: str, teacher_id: str, subject_name:str) -> dict:
    """
    Lists all subject names for a given teacher in a class.
    
    Args:
        class_id (str): e.g., 'class_5'
        teacher_id (str): e.g., 'T001'
        
    Returns:
        dict: {'status': 'success', 'subjects': ['Mathematics', 'Science']} or error
    """
    try:
        db = firestore.Client()
        topics_ref = db.collection("classes").document("class_5") \
            .collection("teachers").document(teacher_id)\
            .collection("subjects").document(subject_name).collection('topics')
        topics = topics_ref.stream()
        topic_ids = [doc.id for doc in topics]
        return {"status": "success", "subjects": topic_ids}
    except Exception as e:
        return {"status": "error", "error_message": str(e)}


# firebase_fetch_agent = Agent(
#     name="firebase_fetch_agent",
#     model="gemini-2.0-flash",
#     instruction=(
#         "You can fetch student courses data from Firestore and Return all the courses with ids, subject matter and grade level"
#     ),
#     tools=[list_teachers_in_class, list_subjects_for_teacher],
#     output_key='courses'
# )



# def store_assignments(subject: str, test_id: str, test_name: str, questions: str) -> dict:
#     """Stores the assignments in Firestore in a new document."""
#     try:
#         db = firestore.Client()
#         doc_ref = db.collection(subject).document(test_id)
#         doc_ref.set({
#             # "course_id": course_id,
#             "test_id": test_id,
#             "test_name": test_name,
#             "questions": questions
#         })
#         return {"status": "success", "message": f"Stored for course {course_id}."}
#     except Exception as e:
#         return {"status": "error", "error_message": str(e)}

def get_topic_data(test_id: str, teacher_id:str, subject_name: str, topic_id: str, test_name: str, questions: str) -> dict:
    """
    Stores the assignment in Firestore under:
    /classes/class_5/teachers/T001/subjects/Mathematics/topics/{test_id}
    
    Args:
        test_id (str): The document ID for the test.
        test_name (str): The name/title of the test.
        questions (str): A string with the assignment questions.
        
    Returns:
        dict: Status of the operation.
    """
    try:
        db = firestore.Client()
        doc_ref = db.collection("classes").document("class_5") \
            .collection("teachers").document(teacher_id) \
            .collection("subjects").document(subject_name) \
            .collection("topics").document(topic_id)

        doc = doc_ref.get()
        if doc.exists:
            doc.to_dict()
            doc["topic_id"] = topic_id
            return {"status": "success", "data": doc.to_dict()}
        else:
            return {"status": "error", "error_message": f"No course found for {topic_id}"}
    except Exception as e:
        return {"status": "error", "error_message": str(e)}


def store_assignments(quiz_id: str, teacher_id:str, subject_name: str, topic_id: str, questions: str) -> dict:
    """
    Stores the assignment in Firestore under:
    /classes/class_5/teachers/T001/subjects/Mathematics/topics/{test_id}
    
    Args:
        test_id (str): The document ID for the test.
        test_name (str): The name/title of the test.
        questions (str): A string with the assignment questions.
        
    Returns:
        dict: Status of the operation.
    """
    try:
        db = firestore.Client()
        doc_ref = db.collection("classes").document("class_5") \
            .collection("teachers").document(teacher_id) \
            .collection("subjects").document(subject_name) \
            .collection("topics").document(topic_id)

        doc_ref.update({
            "quiz_id": quiz_id,
            "questions": questions
        })

        return {"status": "success", "message": f"Stored test '{quiz_id}'"}
    except Exception as e:
        return {"status": "error", "error_message": str(e)}



# def get_topics_by_teacher_subject_class(teacher_id: str, subject_name: str, class_id: str, topic_id: str) -> dict:
#     """Fetches topics for a subject under a specific teacher and class."""
#     try:
#         db = firestore.Client()
#         topics_ref = db.collection("classes").document(class_id) \
#             .collection("teachers").document(teacher_id) \
#             .collection("subjects").document(subject_name) \
#             .collection("topics").document(topic_id)

#         docs = topics_ref.stream()
#         topics = [{"id": doc.id, **doc.to_dict()} for doc in docs]

#         return {"status": "success", "topics": topics}
#     except Exception as e:
#         return {"status": "error", "error_message": str(e)}

def list_topic_ids(class_id: str, teacher_id: str, subject_name: str) -> dict:
    """
    Lists all topic document IDs under a specific subject, teacher, and class.

    Args:
        class_id (str): e.g., 'class_5'
        teacher_id (str): e.g., 'T001'
        subject_name (str): e.g., 'Mathematics'

    Returns:
        dict: {status: 'success', topic_ids: [...]}
    """
    try:
        db = firestore.Client()
        topics_ref = db.collection("classes").document(class_id) \
            .collection("teachers").document(teacher_id) \
            .collection("subjects").document(subject_name) \
            .collection("topics")
        
        docs = topics_ref.stream()
        topic_ids = [doc.id for doc in docs]

        return {"status": "success", "topic_ids": topic_ids}
    except Exception as e:
        return {"status": "error", "error_message": str(e)}

firebase_topic_fetch_agent = Agent(
    name="firebase_topic_fetch_agent",
    model="gemini-2.0-flash",
    instruction=(
        "You are an agent who assists teachers in preparing assignmemts for a topic."
        "1. Use list_topic_ids to get list of all the teachers and their respective subjects."
        "2. Use get_topic_data with topic_ids"
        "3. Return topic_data from get_topic_data"
    ),
    tools=[list_topic_ids, get_topic_data],
    output_key="topic"
)


assignment_generator_agent = LlmAgent(
    name="assignment_generator_agent",
    model="gemini-2.0-flash",
    instruction=(
        "You are a helpful agent who creates tests for topics taught by teacher"
        "Each {topic} which is used to generate a quiz of 5 questions of middle school level"
        "- Call 'store_assignments' for each topic_id in {topic}, passing quiz_id (unique and uuid) and questions as a markdown.\n"
    ),
    tools=[store_assignments],
)


sequential_assignment_generator = SequentialAgent(
    name="assignment_generation_pipeline",
    description="Lists all courses and generates + stores assignments for each.",
    sub_agents=[firebase_topic_fetch_agent,assignment_generator_agent],
)