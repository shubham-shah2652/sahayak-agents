from google.adk.agents import SequentialAgent
from .decide_image_needed import decide_image_needed_agent
from .generate_image_agent import image_gen_agent
from .google_search_agent import google_search_agent
from .content_organize_agent import format_content_agent

conversation_with_web = SequentialAgent(
    name="conversation_with_web_agent",
    sub_agents=[google_search_agent, decide_image_needed_agent, image_gen_agent, format_content_agent]
)