# local_test_grader_agent.py
from vertexai.preview import reasoning_engines
from performance_agents.topic_quiz.test_gen_agent import sequential_assignment_generator
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
    agent=sequential_assignment_generator,
    enable_tracing=True,
)

session = app.create_session(user_id="u_123")
for event in app.stream_query(
    user_id="u_123",
    session_id=session.id,
    message=f"Generate tests for topics where class_id=class_5, teacher_id=T001, subject_name=Mathematics",
): print(event)


