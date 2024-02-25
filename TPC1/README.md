# Construir páginas estáticas em HTML 

## Objetivo:
1. Construir a primeira página contendo todos os índices dos nomes das ruas e com anchor tags que redirecionem para uma página especifica da rua.
2. Essa página terá todas as informações relativas à rua, assim como um link para voltar à página de índices.

Fazer para uma ou duas ruas!

## Resolução:

Para a página de índice inicial, conforme fui criando as paginas de htmlreferentes as ruas fui acumulando numa lista de tuplos o nome da rua e o nome do ficheiro de html referente a essa rua para no final poder criaro indice com as devidas referencias.

Para realizar a analise de cada um dos ficheiros .xml utilizei as bibliotecas xmltodict e BeautifulSoup. Presente em cada uma das página das ruas temos as seguintes informações:

- Para cada uma das página das ruas temos informações sobre o nome da rua, o seu número, uma breve descrição.
- Temos também informações acerca da rua (casas, desenhos e fotos).
- Temos também presente uma lista de casas, onde é possível obter  informações específicas acerca das mesmas.
- Desenhos antigos com várias vistas
- Imagens atuais das ruas que é possível aceder através da pasta "atual". Tendo cada rua duas imagens, com vistas diferentes.
