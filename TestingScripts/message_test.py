import requests
import json

serverAPI = "http://localhost:5000/api"   #http://localhost:5000/api is megy
messagePostURL = serverAPI + "/messages"

# disable warning
requests.packages.urllib3.disable_warnings(requests.packages.urllib3.exceptions.InsecureRequestWarning)

messageData = {
    "tags" : ["Web", "Web2"],
    "priority" : 0,
    "content" : "Sok sok sok szoveg van itt nagyon sok biza..."
}

r = requests.post(messagePostURL,verify=False,json=messageData);
print(r.text);