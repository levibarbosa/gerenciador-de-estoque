/**
 * Página de Entrada de Estoque (StockIn.jsx)
 * 
 * Permite registrar a entrada de produtos no estoque.
 * Exibe um formulário para selecionar o produto e a quantidade.
 * Também mostra o histórico recente de entradas.
 */
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import { ArrowDownCircle, History } from 'lucide-react';

const StockIn = () => {
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

    addMovement('in', selectedProduct, quantity);
    setQuantity('');
    alert('Entrada registrada com sucesso!');
    navigate('/products');
  };

  const stockInMovements = movements.filter(m => m.type === 'in');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div>
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowDownCircle className="text-success" />
            Registrar Entrada
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

            <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'var(--success)' }}>
              Confirmar Entrada
            </button>
          </form>
        </div>
      </div>

      <div>
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <History />
            Histórico de Entradas
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {stockInMovements.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>Nenhuma movimentação recente.</p>
            ) : (
              stockInMovements.slice(0, 10).map(m => (
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
                  <span className="badge badge-success">+{m.quantity}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockIn;
