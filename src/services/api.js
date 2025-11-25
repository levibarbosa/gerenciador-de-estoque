/**
 * Serviço de API (api.js)
 * 
 * Este arquivo serve como um placeholder para configuração de chamadas HTTP (Axios/Fetch).
 * Atualmente não está sendo utilizado pois a aplicação usa LocalStorage,
 * mas está preparado para futura integração com Backend.
 */
/**
 * Serviço de API (api.js)
 * 
 * Gerencia todas as chamadas HTTP para o json-server.
 */
const API_URL = 'http://localhost:3000';

const api = {
    // Produtos
    getProducts: async () => {
        const response = await fetch(`${API_URL}/products`);
        return response.json();
    },
    getProduct: async (id) => {
        const response = await fetch(`${API_URL}/products/${id}`);
        return response.json();
    },
    createProduct: async (product) => {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        return response.json();
    },
    updateProduct: async (id, data) => {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },
    deleteProduct: async (id) => {
        await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
    },

    // Movimentações
    getMovements: async () => {
        // Ordenar por data decrescente (json-server suporta _sort e _order)
        const response = await fetch(`${API_URL}/stock_movements?_sort=date&_order=desc`);
        return response.json();
    },
    createMovement: async (movement) => {
        const response = await fetch(`${API_URL}/stock_movements`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movement)
        });
        return response.json();
    }
};

export default api;
