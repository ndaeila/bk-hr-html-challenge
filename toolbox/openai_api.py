import openai
import json

with open('config/config.json', 'r') as file:
    data = json.load(file)

openai.api_key = data["openai_api_key"]

prompt = (
    "Based on the transcript of this video, " +
    "create a lesson/recap about the video that teaches " +
    "about company culture in an organization called Batman's Kitchen. " +
    "Your response should only be 3-5 paragraphs " +
    "about the takeaways of the video and what can be learned from the video. " +
    " This description will be used within an HR training tool " +
    "to teach new employees about the company, so write everything " +
    "as the company Batman's Kitchen\'s HR department. Please keep in mind " +
    " that none of these videos are created by Batman's Kitchen, " +
    " but are instead used to teach lessons." +
    "make the paragraphs are easy enough for a 5th grader to read, and " +
    "make sure to add plenty of intentation and new lines between them."
    "\n\n"
)

def transcript_to_hr_desc(transcript):
    bot = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt + str(transcript)}]
    )

    return bot["choices"][0]["message"]["content"]

