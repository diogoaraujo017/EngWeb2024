import os
import json

if not os.path.exists('Cidades'):
    os.mkdir('Cidades')

# Getting the data from the file
fileData = open('./mapa-virtual.json', 'r', encoding='utf-8').read()

# Parsing the data from json to python
data = json.loads(fileData)

# Getting the cities and connections
cityList = data['cidades']
connectionList = data['ligacoes']

cityHTMLinit = """
            <!DOCTYPE html>
            <html lang = "pt-PT">
            <head>
           """

for city in cityList:
    html = cityHTMLinit

    nome = city['nome']
    populacao = city['população']
    descricao = city['descrição']
    distrito = city['distrito']
      
    html += f"""
            <title> {nome} </title>
            <meta charset = "utf-8">
            </head>
            <body>
            <h1> {nome} </h1>
            <p><b><font size="4">População: </font></b> {populacao} </p>
            
            <p><b><font size="4">Distrito: </font></b> {distrito}</p> 
            
            <p><b><font size="4">Descrição: </font></b> {descricao} </p> 
            
            <b><font size="4">Ligações: </font></b>
            <ul>
            """
    
    id = city['id']        
        
    # Getting the connections of the city
    ligacoes = []        
    for connection in connectionList:
        if connection['origem'] == id:
            for city in cityList:
                if city['id'] == connection['destino']:
                    ligacoes.append((city['nome'], connection['distância'], city['id']))
                    break
                
    # Sorting the connections by distance        
    ligacoes.sort(key=lambda x: x[1])
    
    # Adding the connections to the html
    for elem in ligacoes:
       html += f"<li><b><a href='http://localhost:3001/{elem[2]}'>{elem[0]}</a></b> -> {round(elem[1])} km </li>"
    
    html += """
            </ul>
            </body>
            </html>
    """
    
    htmlFile = open(f'./Cidades/{id}.html', 'w', encoding='utf-8')
    
    htmlFile.write(html)    
    
    htmlFile.close()

        
            

