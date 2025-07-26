from google.adk.agents import SequentialAgent
from sub_agents.retrival_agent import retrival_rag_agent
from sub_agents.organize_content_agent import format_content_agent

answer_from_textbook = SequentialAgent(
    name="CodePipelineAgent",
    sub_agents=[retrival_rag_agent, format_content_agent]
)