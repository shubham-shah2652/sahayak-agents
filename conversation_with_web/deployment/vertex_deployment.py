from vertexai.preview import reasoning_engines
from conversation_with_web.sub_agents.agent import conversation_with_web

import vertexai
from vertexai import agent_engines


PROJECT_ID = "sahayakai-466115"
LOCATION = "us-east4"
STAGING_BUCKET = "gs://sahayak-conversation-agent"

vertexai.init(
    project=PROJECT_ID,
    location=LOCATION,
    staging_bucket=STAGING_BUCKET,
)

app = reasoning_engines.AdkApp(
    agent=conversation_with_web,
    enable_tracing=True,
)

# remote_app = agent_engines.create(
#     agent_engine=app,
#     requirements=[
#         "google-cloud-aiplatform[adk,agent_engines]","cloudpickle","llama_index","google-adk","google-genai"   
#     ],extra_packages=[
#         "./conversation_with_web/sub_agents",
#     ],
# )
remote_app = agent_engines.update(resource_name='projects/522049177242/locations/us-east4/reasoningEngines/5221220080494313472',agent_engine=app,requirements=[
        "google-cloud-aiplatform[adk,agent_engines]","cloudpickle","llama_index","google-adk","google-genai"   
    ],extra_packages=[
        "./conversation_with_web/sub_agents",
    ],)