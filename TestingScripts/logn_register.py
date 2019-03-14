import requests

serverAPI = "https://localhost:5001/api"   #http://localhost:5000/api is megy
loginURL = serverAPI + "/auth/login"
registerURL = serverAPI + "/auth/register"

regData = {
    "username" : "Alma",
    "email" : "alma@gyumi.com",
    "password" : "TopSecret"
}

loginData = {
    "email" : "alma@gyumi.com",
    "password" : "TopSecret"
}

# disable warning
requests.packages.urllib3.disable_warnings(requests.packages.urllib3.exceptions.InsecureRequestWarning)

# r = requests.post(registerURL,verify=False,json=regData);
# print(r.text);

input("Press Enter to continue...")

r = requests.post(loginURL,verify=False,json=loginData);
print(r.text);