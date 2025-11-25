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
import { Package, AlertTriangle, DollarSign, TrendingUp, TrendingDown, Activity, AlertOctagon } from 'lucide-react';

const Dashboard = () => {
  const { getStats, getDashboardMetrics } = useProducts();
  const stats = getStats();
  const metrics = getDashboardMetrics();

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

  const advancedCards = [
    {
      title: 'Giro de Estoque (30d)',
      value: metrics.turnoverRate + 'x',
      icon: Activity,
      color: 'var(--info)',
      bg: 'rgba(6, 182, 212, 0.1)',
      desc: 'Renovação do estoque'
    },
    {
      title: 'Perdas/Quebras',
      value: metrics.totalLossValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      icon: TrendingDown,
      color: 'var(--danger)',
      bg: 'rgba(239, 68, 68, 0.1)',
      desc: 'Prejuízo acumulado'
    },
    {
      title: 'Produtos Encalhados',
      value: metrics.stagnantProducts.length,
      icon: AlertOctagon,
      color: 'var(--text-secondary)',
      bg: 'rgba(107, 114, 128, 0.1)',
      desc: 'Sem saída há 30 dias'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Cards Principais */}
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

      {/* Métricas Avançadas */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>Análise de Estoque</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {advancedCards.map((card, index) => (
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
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{card.value}</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Top Produtos e Encalhados Detalhado */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>

        {/* Top 5 Produtos */}
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={20} className="text-success" />
            Top 5 Mais Vendidos (30 dias)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {metrics.topSellingProducts.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>Nenhuma venda recente.</p>
            ) : (
              metrics.topSellingProducts.map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontWeight: '500' }}>{i + 1}. {p.name}</span>
                  <span className="badge badge-success">{p.quantity} un</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Produtos Encalhados (Lista) */}
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertOctagon size={20} className="text-warning" />
            Alerta: Produtos Parados (+30 dias)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '300px', overflowY: 'auto' }}>
            {metrics.stagnantProducts.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>Nenhum produto parado.</p>
            ) : (
              metrics.stagnantProducts.slice(0, 10).map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontWeight: '500' }}>{p.name}</span>
                  <span className="badge badge-warning" style={{ backgroundColor: 'var(--warning)', color: '#fff' }}>Estoque: {p.quantity}</span>
                </div>
              ))
            )}
            {metrics.stagnantProducts.length > 10 && (
              <p style={{ fontSize: '0.8rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                E mais {metrics.stagnantProducts.length - 10} produtos...
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
