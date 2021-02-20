import requests

# Server info
url = "https://seb7jc8jyf.execute-api.us-east-1.amazonaws.com/default/Hotspot-Warner?address=Canadian Tire 2360 Eglinton Ave W&city=Toronto"
api_key = "xxxx"

headers = {"x-api-key": api_key}
request = requests.get(url, headers=headers)

print(request.content)
