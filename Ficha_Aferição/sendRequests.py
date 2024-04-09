import requests
import json

url = "http://localhost:3000/pessoas"

with open("./data/dataset-extra1.json", 'r', encoding='utf-8') as file:
    pessoas = json.load(file)
    for pessoa in pessoas:
        requests.post(url, json=pessoa)
    
with open("./data/dataset-extra1.json", 'r', encoding='utf-8') as file:
    pessoas = json.load(file)
    for pessoa in pessoas:
        requests.post(url, json=pessoa)

with open("./data/dataset-extra1.json", 'r', encoding='utf-8') as file:
    pessoas = json.load(file)
    for pessoa in pessoas:
        requests.post(url, json=pessoa)        