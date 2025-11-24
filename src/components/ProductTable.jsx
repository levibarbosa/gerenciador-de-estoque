import { Link } from 'react-router-dom';
import { Edit, ArrowDownCircle, ArrowUpCircle, Trash2 } from 'lucide-react';

const ProductTable = ({ products, onDelete }) => {
  return (
    <div className="card" style={{ overflowX: 'auto', padding: 0 }}>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>SKU</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                Nenhum produto cadastrado.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td style={{ fontWeight: '500' }}>{product.name}</td>
                <td style={{ fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{product.sku}</td>
                <td>{product.quantity}</td>
                <td>{parseFloat(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>
                  <span className={`badge ${product.quantity < 5 ? 'badge-danger' : 'badge-success'}`}>
                    {product.quantity < 5 ? 'Baixo Estoque' : 'Em Estoque'}
                  </span>
                </td>
                <td style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <Link to={`/stock/in?productId=${product.id}`} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} title="Entrada">
                    <ArrowDownCircle size={16} />
                  </Link>
                  <Link to={`/stock/out?productId=${product.id}`} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} title="Saída">
                    <ArrowUpCircle size={16} />
                  </Link>
                  <button onClick={() => onDelete(product.id)} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', color: 'var(--danger)', borderColor: 'var(--danger)' }} title="Excluir">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
