# ProjectForecast

Hack the Case Competition Submission

Authors:
Aeliya Asghar, Andrey Valkov, James Crowley, Jenny Wu

**AWS API Documentation:**

*Make sure you add any relevant identifier if there are multiple businesses at the same address!
Eg. put "Canadian Tire 2360 Eglinton Ave W" instead of just "2360 Eglinton Ave W"*

**Look at sample_aws_api_call.py for a inspiration**

To access the server, send a GET request to:
```
https://seb7jc8jyf.execute-api.us-east-1.amazonaws.com/default/Hotspot-Warner
```

And append some query parameters (address and city) to the end of the access url like so:
```
https://seb7jc8jyf.execute-api.us-east-1.amazonaws.com/default/Hotspot-Warner?address=PUT YOUR ADDRESS HERE WITHOUT QUOTES&city=ANY RANDOM CITY
```

You will need to also add the following headers to your request:
```
headers = {"x-api-key": ENTER API KEY HERE}
```

If you want the API key, message me on Discord...

JSON responses from the API will look like this:
```
{
    "busyness": "RESULT",
    "status": "RESULT"
}
```
