/**
 * Página de Saída de Estoque (StockOut.jsx)
 * 
 * Permite registrar a saída de produtos do estoque.
 * Exibe um formulário para selecionar o produto e a quantidade.
 * Também mostra o histórico recente de saídas.
 */
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import { ArrowUpCircle, History } from 'lucide-react';

const StockOut = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productIdParam = searchParams.get('productId');

  const { products, movements, addMovement } = useProducts();

  const [selectedProduct, setSelectedProduct] = useState(productIdParam || '');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (productIdParam) {
      setSelectedProduct(productIdParam);
    }
  }, [productIdParam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct || !quantity) return;

    addMovement('out', selectedProduct, quantity);
    setQuantity('');
    alert('Saída registrada com sucesso!');
    navigate('/products');
  };

  const stockOutMovements = movements.filter(m => m.type === 'out');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div>
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowUpCircle className="text-danger" />
            Registrar Saída
          </h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label className="label" htmlFor="product">Produto</label>
              <select
                id="product"
                className="input"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                required
              >
                <option value="">Selecione um produto...</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name} (Atual: {p.quantity})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label" htmlFor="quantity">Quantidade</label>
              <input
                type="number"
                id="quantity"
                className="input"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                min="1"
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'var(--danger)' }}>
              Confirmar Saída
            </button>
          </form>
        </div>
      </div>

      <div>
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <History />
            Histórico de Saídas
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {stockOutMovements.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>Nenhuma movimentação recente.</p>
            ) : (
              stockOutMovements.slice(0, 10).map(m => (
                <div key={m.id} style={{
                  padding: '1rem',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <p style={{ fontWeight: '500' }}>{m.productName}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {new Date(m.date).toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <span className="badge badge-danger">-{m.quantity}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockOut;
