import requests

endpoints = [
    'stephen49km@gmail.com',
    'muriukic522@gmail.com'
]

payload = {
    "name": "Developer Test (Parallel)",
    "email": "test@churchwebsite.local",
    "subject": "hi developer testing",
    "message": "This is a parallel automated delivery test. Both recipients should now receive an activation link or the message directly.",
    "_template": "table",
    "_captcha": "false"
}

headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Referer": "https://muriuki122.github.io/church-s-website/contact.html",
    "Origin": "https://muriuki122.github.io"
}

for email in endpoints:
    url = f"https://formsubmit.co/ajax/{email}"
    try:
        response = requests.post(url, json=payload, headers=headers)
        print(f"Target: {email}")
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
        print("-" * 20)
    except Exception as e:
        print(f"Error for {email}: {e}")
