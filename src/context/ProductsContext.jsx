import { createContext, useState, useEffect, useMemo, useContext } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [movements, setMovements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Carregar dados iniciais
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [productsData, movementsData] = await Promise.all([
                api.getProducts(),
                api.getMovements()
            ]);
            setProducts(productsData);
            setMovements(movementsData);
        } catch (err) {
            console.error("Erro ao carregar dados:", err);
            setError("Falha ao carregar dados do servidor.");
            toast.error("Falha ao conectar com o servidor.");
        } finally {
            setLoading(false);
        }
    };

    // Adiciona um novo produto
    const addProduct = async (productData) => {
        try {
            const newProduct = {
                ...productData,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
                quantity: parseInt(productData.quantity) || 0
            };
            const savedProduct = await api.createProduct(newProduct);
            setProducts(prev => [...prev, savedProduct]);
            toast.success("Produto criado com sucesso!");
            return savedProduct;
        } catch (err) {
            console.error("Erro ao criar produto:", err);
            toast.error("Erro ao salvar produto.");
        }
    };

    // Atualiza os dados de um produto existente
    const updateProduct = async (id, updatedData) => {
        try {
            const savedProduct = await api.updateProduct(id, updatedData);
            setProducts(prev => prev.map(p => p.id === id ? savedProduct : p));
            return savedProduct;
        } catch (err) {
            console.error("Erro ao atualizar produto:", err);
            toast.error("Erro ao atualizar produto.");
            throw err; // Re-throw para tratamento local se necessário
        }
    };

    // Remove um produto da lista
    const deleteProduct = async (id) => {
        if (!confirm('Tem certeza que deseja excluir este produto?')) return;
        try {
            await api.deleteProduct(id);
            setProducts(prev => prev.filter(p => p.id !== id));
            toast.success("Produto excluído.");
        } catch (err) {
            console.error("Erro ao deletar produto:", err);
            toast.error("Erro ao excluir produto.");
        }
    };

    // Registra uma entrada ou saída de estoque
    const addMovement = async (type, productId, quantity, category = 'sale') => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const qty = parseInt(quantity);
        const newQuantity = type === 'in'
            ? parseInt(product.quantity) + qty
            : parseInt(product.quantity) - qty;

        if (newQuantity < 0) {
            toast.error('Quantidade insuficiente em estoque!');
            return;
        }

        try {
            // 1. Atualiza o produto
            await updateProduct(productId, { quantity: newQuantity });

            // 2. Cria o registro de movimentação
            const movement = {
                id: crypto.randomUUID(),
                type, // 'in' ou 'out'
                category: type === 'in' ? 'purchase' : category,
                product_id: productId,
                productName: product.name,
                quantity: qty,
                date: new Date().toISOString(),
                created_at: new Date().toISOString()
            };

            const savedMovement = await api.createMovement(movement);
            setMovements(prev => [savedMovement, ...prev]);
            toast.success("Movimentação registrada!");
        } catch (err) {
            console.error("Erro ao registrar movimentação:", err);
            toast.error("Erro ao registrar movimentação.");
        }
    };

    // Calcula estatísticas gerais para o Dashboard
    const getStats = () => {
        const totalProducts = products.length;
        const lowStock = products.filter(p => p.quantity < (p.min_stock || 5)).length;
        const totalValue = products.reduce((acc, p) => acc + (p.price * p.quantity), 0);

        return { totalProducts, lowStock, totalValue };
    };

    // Novas Métricas Avançadas (Memoized)
    const dashboardMetrics = useMemo(() => {
        const now = new Date();
        const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

        const recentOutMovements = movements.filter(m =>
            m.type === 'out' &&
            m.category === 'sale' &&
            new Date(m.date || m.created_at) >= thirtyDaysAgo
        );

        const totalItemsSold = recentOutMovements.reduce((acc, m) => acc + m.quantity, 0);
        const currentTotalStock = products.reduce((acc, p) => acc + parseInt(p.quantity), 0);
        const turnoverRate = currentTotalStock > 0 ? (totalItemsSold / currentTotalStock).toFixed(2) : 0;

        const salesByProduct = {};
        recentOutMovements.forEach(m => {
            const pId = m.product_id || m.productId;
            salesByProduct[pId] = (salesByProduct[pId] || 0) + m.quantity;
        });

        const topSellingProducts = Object.entries(salesByProduct)
            .map(([id, qty]) => {
                const product = products.find(p => p.id === id);
                return product ? { name: product.name, quantity: qty } : null;
            })
            .filter(Boolean)
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5);

        const stagnantProducts = products.filter(p => {
            if (parseInt(p.quantity) === 0) return false;
            const hasRecentSale = recentOutMovements.some(m => (m.product_id || m.productId) === p.id);
            return !hasRecentSale;
        });

        const lossMovements = movements.filter(m => m.type === 'out' && m.category === 'loss');
        const totalLossValue = lossMovements.reduce((acc, m) => {
            const pId = m.product_id || m.productId;
            const product = products.find(p => p.id === pId);
            return acc + (m.quantity * (product ? product.price : 0));
        }, 0);

        return {
            turnoverRate,
            topSellingProducts,
            stagnantProducts,
            totalLossValue
        };
    }, [products, movements]);

    return (
        <ProductsContext.Provider value={{
            products,
            movements,
            loading,
            error,
            addProduct,
            updateProduct,
            deleteProduct,
            addMovement,
            getStats,
            dashboardMetrics // Expondo o valor memoizado diretamente
        }}>
            {children}
        </ProductsContext.Provider>
    );
};
