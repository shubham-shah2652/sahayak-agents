from vertexai.preview.vision_models import ImageGenerationModel
import typing
from PIL import Image as PIL_Image
from PIL import ImageOps as PIL_ImageOps
import io
import base64
from google.adk.agents import Agent
from .prompts import IMAGE_GEN_AGENT
import vertexai

PROJECT_ID = "sahayakai-466115"
LOCATION = "us-east4"
STAGING_BUCKET = "gs://sahayak-agents-bucket"

vertexai.init(
    project=PROJECT_ID,
    location=LOCATION,
    staging_bucket=STAGING_BUCKET,
)
generation_model = ImageGenerationModel.from_pretrained("imagen-4.0-generate-preview-06-06")
def generate_image(prompt: str):
    images = generation_model.generate_images(
        prompt=prompt,
        number_of_images=1,
        aspect_ratio="1:1",
        negative_prompt="",
        person_generation="allow_all",
        safety_filter_level="block_few",
        add_watermark=False,
    )
    image = images[0]
    pil_image = typing.cast(PIL_Image.Image, image._pil_image)
    # Resize to fit max dimensions if necessary
    pil_image = PIL_ImageOps.contain(pil_image, (600, 350))

    # Convert PIL image to base64
    buffered = io.BytesIO()
    pil_image.save(buffered, format="PNG")
    img_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return img_base64

image_gen_agent = Agent(
    model='gemini-2.5-pro',
    name='image_gen_agent',
    instruction=IMAGE_GEN_AGENT,
    description="This agent is designed to generate images based on image prompts. It uses advanced image generation techniques to create high-quality visuals that match the specified requirements. The generated images can be used for various purposes, including educational content, presentations, and creative projects.",
    tools=[generate_image]
)
