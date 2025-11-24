/**
 * Página de Produtos (Products.jsx)
 * 
 * Lista todos os produtos cadastrados no sistema.
 * Permite a navegação para a criação de novos produtos.
 * Utiliza o componente ProductTable para exibir os dados.
 */
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import ProductTable from '../components/ProductTable';
import { Plus } from 'lucide-react';

const Products = () => {
    const { products, deleteProduct } = useProducts();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ color: 'var(--text-secondary)' }}>Gerencie seu inventário de forma eficiente.</p>
                <Link to="/products/new" className="btn btn-primary">
                    <Plus size={20} />
                    Novo Produto
                </Link>
            </div>

            <ProductTable products={products} onDelete={deleteProduct} />
        </div>
    );
};

export default Products;
