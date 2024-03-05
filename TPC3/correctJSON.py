import sys
import os
import re

# Open the file in read modo and reading the data
with open('filmes.json', 'r+', encoding='utf-8') as file1:
    data = file1.read()
    data = re.sub(r'^(\{.+\})$', r'\1,', data, flags=re.MULTILINE)[:-1]
    
# Open the file in write mode, to fix the first problem
with open('filmesCorrigido.json', 'w', encoding='utf-8') as file3:
        file3.write('{"filmes":[\n' + data)
        file3.write('\n]}')

  

    
                       

            