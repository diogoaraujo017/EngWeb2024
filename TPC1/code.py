import os
import re


import xmltodict
from bs4 import BeautifulSoup, element

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

# Making the directory if not exists to store the street pages
if not os.path.exists("./PaginasRuas"):
    os.makedirs("./PaginasRuas")

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
    casas = corpo.get('lista-casas',None)
        
    # Retrieving the drawings stored in the xml file
    drawings = corpo.get('figura')
    
    infoDrawings = []
    if isinstance(drawings, list):
        for drawing in drawings:
            infoDrawings.append((drawing.get('legenda'),drawing['imagem']['@path'][2:]))
    else:
        infoDrawings.append((drawing.get('legenda'),drawing['imagem']['@path'][2:]))
        
    sp = BeautifulSoup(fileContent,features="xml")
    
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
                -- Rua número {meta['número']} 
            </h2>
            
            <h3>
                Descrição:
            </h3>
             
        """
    for text in sp.select("corpo > para"):
        streetHTML += "<p>"
        for tag in text.contents:
            if tag.name == "lugar":
                streetHTML += f"<b>{tag.get_text()}</b>"
            elif tag.name == "entidade":
                streetHTML += f"<i>{tag.get_text()}</i>"
            elif tag.name == "data":
                streetHTML += f"<i>{tag.get_text()}</i>"
            else:
                streetHTML += f"{tag.get_text()}"
        streetHTML += "</p>"    
    
       
    streetHTML += f"""
            
            <h3> Lista de casas presentes na rua: </h3>
            """
    
    
    # Adding the houses
    if isinstance(casas, dict):
    
        moradias = casas['casa']
        
        if moradias is None:
            streetHTML += f"""
                <p> Não existem casas nesta rua. </p>
        """
        else:
            counter = 0
            
            for casa in moradias:
                
                if not isinstance(casa, str):
                    counter += 1
                    if casa.get('número') == None:
                        streetHTML += f"""
                            <h4> 
                                <b> Casa nº{counter}:</b> 
                            </h4>
                        """
                    
                    else:    
                        streetHTML += f"""
                            <h4> 
                                <b> Casa nº{casa.get('número')}:</b> 
                            </h4>
                        """
                    
                    # Adding the enfiteuta
                    if casa.get('enfiteuta') == None:
                        streetHTML += f"""        
                            <p>
                                <b> --- <u>Enfiteuta:</u> </b> Não existe enfiteuta para esta casa.
                            </p> 
                            """
                    else:
                        streetHTML += f"""        
                            <p>
                                <b> --- <u>Enfiteuta:</u> </b>{casa['enfiteuta']}
                            </p> 
                            """
                    
                    # Adding the foro    
                    if casa.get('foro') == None:
                        streetHTML += f"""        
                            <p>
                                <b> --- <u>Foro:</u> </b> Não existe foro para esta casa.
                            </p> 
                            """
                    else:
                        streetHTML += f"""        
                            <p>
                                <b> --- <u>Foro:</u> </b>{casa['foro']}
                            </p> 
                            """
                        
                    # Adding the description
                    streetHTML += f"""
                                    <p> 
                                        <b>--- <u>Descrição:</u> </b> 
                                    <p>
                                """
                    
                    parag = sp.select("casa > para")                 
                      
                    for para in parag:
                        streetHTML += "<p>"
                        for tag in para.contents:
                                if tag.name == "lugar":
                                    streetHTML += f"<b>{tag.get_text()}</b>"
                                elif tag.name == "entidade":
                                    streetHTML += f"<i>{tag.get_text()}</i>"
                                elif tag.name == "data":
                                    streetHTML += f"<i>{tag.get_text()}</i>"
                                else:
                                    streetHTML += f"{tag.get_text()}"
                        streetHTML += " "
                    streetHTML += "</p>"    
                
                else:    
                    streetHTML += f"""
                        <p> Não existem casas nesta rua. </p>
                    """
                    break
                    
                
    elif casas is not None and len(casas) == 1:
        streetHTML += f"""
                        <h4> 
                            <b> Casa nº 1:</b> 
                        </h4>
                """
                
        # Adding the enfiteuta
        if casas.get('enfiteuta') == None:
                streetHTML += f"""        
                        <p>
                            <b> --- <u>Enfiteuta:</u> </b> Não existe enfiteuta para esta casa.
                        </p> 
                        """
        else:
            streetHTML += f"""        
                        <p>
                            <b> --- <u>Enfiteuta:</u> </b>{casas['enfiteuta']}
                        </p> 
                        """
                
        # Adding the foro    
        if casas.get('foro') == None:
            streetHTML += f"""        
                        <p>
                            <b> --- <u>Foro:</u> </b> Não existe foro para esta casa.
                        </p> 
                        """
        else:
            streetHTML += f"""        
                        <p>
                            <b> --- <u>Foro:</u> </b>{casas['foro']}
                        </p> 
                        """
                    
        # Adding the description
        streetHTML += f"""
                                <p> 
                                    <b>--- <u>Descrição:</u> </b> 
                                <p>
                            """
                    
        description = sp.get("casas > desc")
        
        if description is None:
            streetHTML += f"<p> Não existe descrição para esta casa. </p>"
        else:
            fullDesc = description.__getattribute__("para")
                
            for para in fullDesc:
                streetHTML += "<p>"
                for tag in para.contents:
                    if tag.name == "lugar":
                        streetHTML += f"<b>{tag.get_text()}</b>"
                    elif tag.name == "entidade":
                        streetHTML += f"<i>{tag.get_text()}</i>"
                    elif tag.name == "data":
                        streetHTML += f"<i>{tag.get_text()}</i>"
                    else:
                        streetHTML += f"{tag.get_text()}"
                streetHTML += " "
                streetHTML += "</p>" 
    
    else:    
        streetHTML += f"""
            <p> Não existem casas nesta rua. </p>
            """
            
    # Geeting the images source
    imgNames = []
    imgNames = os.listdir(f"./Dataset/atual")
    
    for img in imgNames:
        if img.startswith(f"{meta['número']}"):
            if img.endswith("-Vista1.JPG"):
                imgVista1 = img
            elif img.endswith("-Vista2.JPG"):
                imgVista2 = img
    
    streetHTML += f"""<h3> 
                        Imagens atuais: 
                      </h3>
                    
                      <b> Vista 1: </b>
                      <img src = "../Dataset/atual/{imgVista1}" height = "400">
    
    """
    streetHTML += f"""                  
                      <b> Vista 2: </b>
                      <img src = "../Dataset/atual/{imgVista2}" height = "400">  
                    
                    """
    
    
    # Fazer atraves da lista allInfoFiles
    streetHTML += f"<h3> Desenhos de antigamente: </h3>"
    
    for (leg,imgScr) in infoDrawings:
        streetHTML += f"""
            <b> {leg} </b>
            <img src = "../Dataset/{imgScr}" height = "400">
        
        """
    
    # Create the file
    openFile = open(f"./PaginasRuas/{htmlFileName}.html", "w", encoding="utf-8")
    openFile.write(streetHTML)
    
    # Addinf the street name for index porpuses
    streetNames.append((meta['nome'], htmlFileName))
    
    # Close the street info file
    openFile.close()
    

for (street,htmlName) in streetNames:
    indexhtml += f"""
        <li> <a href = "./PaginasRuas/{htmlName}.html"> {street} </a> </li>
    """    

indexhtml += """  </ul> 
                </body>         
            </html> 
            """

# Create the index file 
indexFile = open("./index.html", "w", encoding="utf-8")

# Write in the index file
indexFile.write(indexhtml)

# Close the index file
indexFile.close()

# Print on the terminal that everything went well
print("All the street info pages were created successfully!")

                
    
    
    
    
    
    
    