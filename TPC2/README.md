# Construir páginas html com base num ficheiro .JSON

## Objetivo:
1. Construir uma página individual para cada uma das cidades, através de um script em Python.
2. Construir a página índice através do node que hiperliga cada uma das ruas à sua página.

## Resolução:

Executando o script em Python, o programa consegue, através do arquivo JSON, obter informações sobre as cidades e criar as páginas HTML para cada uma delas.

- Cada página das cidades contém o seu nome, a população, o distrito a que pertence, uma breve descrição e, por fim, as ligações entre outras cidades.

- Cada ligação contém a cidade de destino, juntamente com a distância. Para fazer isso, itero sobre todas as entradas de ligação do arquivo JSON e filtro
- aquelas cujo ID da cidade de origem corresponde à cidade atual. Podendo assim incluir o nome da cidade de destino e a distância entre a cidade atual. O nome da cidade
- de destino foi obtido através de uma iteração pelas cidades presentes no arquivo JSON. Esta iteração foi necessária pois na informação acerca das ligações
- apenas nos é dado o identificador da cidade e não o seu nome.

Para o índice, foi sugerido o uso do Node.js. Criei um servidor em JavaScript para gerenciar o tráfego e redirecionamento das páginas da seguinte maneira:

- Primeiro, verificamos em que página estamos. Se no final do URL estiver apenas `/`, o programa exibe o índice com referências para as páginas das cidades.

- Cada página de uma cidade é acessada através do URL sendo `/c{numero_cidade}`. Logo, se tivermos um URL com `/c{...}`, o programa passará a
- exibir a página HTML da cidade com o número correspondente, que foi anteriormente criada pelo script de Python presente na pasta `Cidades`.

- Se nenhum dos casos acima se aplicar ou o número presente na substring `/c{numero}` não corresponder a nenhuma cidade, o programa exibe uma mensagem de erro no terminal.


### Executar o programa
Para executar o programa, execute os seguintes comandos em terminais diferentes:

1. `json-server --watch mapa-virtual.json`
2. `node code.js`

