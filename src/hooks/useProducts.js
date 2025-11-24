/**
 * Hook Customizado: useProducts
 * 
 * Centraliza a lógica de gerenciamento de estado dos produtos e movimentações.
 * Utiliza o LocalStorage para persistência de dados, simulando um banco de dados.
 * 
 * Funcionalidades:
 * - CRUD de Produtos (Adicionar, Atualizar, Deletar)
 * - Registro de Movimentações (Entrada/Saída)
 * - Cálculo de Estatísticas (Total, Valor, Estoque Baixo)
 */
import { useState, useEffect } from 'react';

const useProducts = () => {
    // Estado para lista de produtos, inicializado do LocalStorage
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('products');
        return saved ? JSON.parse(saved) : [];
    });

    // Estado para histórico de movimentações, inicializado do LocalStorage
    const [movements, setMovements] = useState(() => {
        const saved = localStorage.getItem('movements');
        return saved ? JSON.parse(saved) : [];
    });

    // Efeito para salvar produtos no LocalStorage sempre que houver mudança
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    // Efeito para salvar movimentações no LocalStorage sempre que houver mudança
    useEffect(() => {
        localStorage.setItem('movements', JSON.stringify(movements));
    }, [movements]);

    // Adiciona um novo produto com ID único e data de criação
    const addProduct = (product) => {
        setProducts([...products, { ...product, id: crypto.randomUUID(), createdAt: new Date().toISOString() }]);
    };

    // Atualiza os dados de um produto existente
    const updateProduct = (id, updatedData) => {
        setProducts(products.map(p => p.id === id ? { ...p, ...updatedData } : p));
    };

    // Remove um produto da lista
    const deleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    // Registra uma entrada ou saída de estoque
    const addMovement = (type, productId, quantity) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const newQuantity = type === 'in'
            ? parseInt(product.quantity) + parseInt(quantity)
            : parseInt(product.quantity) - parseInt(quantity);

        if (newQuantity < 0) {
            alert('Quantidade insuficiente em estoque!');
            return;
        }

        // Atualiza a quantidade do produto
        updateProduct(productId, { quantity: newQuantity });

        // Cria o registro de movimentação
        const movement = {
            id: crypto.randomUUID(),
            type,
            productId,
            productName: product.name,
            quantity: parseInt(quantity),
            date: new Date().toISOString(),
        };

        // Mantém apenas as últimas 50 movimentações
        setMovements([movement, ...movements].slice(0, 50));
    };

    // Calcula estatísticas gerais para o Dashboard
    const getStats = () => {
        const totalProducts = products.length;
        const lowStock = products.filter(p => p.quantity < 5).length;
        const totalValue = products.reduce((acc, p) => acc + (p.price * p.quantity), 0);

        return { totalProducts, lowStock, totalValue };
    };

    return {
        products,
        movements,
        addProduct,
        updateProduct,
        deleteProduct,
        addMovement,
        getStats
    };
};

export default useProducts;
