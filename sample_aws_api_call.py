import requests

# Server info
url = "https://cm0wnwe5qa.execute-api.us-east-1.amazonaws.com/default/Hotspot-Warner?address=McDonalds 2781 Dufferin St, Toronto&city=Toronto"
api_key = "xxxx"

headers = {"x-api-key": api_key}
request = requests.get(url, headers=headers)

print(request.content)
