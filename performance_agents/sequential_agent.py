# sequential_grader_pipeline.py
from google.adk.agents import SequentialAgent
from grader_agent import grader_agent
from firestore_agent import firestore_agent
from assignment_gen_agent import firebase_fetch_agent,assignment_generator_agent

sequential_grader = SequentialAgent(
    name="grading_pipeline",
    description="Grades the student's assignment and stores it in Firestore.",
    sub_agents=[grader_agent,firestore_agent,],
)

sequential_assignment_generator = SequentialAgent(
    name="assignment_generation_pipeline",
    description="Lists all courses and generates + stores assignments for each.",
    sub_agents=[firebase_fetch_agent,assignment_generator_agent],

)
