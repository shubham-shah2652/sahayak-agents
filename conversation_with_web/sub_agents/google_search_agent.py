from google.adk.agents import Agent
from .prompts import WEB_SEARCH_AGENT

from google import genai
from google.genai.types import (
    GenerateContentConfig,
    GoogleSearch,
    HttpOptions,
    Tool,
)
import os
os.environ["GOOGLE_CLOUD_PROJECT"] = "sahayakai-466115"
os.environ["GOOGLE_CLOUD_LOCATION"] = "us-east4"
os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "true"

def perform_google_search(content: str):

    client = genai.Client(http_options=HttpOptions(api_version="v1"))

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=content,
        config=GenerateContentConfig(
            tools=[
                # Use Google Search Tool
                Tool(google_search=GoogleSearch())
            ],
        ),
    )

    print(response.text)
    return response.text

google_search_agent = Agent(
    name="google_search_agent",
    model="gemini-2.5-pro",
    description="Agent to answer questions using Google Search.",
    instruction=WEB_SEARCH_AGENT,
    tools=[perform_google_search]
)