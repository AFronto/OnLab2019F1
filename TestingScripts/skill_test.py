import requests
import json

serverAPI = "http://localhost:5000/api"   #http://localhost:5000/api is megy
loginURL = serverAPI + "/auth/login"
skillPostURL = serverAPI + "/skills"
skillByName = skillPostURL + "/{}"

loginData = {
    "email" : "alma@gyumi.com",
    "password" : "TopSecret"
}

# disable warning
requests.packages.urllib3.disable_warnings(requests.packages.urllib3.exceptions.InsecureRequestWarning)

r = requests.post(loginURL,verify=False,json=loginData);
print(r.text);

token = json.loads(r.text)["token"].encode('UTF-8')

skillData = {
    "name" : "Web",
    "description" : "Everything web"
}

r = requests.post(skillPostURL, verify=False, json=skillData,
                 headers={'Content-Type': 'application/json',
                          "Authorization": "Bearer {token}"
                            })

print(r.status_code)
print(r.text)

r = requests.get(skillByName.format("Web"), verify=False,
                  headers={'Content-Type': 'application/json',
                           "Authorization": "Bearer {token}"
                           })

print(r.status_code)
print(r.text)

r = requests.patch(skillPostURL +"/Web/add", verify=False,
                  headers={'Content-Type': 'application/json',
                           "Authorization": "Bearer {token}"
                           })

print(r.status_code)
print(r.text)
