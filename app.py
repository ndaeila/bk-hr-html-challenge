from flask import Flask, render_template
import random
from toolbox import youtube_api, openai_api

app = Flask(__name__, template_folder='templates', static_folder='static')

list_of_youtube_videos = []
search_query = "HR Training"


# Send YouTube link to user that requests YouTube link
@app.route("/")
def main():
    return render_template('index.html')


# When Video Changes
@app.route("/next")
def next():
    # Get a list of links. If list of links already has contents, use that list of links
    if len(list_of_youtube_videos) <= 0:
        video_id = "dQw4w9WgXcQ"
        transcript = youtube_api.get_transcript("https://www.youtube.com/watch?v=" + video_id)

        list_of_youtube_videos.append({
            "video_id": video_id,
            "transcript": transcript
        })

    # Get random item from list
    next = random.choice(list_of_youtube_videos)

    # Return a YouTube link
    return {
        "video_id": next["video_id"],
        "transcript_desc": openai_api.transcript_to_hr_desc(next["transcript"]),
    }



# If a user finds the hidden search bar and reveals it, they can change the video type that plays.
# Still unrelated to the challenge. Add later.
@app.route("/changesearch?={query}")
def changesearch(query: str):
    search_query = query # contents of website
    list_of_youtube_links = []


if __name__ == '__main__':
    app.run(debug=True)