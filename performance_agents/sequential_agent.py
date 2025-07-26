# sequential_grader_pipeline.py
from google.adk.agents import SequentialAgent
from grader_agent import grader_agent
from firestore_agent import firestore_agent

sequential_grader = SequentialAgent(
    name="grading_pipeline",
    description="Grades the student's assignment and stores it in Firestore.",
    
    sub_agents=[grader_agent,firestore_agent,
    ],
)
