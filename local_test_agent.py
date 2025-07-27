from vertexai.preview import reasoning_engines
from conversation_with_web.sub_agents.agent import conversation_with_web

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
    agent=conversation_with_web,
    enable_tracing=True,
)

session = app.create_session(user_id="u_123")
for event in app.stream_query(
    user_id="u_123",
    session_id=session.id,
    message="Tell me complete story about hecko in English",
): print(event)