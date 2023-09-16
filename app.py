from flask import Flask, render_template
import random

app = Flask(__name__, template_folder='templates', static_folder='static')

list_of_youtube_links = []
search_query = "HR Training"

# Send YouTube link to user that requests YouTube link
@app.route("/")
def main():
    return render_template('index.html')



# When Video Changes
@app.route("/next")
def next():
    # Get a list of links. If list of links already has contents, use that list of links
    if len(list_of_youtube_links) <= 0:
        try:
            list_of_youtube_links.append(get_list_of_youtube_videos())
        except:
            print("Getting YouTube Video queue of 10 did not work.")
            list_of_youtube_links.append({
                "video_link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "transcript": "Getting YouTube Video queue of 10 did not work. This right here is not autogenerated because it has not been passed to ChatGPT yet.",
                "": ""
            })

    # Get random item from list
    next = random.choice(list_of_youtube_links)


# just make the code work
    link = next["video_link"]
    transcript_desc = next["transcript"]

    # Return a YouTube link
    return {
        "link": link,
        "transcript_desc": transcript_desc,
    }


# If a user finds the hidden search bar and reveals it, they can change the video type that plays. Still unrelated to the challenge. Add later.
@app.route("/changesearch?={query}")
def changesearch(query: str):
    search_query = query # contents of website
    list_of_youtube_links = []



# Todo - Create list of YouTube links
def get_list_of_youtube_videos(head):

    list = []

    # Get 10 video samples
    for i in range(0, head if head > 0 else 10):
        list.append({
                "video_link": "https://www.youtube.com/watch?v=",
                "transcript": "",
                "": ""
            })

    return list


if __name__ == '__main__':
    app.run(debug=True)