import os
import random
from datetime import datetime
from django.conf import settings
from django.shortcuts import render, redirect, get_object_or_404
from googleapiclient.discovery import build
from google.oauth2 import service_account

from .models import Coord, Noticia

# Constants
SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
SERVICE_ACCOUNT_FILE = os.path.join(settings.BASE_DIR, 'credentials.json')
CALENDAR_ID = 'diogovanzosabec@gmail.com'  # Replace with your calendar ID
ROOT_FOLDER_ID = "17vUqQnNCm5LS7Oz0ow9SBOfNk90huOmm"

def get_google_calendar_service():
    """Create a Google Calendar API service."""
    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    return build('calendar', 'v3', credentials=credentials)

def get_upcoming_events():
    """Fetch the next 3 upcoming events from Google Calendar."""
    service = get_google_calendar_service()
    now = datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
    events_result = service.events().list(calendarId=CALENDAR_ID, timeMin=now,
                                          maxResults=3, singleEvents=True,
                                          orderBy='startTime').execute()
    events = events_result.get('items', [])
    return events

def get_google_drive_service():
    """Create a Google Drive API service."""
    credentials = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=['https://www.googleapis.com/auth/drive.readonly'])
    return build('drive', 'v3', credentials=credentials)

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
    return list(reversed(folder_path))

def get_random_images_from_random_folder():
    """Select a random subfolder and return a random set of image URLs from it."""
    service = get_google_drive_service()
    all_subfolders = get_all_subfolders(service, '1kCAs5XTUr04Mbbdfj2OQbYRcQt_HcIG-')

    if not all_subfolders:
        return [], ""

    random_subfolder = random.choice(all_subfolders)
    query = f"'{random_subfolder['id']}' in parents and mimeType contains 'image/'"
    results = service.files().list(q=query, fields="files(id)").execute()
    items = results.get('files', [])

    image_urls = [f"https://lh3.googleusercontent.com/d/{item['id']}=w1000?authuser=1/view" for item in items]
    random.shuffle(image_urls)
    return image_urls[:3], random_subfolder['name']

def browse_folder(request, folder_id=None):
    """View controller to browse a folder and display its contents."""
    service = get_google_drive_service()
    folder_id = folder_id or ROOT_FOLDER_ID
    folder_contents = get_folder_contents(service, folder_id)

    folders = [item for item in folder_contents if item['mimeType'] == 'application/vnd.google-apps.folder']
    images = [item for item in folder_contents if 'image/' in item['mimeType']]
    image_urls = [{'url': f"https://lh3.googleusercontent.com/d/{item['id']}=w1000?authuser=1/view", 'id': item['id']} for item in images]

    folder_name = next((item['name'] for item in folders if item['id'] == folder_id), "Root Folder")
    folder_path = get_folder_path(service, folder_id)

    return render(request, 'browse.html', {
        'folders': folders, 
        'image_urls': image_urls, 
        'folder_name': folder_name,
        'folder_path': folder_path,
    })

def download_image(request, file_id):
    """Controller to initiate a download of a specific image by ID."""
    service = get_google_drive_service()
    file = service.files().get(fileId=file_id, fields="webContentLink").execute()
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
    contatos = Coord.objects.all()
    return render(request, 'contatos.html', {'contatos': contatos})

def home(request):
    ultimas_noticias = Noticia.objects.order_by('-id')[:3]
    eventos = get_upcoming_events()
    return render(request, 'home.html', {'ultimas_noticias': ultimas_noticias, 'eventos': eventos})

def lista_noticias(request):
    # Order by 'dataUpload' in descending order. Replace 'dataUpload' with your actual datetime field name.
    noticias = Noticia.objects.all().order_by('-dataUpload')
    return render(request, 'lista_noticias.html', {'noticias': noticias})

def detalhe_noticia(request, id):
    noticia = get_object_or_404(Noticia, id=id)
    return render(request, 'detalhe_noticia.html', {'noticia': noticia})
