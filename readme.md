# Agenda com CRUD e Sistema de Login

Este é um projeto de agenda simples com operações CRUD (Create, Read, Update, Delete) e um sistema de login. Foi desenvolvido utilizando Node.js, Express, MongoDB como banco de dados e EJS como engine de visualização, seguindo a arquitetura Model-View-Controller (MVC).

## Pré-requisitos

- Node.js instalado
- MongoDB instalado e em execução

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/agenda-nodejs-mongodb.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd agenda-nodejs-mongodb
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto:

   ```env
   PORT=3131
   MONGODB_URI=sua_url_de_conexao_mongodb
   SESSION_SECRET=sua_chave_secreta_para_sessao
   ```

   Substitua `sua_url_de_conexao_mongodb` pela URL de conexão com o MongoDB e `sua_chave_secreta_para_sessao` por uma chave secreta para a sessão.

5. Inicie o servidor:

   ```bash
   npm start
   ```

   O servidor estará em execução em `http://localhost:3131`.

## Estrutura do Projeto

A estrutura do projeto segue o padrão MVC:

- `models/`: Contém os modelos de dados (usando Mongoose).
- `views/`: Contém os arquivos de visualização EJS.
- `controllers/`: Contém os controladores que manipulam as requisições.
- `routes/`: Define as rotas da aplicação.
- `middlewares/`: Middleware para verificar a autenticação do usuário.

## Funcionalidades

- **CRUD de Contatos:** Adicionar, visualizar, atualizar e excluir contatos.
- **Sistema de Login:** Autenticação de usuários para acesso às funcionalidades da agenda.

## Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB
- EJS (Embedded JavaScript) para as visualizações
- Mongoose para modelagem e interação com o MongoDB

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Basta criar uma _issue_ ou enviar um _pull request_. 

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).