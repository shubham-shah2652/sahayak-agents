from vertexai.preview import reasoning_engines
from agent import answer_from_textbook

import vertexai
from vertexai import agent_engines


PROJECT_ID = "sahayakai-466115"
LOCATION = "us-east4"
STAGING_BUCKET = "gs://sahayak-agents-bucket"

vertexai.init(
    project=PROJECT_ID,
    location=LOCATION,
    staging_bucket=STAGING_BUCKET,
)

app = reasoning_engines.AdkApp(
    agent=answer_from_textbook,
    enable_tracing=True,
)

remote_app = agent_engines.create(
    agent_engine=app,
    requirements=[
        "google-cloud-aiplatform[adk,agent_engines]","cloudpickle","llama_index","google-adk"   
    ]
)