import os
from pytube import YouTube
from youtube_transcript_api import YouTubeTranscriptApi



def get_video_duration(video_url):
    yt = YouTube(video_url)
    return yt.length  # returns the duration in seconds



def get_transcript(video_url):
    # Extract video_id from the URL
    video_id = video_url.split("v=")[1]
    # Fetch the transcript
    transcript = YouTubeTranscriptApi.get_transcript(video_id)
    return transcript

