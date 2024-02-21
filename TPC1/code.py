import os
import re
import xmltodict
import xml.etree.ElementTree as ET

def getRigthText(info):
    info = re.sub('<lugar>', '<b>', info)
    info = re.sub('</lugar>', '</b>', info)
    
    info = re.sub('<entidade>', '<i>', info)
    info = re.sub('</entidade>', '</i>', info)
    
    info = re.sub('<data>', '<u>', info)
    info = re.sub('</data>', '</u>', info)
    
    info = re.sub('<para>', '<p>', info)
    info = re.sub('</para>', '</p>', info)
    
    return info

# Index html code
indexhtml = """
 <!DOCTYPE html>
 
 <html lang = "pt-PT">
 
 <head>
    <title> Índice </title>
    <meta charset = "utf-8">
 </head>
 
 <body>
    <h1> Índice </h1>
    
    <ul>
"""

# Street html code
streetInit = """
 <!DOCTYPE html>
 
 <html lang = "pt-PT">
 
 <head>
"""

# Making the directory to store the street pages
os.makedir("PaginasRuas")

# Storing all the file names in a list
allInfoFiles = os.listdir("./Dataset/texto")
newImgRoot = os.listdir("./Dataset/atual")

# List to store all the street names
streetNames = []

# Iterate over each file to get informations and create the street info html page
for fullFileName in allInfoFiles:
    
    # Get the html file name
    htmlFileName = fullFileName.split("-")[2].split(".xml")[0]
    
    # Initialize the street html code
    streetHTML = streetInit
    
    # Open the file and read the content
    openFile = open("./Dataset/texto/" + fullFileName, "r", encoding="utf-8")
    fileContent = openFile.read()
    
    # Convert the xml file to a dictionary
    streetDict = xmltodict.parse(fileContent)

    # Retrieve the data from the xml file
    meta = streetDict['rua']['meta']
    corpo = streetDict['rua']['corpo']
    figuras = corpo['figura']
    info = corpo['para']
    casas = corpo['lista-casas']['casa']
    
    # Editing the street html code
    streetHTML += f"""
        <title> {meta['nome']} </title>
        <meta charset = "utf-8">
        </head>
        
        <body>
        
            <h1>
                <b> {meta['nome']} </b>
            </h1>
            
            <h2> 
                -> Rua número {meta['número']} 
            </h2>
            
            <h3>
                Descrição:
            </h3>    
        """
    
    info = getRigthText(info)
    
    streetHTML += f"""
            {info}
            
            <h3> Casas: </h3>
            """
    
    if len(casas) == 0:
        streetHTML += f"""
            <p> Não existem casas nesta rua </p>
            """
    else:
        count = 0
        for casa in casas:
            count += 1
            streetHTML += f"""
                    <h4> Casa nº{casa['número']}: </h4>
                    
                    <p>
                        <b> <u>Enfiteuta:</u> </b>{casa.get('enfiteuta', 'Não existe enfiteuta')}
                    </p>
                    
                    <p>
                        <b> <u>Foro:</u> </b>{casa.get('foro', 'Não existe foro')}
                    </p>
                    
                    <p>
                        <b> <u>Descrição:</u> </b>{getRigthText(casa.get('desc', 'Não existe descrição'))}
                    </p>
             """
    
    streetHTML += f"<h3> Imagens atuais: </h3>"
    
    # Fazer atraves da lista allInfoFiles
    streetHTML += f"<h3> Desenhos de antigamente: </h3>"
    
    
    # Addinf the street name for index porpuses
    streetNames.append(meta['nome'])
    
    
    
    
    
    
    