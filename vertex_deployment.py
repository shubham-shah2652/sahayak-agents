import vertexai

PROJECT_ID = "sahayakai-466115"
LOCATION = "us-east4"
STAGING_BUCKET = "gs://sahayak-agents-bucket"

vertexai.init(
    project=PROJECT_ID,
    location=LOCATION,
    staging_bucket=STAGING_BUCKET,
)