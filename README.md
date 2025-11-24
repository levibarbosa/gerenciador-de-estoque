# Gerenciador de Estoque

Um sistema moderno e eficiente para gerenciamento de inventário, desenvolvido com React e Vite. O projeto apresenta uma interface premium com design Glassmorphism e funcionalidades completas para controle de produtos e movimentações.

![Gerenciador Preview](https://levibarbosa.github.io/gerenciador-de-estoque)

## 🚀 Funcionalidades

-   **Dashboard Interativo**: Visão geral com métricas de total de produtos, valor do inventário e alertas de estoque baixo.
-   **Gestão de Produtos**: Cadastro, edição e exclusão de produtos com controle de SKU e preços.
-   **Controle de Estoque**:
    -   Registro de Entradas (Abastecimento).
    -   Registro de Saídas (Vendas/Baixas).
    -   Histórico detalhado de movimentações.
-   **Persistência de Dados**: Utiliza `LocalStorage` para manter os dados salvos no navegador, sem necessidade de backend complexo inicial.
-   **Design Responsivo**: Interface adaptável para diferentes tamanhos de tela.

## 🛠️ Tecnologias Utilizadas

-   **React**: Biblioteca JavaScript para construção da interface.
-   **Vite**: Ferramenta de build rápida e leve.
-   **CSS Moderno**: Variáveis CSS, Flexbox/Grid e efeitos de Glassmorphism (Vidro Fosco).
-   **React Router**: Gerenciamento de rotas e navegação.
-   **Lucide React**: Ícones modernos e leves.

## 📦 Como Executar o Projeto

1.  **Clone o repositório**
    ```bash
    git clone https://github.com/levibarbosa/gerenciador-de-estoque.git
    cd gerenciador-estoque
    ```

2.  **Instale as dependências**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento**
    ```bash
    npm run dev
    ```

4.  **Acesse a aplicação**
    Abra seu navegador em `http://localhost:5173` (ou a porta indicada no terminal).

## 📂 Estrutura do Projeto

-   `/src/components`: Componentes reutilizáveis (Sidebar, Header, Tabelas).
-   `/src/pages`: Páginas da aplicação (Dashboard, Produtos, Estoque).
-   `/src/hooks`: Lógica de estado e regras de negócio (`useProducts`).
-   `/src/services`: Configurações de API (preparado para expansão).

## 📝 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usar e modificar.
