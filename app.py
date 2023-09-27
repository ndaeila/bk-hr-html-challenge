import pickle
from flask import Flask, render_template
import random
from toolbox import youtube_api, openai_api

app = Flask(__name__, template_folder='templates', static_folder='static')

list_of_youtube_videos = []
search_query = "HR Training"
cache_filename = "cache.pkl"

# Load the cache from disk if it exists
try:
    with open(cache_filename, "rb") as file:
        cache = pickle.load(file)
except FileNotFoundError:
    cache = {}

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/next")
def next():
    if len(list_of_youtube_videos) <= 0:
        video_ids = [
                     "A2HFusWQIeE",
                     "uiufOswSxGI",
                     "3lRjzlnR1i0",
                     "3-mv33vrqBs",
                     "aaSl7ZU3ppM"
                     ]
        for video_id in video_ids:
            transcript = youtube_api.get_transcript("https://www.youtube.com/watch?v=" + video_id)
            duration = youtube_api.get_video_duration("https://www.youtube.com/watch?v=" + video_id)
            
            list_of_youtube_videos.append({
                "video_id": str(video_id),
                "transcript": transcript,
                "duration": duration
            })

    # Get random item from list
    next_video = random.choice(list_of_youtube_videos)
    
    # Check if transcript_desc for the video_id is already cached
    if next_video["video_id"] in cache:
        transcript_desc = cache[next_video["video_id"]]
    else:
        transcript_desc = openai_api.transcript_to_hr_desc(next_video["transcript"])
        cache[next_video["video_id"]] = transcript_desc

        # Save the updated cache to disk
        with open(cache_filename, "wb") as file:
            pickle.dump(cache, file)

    return {
        "video_id": str(next_video["video_id"]),
        "transcript_desc": transcript_desc,
        "duration": next_video["duration"]
    }

if __name__ == '__main__':
    app.run(debug=False)
