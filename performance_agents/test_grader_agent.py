# local_test_grader_agent.py
from vertexai.preview import reasoning_engines
from sequential_agent import sequential_grader
import vertexai

PROJECT_ID = "sahayakai-466115"
LOCATION = "us-east4"
STAGING_BUCKET = "gs://sahayak-agents-bucket"

vertexai.init(
    project=PROJECT_ID,
    location=LOCATION,
    staging_bucket=STAGING_BUCKET,
)

app = reasoning_engines.AdkApp(
    agent=sequential_grader,
    enable_tracing=True,
)

student_id=1
pdf_path = r"C:\Users\Sanya Nanda\Downloads\Lab1.pdf"
image_path = r"C:\Users\Sanya Nanda\Sanya-Home\github\sahayak-agents\performance_agents\student_answer_sheet.jpg"
rubric = """
1. Clarity – 3 points
2. Correctness – 4 points
3. Structure – 2 points
4. Originality – 1 point
"""

# Ask the agent to perform the full grading sequence
message = f"""
Grade a student's assignment using the following rubric:

{rubric}

Use the tools to extract text from: image file: {image_path}

Combine both texts as a single student answer and evaluate it using the rubric.

After grading, store the result in Firestore using student_id: {student_id}.
"""

session = app.create_session(user_id="u_123")
for event in app.stream_query(
    user_id="u_123",
    session_id=session.id,
    message=f"{message}",
): print(event)


