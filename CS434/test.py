import requests

API_URL = "http://localhost:8000/search_by_url"
IMAGE_LINK = "https://res.cloudinary.com/dtsark4xu/image/upload/v1750505924/m93123871390_1_enuzc3.jpg"

payload = {
    "url": IMAGE_LINK,
    "top_k": 5
}

response = requests.post(API_URL, json=payload)
print("Status code:", response.status_code)
print("Response:", response.json())