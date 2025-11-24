/**
 * Componente Dashboard (Página Inicial)
 * 
 * Exibe uma visão geral do sistema com métricas importantes.
 * Utiliza o hook useProducts para buscar dados atualizados.
 * 
 * Métricas exibidas:
 * - Total de Produtos
 * - Produtos com Estoque Baixo
 * - Valor Total do Inventário
 */
import useProducts from '../hooks/useProducts';
import { Package, AlertTriangle, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const { getStats } = useProducts();
  const stats = getStats();

  const cards = [
    {
      title: 'Total de Produtos',
      value: stats.totalProducts,
      icon: Package,
      color: 'var(--accent-primary)',
      bg: 'rgba(59, 130, 246, 0.1)'
    },
    {
      title: 'Estoque Baixo',
      value: stats.lowStock,
      icon: AlertTriangle,
      color: 'var(--warning)',
      bg: 'rgba(234, 179, 8, 0.1)'
    },
    {
      title: 'Valor Total',
      value: stats.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      icon: DollarSign,
      color: 'var(--success)',
      bg: 'rgba(34, 197, 94, 0.1)'
    }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
      {cards.map((card, index) => (
        <div key={index} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{
            padding: '1rem',
            borderRadius: '50%',
            backgroundColor: card.bg,
            color: card.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <card.icon size={32} />
          </div>
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500' }}>{card.title}</p>
            <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{card.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
