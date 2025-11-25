# Gerenciador de Estoque

Um sistema moderno e eficiente para gerenciamento de inventário, desenvolvido com React e Vite. O projeto apresenta uma interface premium com design Glassmorphism e funcionalidades completas para controle de produtos e movimentações.

Site: (https://levibarbosa.github.io/gerenciador-de-estoque)

## 🚀 Funcionalidades

-   **Dashboard Avançado**:
    -   Métricas em tempo real (Giro de Estoque, Top 5 Vendas, Perdas).
    -   Alertas visuais para estoque baixo e produtos estagnados.
-   **Gestão de Produtos**: Cadastro completo com SKU, Preço e Estoque Mínimo.
-   **Controle de Estoque**:
    -   Entradas (Compras).
    -   Saídas (Vendas, Perdas/Quebras, Uso Interno).
-   **Arquitetura Robusta**:
    -   **Context API**: Gerenciamento de estado global.
    -   **JSON Server**: API simulada para persistência de dados.
    -   **Performance**: Lazy Loading e Memoização.
-   **UX Aprimorada**: Notificações (Toasts), Design Responsivo e Glassmorphism.

## 🛠️ Tecnologias Utilizadas

-   **React 19**: Biblioteca para interface de usuário.
-   **Vite**: Build tool de alta performance.
-   **JSON Server**: Backend simulado (REST API).
-   **React Router**: Navegação SPA.
-   **Lucide React**: Ícones.
-   **React Hot Toast**: Notificações.

## 📦 Como Executar o Projeto

### Pré-requisitos
-   Node.js instalado.

### Passo a Passo

1.  **Clone o repositório**
    ```bash
    git clone https://github.com/levibarbosa/gerenciador-de-estoque.git
    cd gerenciador-estoque
    ```

2.  **Instale as dependências**
    ```bash
    npm install
    ```

3.  **Inicie o Servidor (Banco de Dados)**
    Abra um terminal e execute:
    ```bash
    npm run server
    ```

4.  **Inicie a Aplicação (Frontend)**
    Abra **outro** terminal e execute:
    ```bash
    npm run dev
    ```

5.  **Acesse**
    Abra seu navegador em `http://localhost:5173`.

4.  **Acesse a aplicação**
    Abra seu navegador em `http://localhost:5173` (ou a porta indicada no terminal).

## 📂 Estrutura do Projeto

-   `/src/components`: Componentes reutilizáveis (Sidebar, Header, Tabelas).
-   `/src/pages`: Páginas da aplicação (Dashboard, Produtos, Estoque).
-   `/src/hooks`: Lógica de estado e regras de negócio (`useProducts`).
-   `/src/services`: Configurações de API (preparado para expansão).

## 📝 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usar e modificar.
