import os
import random
from django.conf import settings
from django.shortcuts import render, redirect
from googleapiclient.discovery import build
from google.oauth2 import service_account

# Constants
SCOPES = ['https://www.googleapis.com/auth/drive.readonly']
SERVICE_ACCOUNT_FILE = os.path.join(settings.BASE_DIR, 'templates/static/home/files/credentials.json')
API_SERVICE_NAME = 'drive'
API_VERSION = 'v3'
ROOT_FOLDER_ID = '17vUqQnNCm5LS7Oz0ow9SBOfNk90huOmm'  # Main Google Drive folder ID

def get_service():
    """Create a Google Drive API service."""
    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    return build(API_SERVICE_NAME, API_VERSION, credentials=credentials)

def get_all_subfolders(service, parent_folder_id):
    """Recursively gather all subfolders starting from the parent folder."""
    all_subfolders = []
    query = f"'{parent_folder_id}' in parents and mimeType = 'application/vnd.google-apps.folder'"
    results = service.files().list(q=query, fields="files(id, name)").execute()
    subfolders = results.get('files', [])
    for subfolder in subfolders:
        all_subfolders.append(subfolder)
        all_subfolders.extend(get_all_subfolders(service, subfolder['id']))
    return all_subfolders

def get_folder_contents(service, folder_id):
    """Retrieve all contents of a folder by ID, handling pagination to get all items."""
    items = []
    page_token = None
    while True:
        query = f"'{folder_id}' in parents"
        fields = "nextPageToken, files(id, name, mimeType)"
        results = service.files().list(q=query, fields=fields, pageToken=page_token).execute()
        items.extend(results.get('files', []))
        page_token = results.get('nextPageToken')
        if not page_token:
            break
    return items

def get_folder_path(service, folder_id):
    """Construct the path hierarchy for a given folder."""
    folder_path = []
    while folder_id:
        folder = service.files().get(fileId=folder_id, fields="id, name, parents").execute()
        folder_path.append(folder)
        folder_id = folder.get('parents', [None])[0]
    return reversed(folder_path)

def get_random_images_from_random_folder():
    """Select a random subfolder and return a random set of image URLs from it."""
    service = get_service()
    all_subfolders = get_all_subfolders(service, ROOT_FOLDER_ID)

    if not all_subfolders:
        print('No subfolders found.')
        return [], ""

    random_subfolder = random.choice(all_subfolders)
    print(f"Selected Subfolder: {random_subfolder['name']}")

    query = f"'{random_subfolder['id']}' in parents and mimeType contains 'image/'"
    results = service.files().list(q=query, fields="files(id, name)").execute()
    items = results.get('files', [])

    image_urls = [f"https://lh3.googleusercontent.com/d/{item['id']}=w1000?authuser=1/view" for item in items]
    random.shuffle(image_urls)
    return image_urls[:3], random_subfolder['name']

def browse_folder(request, folder_id=None):
    """View controller to browse a folder and display its contents."""
    service = get_service()
    folder_id = folder_id or ROOT_FOLDER_ID
    folder_contents = get_folder_contents(service, folder_id)

    folders = [item for item in folder_contents if item['mimeType'] == 'application/vnd.google-apps.folder']
    images = [item for item in folder_contents if 'image/' in item['mimeType']]
    image_urls = [{'url': f"https://lh3.googleusercontent.com/d/{item['id']}=w1000?authuser=1/view", 'id': item['id']} for item in images]

    folder_name = next((item['name'] for item in folders if item['id'] == folder_id), "Root Folder")
    folder_path = list(get_folder_path(service, folder_id))

    return render(request, 'browse.html', {
        'folders': folders, 
        'image_urls': image_urls, 
        'folder_name': folder_name,
        'folder_path': folder_path,
    })

def download_image(request, file_id):
    """Controller to initiate a download of a specific image by ID."""
    service = get_service()
    file = service.files().get(fileId=file_id, fields="id, name, mimeType, webContentLink").execute()
    return redirect(file['webContentLink'])

def fotos(request):
    """View controller to display random images from a random folder."""
    image_urls, folder_name = get_random_images_from_random_folder()
    return render(request, 'fotos.html', {'image_urls': image_urls, 'folder_name': folder_name})

def about(request):
    """Static view for the 'About' page."""
    return render(request, 'about.html')

def calendario(request):
    """Static view for the 'Calendar' page."""
    return render(request, 'calendario.html')

def contatos(request):
    """Static view for the 'Contacts' page."""
    return render(request, 'contatos.html')

def home(request):
    """View controller for the home page."""
    if request.method == 'GET':
        return render(request, 'home.html')
