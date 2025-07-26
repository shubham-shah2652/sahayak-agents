from google.adk.agents import SequentialAgent
from .sub_agents.decide_image_needed import decide_image_needed_agent
from .sub_agents.generate_image_agent import image_gen_agent
from .sub_agents.google_search_agent import google_search_agent

conversation_with_web = SequentialAgent(
    name="conversation_with_web_agent",
    sub_agents=[google_search_agent, decide_image_needed_agent, image_gen_agent]
)