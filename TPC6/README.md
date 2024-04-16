# Compositores de Música

## Autor:

**Nome:** Diogo Pinto Araújo 

**Id:** a100544

## Trabalho a efetuar:

Criar uma aplicação para a gestão de uma base de dados de compositores musicais através do `express` e `MongoDB`:
1. Montar a API de dados com o json-server a partir do dataset de compositores em anexo;
2. Criar uma aplicação Web com as seguintes caraterísticas:
    1. CRUD sob re compositores;
    2. CRUD sobre periodos musicais.
    3. Que aceda através do docker à base de dados em mongoDB.
3. Investigar e inserir pelo menos 5 compositores do período moderno ou serialista.

## Trabalho efetuado:

Para construir o programa em primeiro lugar tive de dar seput ao Docker e depois dar import para o mongoDB os jsons com a data
que vai ser precisa para o tpc. Para além disso, decidi criar duas `collections` no mongoDB, uma para compositores outra para periodos,
visto que será necessário para o futuro dividir no models.

Em relação a esta versão, é praticamente tudo igual ao tpc anterior, a única diferença é que usamos o express e o
mongoDB para gerarmos as templates em `.pug` e redirecionamos para cada um deles, tornando este processo muito mais
fácil e prático.

Agora vou explicar um pouco do processo de desenvolvimento:

Primeiramente tive de criar os `models` que especificam como é que as instancias de dados dos compositores
e períodos iam ser obtidas da base de dados.

Depois na pasta `controllers` defini os métodos que acessam a base de dados para obter certas informações, para eliminar certas entradas,
adicionar novas e também modificar entradas ja existentes. Tanto para os compositores como para os períodos através do modelos definidos na 
pasta `models`.

Por fim, defini na pasta `routes` as rotas que o programa tem acesso que ira utilizar os métodos dos ficheiros na pasta `controllers`
para obter/inserir/modificar os dados, que por fim serão utilizados pelas pagina `pug` criadas no tpc anterior.

### Correr o programa
Para rodar o programa faça:

1. `Ter um container a rodar na porta standart com as bases de dados a apontar com os nomes nos ficheiros dos projetos`
2. `npm start`
