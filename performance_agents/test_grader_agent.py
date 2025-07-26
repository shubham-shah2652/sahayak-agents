# local_test_grader_agent.py
from vertexai.preview import reasoning_engines
from grader_agent import grader_agent

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
    agent=grader_agent,
    enable_tracing=True,
)

pdf_path = "sample_assignment.pdf"
image_path = "sample_diagram.png"
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

Use the tools to extract text from:
- PDF file: {pdf_path}
- Image file: {image_path}

Combine both texts as a single student answer and evaluate it using the rubric.
"""

session = app.create_session(user_id="u_123")
for event in app.stream_query(
    user_id="u_123",
    session_id=session.id,
    message=f"{message}",
): print(event)

