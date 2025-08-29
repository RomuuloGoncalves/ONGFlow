# ONGFlow
<!-- [![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/RomuuloGoncalves/ONGFlow) -->

ONGFlow é uma aplicação web full-stack projetada para otimizar as operações de Organizações Não Governamentais (ONGs). O projeto é construído com uma arquitetura de backend e frontend separados, contidos em um monorepo.

O backend é desenvolvido com o framework Laravel, fornecendo uma API robusta para o gerenciamento de dados. O frontend é uma interface de usuário moderna e interativa construída com React e Vite.

## Tecnologias Utilizadas

-   **Backend**: PHP, Laravel
-   **Frontend**: JavaScript, React, Vite
-   **Banco de Dados**: SQLite (padrão), com configurações para MySQL, MariaDB, PostgreSQL e SQL Server.
-   **Implantação (Deployment)**: Deploy automatizado para o GitHub Pages através do GitHub Actions.

## Estrutura do Projeto

O repositório está organizado em dois diretórios principais:

-   `Backend/`: Contém a aplicação Laravel 12 que serve como API, cuidando de toda a lógica de negócios, interações com o banco de dados e autenticação.
-   `Frontend/`: Contém a aplicação cliente React, construída com Vite, que consome a API do backend para fornecer uma experiência de usuário dinâmica.

## Como Começar

Siga estas instruções para configurar e executar o projeto em sua máquina local.

### Pré-requisitos

-   PHP >= 8.2
-   Composer
-   Node.js e npm

### Configuração do Backend (Laravel)

1.  Navegue até o diretório `Backend`:
    ```sh
    cd Backend
    ```

2.  Instale as dependências do PHP:
    ```sh
    composer install
    ```

3.  Crie seu arquivo de ambiente copiando o exemplo:
    ```sh
    cp .env.example .env
    ```

4.  Gere uma nova chave para a aplicação:
    ```sh
    php artisan key:generate
    ```

5.  Execute as migrações do banco de dados. Isso criará o arquivo `database.sqlite` padrão e configurará as tabelas necessárias.
    ```sh
    php artisan migrate
    ```

6.  Inicie o servidor de desenvolvimento local:
    ```sh
    php artisan serve
    ```

A API do backend estará rodando em `http://127.0.0.1:8000`.

### Configuração do Frontend (React + Vite)

1.  Em um novo terminal, navegue até o diretório `Frontend`:
    ```sh
    cd Frontend
    ```

2.  Instale as dependências do Node.js:
    ```sh
    npm install
    ```

3.  Inicie o servidor de desenvolvimento do frontend:
    ```sh
    npm run dev
    ```

A aplicação frontend estará acessível na URL fornecida pelo Vite (geralmente `http://localhost:5173`).

## Implantação (Deployment)

Este repositório está configurado com um workflow do GitHub Actions para construir e implantar automaticamente a aplicação frontend no GitHub Pages.

O workflow, definido em `.github/workflows/deploy.yml`, é acionado a cada push para a branch `main`. Ele executa os seguintes passos:
1.  Faz o checkout do código.
2.  Configura o Node.js.
3.  Navega para o diretório `Frontend`, instala as dependências e constrói os arquivos estáticos.
4.  Implanta a pasta `dist` gerada para a branch `gh-pages`, publicando a aplicação.