# Compositores de Música

## Autor:

**Nome:** Diogo Pinto Araújo 

**Id:** a100544

## Trabalho a efetuar:
Criar uma aplicação para a gestão de uma base de dados de compositores musicais:
1. Montar a API de dados com o json-server a partir do dataset de compositores em anexo;
2. Criar uma aplicação Web com as seguintes caraterísticas:
    1. CRUD sob re compositores;
    2. CRUD sobre periodos musicais.
3. Investigar e inserir pelo menos 5 compositores do período moderno ou serialista.


## Trabalho efetuado:

Neste código, foi desenvolvido um servidor HTTP em Node.js utilizando o módulo http. O servidor atende a 
diversas rotas para lidar com solicitações de GET e POST, fornecendo páginas HTML dinâmicas e interagindo com
um servidor externo via requisições HTTP utilizando o módulo axios. Além disso, foram implementadas funções 
auxiliares para lidar com o corpo das requisições POST e analisar os seus dados. Foram tambem desenvolvidos templates
para poder ter paginas html mais dinamicas e ocupar menos linhas no ficheiro de backend.

O servidor suporta as seguintes funcionalidades:

- Rota Principal (/): Ao acessar a rota raiz, uma página inicial é exibida, apresentando um conteúdo dinâmico 
que inclui a data e hora da requisição.

- Rota de Compositores (/compositores): Ao acessar esta rota, o servidor faz uma requisição HTTP para obter uma 
lista de compositores de um servidor externo. Em seguida, essa lista é apresentada ao usuário em uma página HTML,
criada usando um template.

- Rota de Detalhes do Compositor (/compositores/:id): Ao acessar esta rota, o servidor faz uma requisição HTTP para
obter os detalhes de um compositor específico com base no ID fornecido na URL. Os detalhes são então apresentados
em uma página HTML utilizando um template.

- Rota de Registro de Compositores (/compositores/registo): Esta rota permite o registro de novos compositores. O
servidor exibe um formulário HTML onde os usuários podem inserir os dados do compositor. Após a submissão do formulário,
os dados são enviados via POST e processados pelo servidor.

- Rota de Edição de Compositores (/compositores/edit/:id): Similar à rota de registro, mas destinada à edição de
compositores existentes. Os dados do compositor selecionado são recuperados e exibidos num formulário pré-preenchido.
Após a submissão do formulário, os dados são atualizados no servidor.

- Rota de Exclusão de Compositores (/compositores/delete/:id): Esta rota permite excluir um compositor específico com
base no ID fornecido na URL. Após a exclusão bem-sucedida, uma mensagem de confirmação é exibida.

- Rota de Lista de Períodos (/periodos): Similar à rota de lista de compositores, esta rota busca e exibe uma lista 
de períodos musicais.

- Rota de Registro de Períodos (/periodos/registo): Permite o registro de novos períodos musicais, exibindo um formulário
HTML para inserção dos dados.

- Rota de Edição de Períodos (/periodos/edit/:id): Similar à rota de edição de compositores, esta rota permite editar
informações de períodos musicais existentes.

- Rota de Exclusão de Períodos (/periodos/delete/:id): Similar à rota de exclusão de compositores, esta rota permite
excluir períodos musicais específicos.

- Além disso, o servidor também lida com erros de forma apropriada, retornando códigos de status HTTP relevantes e
exibindo mensagens de erro informativas quando necessário. O código é estruturado de forma a facilitar a manutenção
e expansão futura do servidor.

### Correr o programa
Para rodar o programa faça em terminais diferentes:

1. `json-server --watch compositores.json`
2. `node code.js`

