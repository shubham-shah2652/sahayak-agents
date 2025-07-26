import os
from PIL import Image
from PyPDF2 import PdfReader
import pytesseract
import google.generativeai as genai
from google.adk.agents import Agent

# Configure your API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


def extract_text_from_pdf(file_path: str) -> dict:
    """Extracts text from a student's PDF file."""
    try:
        reader = PdfReader(file_path)
        text = "\n".join([page.extract_text() or "" for page in reader.pages])
        return {"status": "success", "text": text.strip()}
    except Exception as e:
        return {"status": "error", "error_message": f"PDF extraction failed: {str(e)}"}


def extract_text_from_image(image_path: str) -> dict:
    """Extracts handwriting or printed text from an image using OCR."""
    try:
        image = Image.open(image_path)
        text = pytesseract.image_to_string(image)
        return {"status": "success", "text": text.strip()}
    except Exception as e:
        return {"status": "error", "error_message": f"Image OCR failed: {str(e)}"}


def grade_combined_answer(answer_text: str, rubric: str) -> dict:
    """Grades the student's answer using a rubric via Gemini."""
    try:
        model = genai.GenerativeModel("gemini-1.5-pro")
        prompt = f"""
You are a grading assistant. Grade the following student's answer using the rubric.

Rubric:
{rubric}

Answer:
{answer_text}

Respond in JSON format:
{{"score": float (out of 10), "feedback": string}}
"""
        response = model.generate_content(prompt).text
        return {"status": "success", "grading": response}
    except Exception as e:
        return {"status": "error", "error_message": f"Grading failed: {str(e)}"}


grader_agent = Agent(
    name="pdf_image_grader",
    model="gemini-2.0-pro",
    description="Agent that grades student answers from PDFs and images based on a rubric.",
    instruction=(
        "You are a helpful academic assistant. You can extract answers from student-submitted PDF and image files, "
        "combine the text, and grade the answer using a defined rubric. "
        "Call extract_text_from_pdf or extract_text_from_image to extract content, then grade_combined_answer."
    ),
    tools=[extract_text_from_pdf, extract_text_from_image, grade_combined_answer],
)
