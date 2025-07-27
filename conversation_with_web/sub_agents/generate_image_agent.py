from vertexai.preview.vision_models import ImageGenerationModel
import typing
from PIL import Image as PIL_Image
from PIL import ImageOps as PIL_ImageOps
import io
import base64
from google.adk.agents import Agent
from .prompts import IMAGE_GEN_AGENT
import vertexai
import uuid
from google.cloud import storage

PROJECT_ID = "sahayakai-466115"
LOCATION = "us-central1"
STAGING_BUCKET = "gs://sahayak-conversation-agent"

vertexai.init(
    project=PROJECT_ID,
    location=LOCATION,
    staging_bucket=STAGING_BUCKET,
)
generation_model = ImageGenerationModel.from_pretrained("imagen-4.0-fast-generate-preview-06-06")

storage_client = storage.Client(project=PROJECT_ID)
_bucket_name = "conversation_images"
bucket = storage_client.bucket(_bucket_name)

def _upload_to_bucket(image_bytes: bytes, folder: str = "generated_images") -> str:
    """
    Upload raw PNG bytes to GCS and return the gs:// path.
    """
    # generate a unique filename
    filename = f"{folder}/{uuid.uuid4().hex}.png"
    blob = bucket.blob(filename)
    print("Storing image to bucket")
    blob.upload_from_string(image_bytes, content_type="image/png")
    print("Uploaded to bucket")
    return f"gs://{_bucket_name}/{filename}"

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

    # 2. resize
    pil_image = PIL_ImageOps.contain(pil_image, (600, 350))

    # 3. write to bytes
    buffer = io.BytesIO()
    pil_image.save(buffer, format="PNG")
    img_bytes = buffer.getvalue()

    # 4. upload & return path
    return _upload_to_bucket(img_bytes)

image_gen_agent = Agent(
    model='gemini-2.5-pro',
    name='image_gen_agent',
    instruction=IMAGE_GEN_AGENT,
    description="This agent is designed to generate images based on image prompts. It uses advanced image generation techniques to create high-quality visuals that match the specified requirements. The generated images can be used for various purposes, including educational content, presentations, and creative projects.",
    tools=[generate_image]
)
