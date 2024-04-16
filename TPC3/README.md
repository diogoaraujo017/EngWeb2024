# Construir páginas em html através do node JS e com dados de um JSON

## Autor:

**Nome:** Diogo Pinto Araújo 

**Id:** a100544

## Trabalho a efetuar:

1. GET /filmes            página com uma listagem dos filmes (links embutidos para os filmes)
2. GET /filmes/<filmeID>  página do filme (apresentar atributos do filme cast*, genre*, ...)
3. GET /atores            página com uma listagem dos atores (links embutidos para os atores)
4. GET /atores/<atorID>   página do ator
5. GET /generos           página com uma listagem dos generos
6. GET /generos/<generoX> página com os filmes do genero X


## Trabalho efetuado:

Primeiramente corrigui o dataset pois não estava com a estrutura correta. Desenvolvido um programa em Python capaz de resolver esse problema.

Através do módulo `axios` consegui obter as informações que se encontram no json acerta dos filmes, atores e géneros.

Ao clicar no link inicial o programa abre um menu onde se pode escolher ver a lista de filmes, atores ou géneros.

### Fetch de dados

Para apresentar todos os nomes dos filmes e criar hiperlinks para cada um deles, acessei ao JSON utilizando 
o comando axios.get("http://localhost:3000/filmes") e iterei sobre todos os filmes para escrever os seus nomes e criar 
hiperlinks para suas páginas individuais.

Para listar os nomes de todos os atores usei o comando axios.get("http://localhost:3000/filmes").
Em seguida, iterei sobre todos os filmes para criar um conjunto sem repetições contendo os nomes de todos os atores,que
de seguida, foram escritos na pagina em forma de lista estando hiperlingado as suas respectivas página.

Para apresentar os nomes de todos os gêneros de filmes, utilizei o mesmo processo, acessando o JSON e iterando sobre 
todos os filmes para criar um conjunto sem repetições dos nomes dos gêneros. Novamente, cada nome de gênero foi hiperlinkado
para sua página correspondente.

A página de cada filme é obtida acedendo ao id do url em que estamos depois de termos clicado na hiperligação através de uma
expressão regular que apanha esse mesmo id. Executando o comando `axios.get('http://localhost:3000/filmes?_id.$oid=' + id)`
consegui aceder a informações específicas de cada filme, sendo capaz de indicar o seu nome, género, atores e datas.

A página de cada actor é obtida acedendo ao id do url em que estamos depois de termos clicado na hiperligação através de uma
expressão regular que apanha esse mesmo id. Executando o comando `axios.get('http://localhost:3000/filmes')`
consegui obter uma lista de todos os filmes da base de dados e iterando pela mesma verifiquei que filmes o actor participou,
podendo assim dar display aos mesmos na página do actor com a devida hiperligação.

A página de cada género é obtida acedendo ao nome do género presente no url em que estamos depois de termos clicado na hiperligação
através de uma expressão regular que apanha esse mesmo nome. Executando o comando `axios.get('http://localhost:3000/filmes')`
consegui obter uma lista de todos os filmes da base de dados e iterando pela mesma verifiquei que filmes são do género em que estamos,
podendo assim dar display aos mesmos na página do género com a devida hiperligação.

### Correr o programa
Para rodar o programa faça em terminais diferentes:

1. `json-server --watch filmesCorrigido.json`
2. `node code.js`

O programa da output no terminal ao link on pode verificar o site a correr!
