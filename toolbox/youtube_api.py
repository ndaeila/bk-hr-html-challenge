import os

# import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors

scopes = ["https://www.googleapis.com/auth/youtube.force-ssl"]

def search():
    # Disable OAuthlib's HTTPS verification when running locally.
    # *DO NOT* leave this option enabled in production.
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

    api_service_name = "youtube"
    api_version = "v3"

    # Get credentials and create an API client
    # flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(
    #     client_secrets_file, scopes)
    # credentials = flow.run_console()
    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, developerKey="AIzaSyA2CnDtBuVjYyBTdMaAnCqS0SCYOEimgps")

    request = youtube.search().list(
        part='id,snippet',
        q="HR Training"
    )
    
    response = request.execute()

    print(response)

search()