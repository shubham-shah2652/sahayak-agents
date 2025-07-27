from vertexai.preview import reasoning_engines
from grading_system.sub_agents.agent import sequential_grader
import vertexai
from vertexai import agent_engines


PROJECT_ID = "sahayakai-466115"
LOCATION = "us-east4"
STAGING_BUCKET = "gs://sahayak-grading-bucket"

vertexai.init(
    project=PROJECT_ID,
    location=LOCATION,
    staging_bucket=STAGING_BUCKET,
)

app = reasoning_engines.AdkApp(
    agent=sequential_grader,
    enable_tracing=True,
)

remote_app = agent_engines.create(
    agent_engine=app,
    requirements=[
        "google-cloud-aiplatform[adk,agent_engines]", "cloudpickle", "google-adk", "PyPDF2", "opencv-python", "pillow", "google-cloud-firestore", "google-genai"
    ],extra_packages=[
        "./grading_system/sub_agents",
    ],
)
