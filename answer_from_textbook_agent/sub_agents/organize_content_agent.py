from google.adk.agents import Agent
from google.adk.tools.retrieval.vertex_ai_rag_retrieval import VertexAiRagRetrieval
from vertexai.preview import rag
from .prompts import FORMAT_CONTENT_IN_MARKDOWN
from pydantic import BaseModel

class OrganizedContent(BaseModel):
    content: str

format_content_agent = Agent(
    model='gemini-2.5-pro',
    name='ask_rag_agent',
    instruction=FORMAT_CONTENT_IN_MARKDOWN,
    description="This agent is designed to process textbook-retrieved content in response to a user query and organize it into a clean, logically structured Markdown format. It identifies relevant information, removes redundancy, and formats the output using appropriate Markdown elements—headings, lists, code blocks, and embedded images or GIFs. The result is a concise, well-organized document suitable for learning, presentation, or documentation purposes.",
    # output_key="content",
    # output_schema=OrganizedContent
)