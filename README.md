<p align="center">
  <img src= "Release 2/public/images/m3d.svg" width="50%" >
</p>

### Descrição geral
Este projeto, nomeado <b>M3D Filmes</b>, é uma aplicação WEB de busca de informações e interação de usuários a respeito de filmes, séries e animações, desenvolvido dentro do contexto da disciplina de Desenvolvimento de Aplicações WEB na Universidade Federal do Ceará (TI0080 - DETi/UFC, 2020.1) por alunos do curso de Engenharia de Computação.

### Funcionalidades implementadas
- Busca e listagem de filmes, séries e animações
- Detalhes de filmes, séries e animações com várias informações como título, gênero, sinopse, trailer, tempo de duração, avaliações e comentários dos usuários cadastrados a respeito do título desejado
- Lista de títulos favoritos do usuário
- Três tipos de perfis de usuário: não-cadastrado, cadastrado e administrador
- Funções para submissão, criação, edição e exclusão de filmes, séries e animações da base de dados
- Controle de autenticação e autorização para cada usuário
- Configurações personalizáveis de layout: recurso de acessibilidade de alto contraste e aumento/redução do tamanho da fonte da aplicação
- Persistência de dados da aplicação
- A aplicação foi estruturada em dois serviços:  um gateway responsável pelas regras de negócio da aplicação e outro responsável pela persistência e manipulação de dados

### Permissões de usuários
- Usuário não-cadastrado: poderá fazer pesquisas e consultas, além de poder ver todo o material exposto no site, sem fazer qualquer tipo de interação com a aplicação
- Usuário cadastrado: possui todos os acessos de um usuário não-cadastrado mais as seguintes funcionalidades: fazer comentários, avaliar e submeter sugestões de títulos ao administrador
- Administrador: tem a permissão de aceitar ou não sugestões de títulos enviados, cadastrar, editar e excluir comentários

### Tecnologias utilizadas
- Express Web Framework (Node.js)
- HTML5/CSS/JavaScript
- LowDB (Utilizando estruturas JSON)

### Executando o projeto
Instalações necessárias:
- Node.js (disponível em https://nodejs.org/pt-br/download/)
- Um Browser

Passos para execução:
- Baixe ou clone o repositório (disponível em https://github.com/MarcusVLMA/m3d-movies)
- Abra um terminal na raiz do projeto e instale as dependências com o comando ```npm install```
- Execute o programa com o comando ```npm run start```
- Abra seu navegador e digite na barra de pesquisa "http://localhost:3000/"

### Colaboradores
Daniel Araújo Chaves Souza, Marcus Jeovanni, Marcus Vinícius L. M. de Andrade, Michelly Karen Diogenes Pereira.
