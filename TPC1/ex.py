import json
import os

html = """
<!DOCTYPE html>
<html lang = "pt-PT">
<head>
    <title> Mapa </title>
    <meta charset = "utf-8">
</head>
<body>
"""

template = """
<!DOCTYPE html>
<html lang = "pt-PT">
<head>
    <title> Mapa </title>
    <meta charset = "utf-8">
</head>
<body>
"""

file = open('mapa.json', 'r', encoding="utf-8").read()

result = json.loads(file)

html += "<ul>"

listaDeCidades = []

for elem in result["cidades"]:
    listaDeCidades.append(elem['nome'])
    ficheiroCidade = open(f'html/{elem["nome"]}.html', 'w', encoding="utf-8")

    templateCidade = template
    templateCidade += f'<h1> {elem["nome"]} </h1>'
    templateCidade += f'<h2> {elem["distrito"]} </h2>'
    templateCidade += f"<b> População: </b> {elem['população']}"
    templateCidade += "<br>"
    templateCidade += f"<b> Descrição: </b> {elem['descrição']}"
    templateCidade += f'<a href = "../mapa.html"> Voltar </a>'
    templateCidade += "</body>"

    ficheiroCidade.write(templateCidade)
    ficheiroCidade.close()

listaDeCidades.sort()

for elem in listaDeCidades:
    html += f'<li><a href = "html/{elem}.html"> {elem} </li>'

html += "</ul>"

html += "</body>"

ficheiroHTML = open('mapa.html', 'w', encoding="utf-8")
ficheiroHTML.write(html)
ficheiroHTML.close()