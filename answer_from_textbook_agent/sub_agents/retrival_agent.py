from google.adk.agents import Agent
from google.adk.tools.retrieval.vertex_ai_rag_retrieval import VertexAiRagRetrieval
from vertexai.preview import rag
from .prompts import RETRIVAL_PROMPT

ask_vertex_retrieval = VertexAiRagRetrieval(
    name='retrieve_textbook_content',
    description=(
        'Use this tool to retrieve the textbook content for the question from the RAG corpus,'
    ),
    rag_resources=[
        rag.RagResource(
            rag_corpus='projects/sahayakai-466115/locations/us-central1/ragCorpora/2305843009213693952'
        )
    ],
    similarity_top_k=10,
    vector_distance_threshold=0.6,
)

retrival_rag_agent = Agent(
    model='gemini-2.5-pro',
    name='ask_rag_agent',
    instruction=RETRIVAL_PROMPT,
    tools=[
        ask_vertex_retrieval,
    ]
)