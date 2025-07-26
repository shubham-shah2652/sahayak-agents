from google.adk.agents import Agent
from .prompts import DECIDE_IMAGE_NEEDED

decide_image_needed_agent = Agent(
    model='gemini-2.5-pro',
    name='decide_image_video_needed_agent',
    instruction=DECIDE_IMAGE_NEEDED,
    description="This agent is designed to determine whether an image or video is needed for the content based on the user's query. It analyzes the context and decides if visual aids would enhance understanding or engagement. If necessary, it will suggest appropriate images or videos to include in the content.",
)