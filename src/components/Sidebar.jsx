/**
 * Componente Sidebar (Barra Lateral)
 * 
 * Responsável pela navegação principal da aplicação.
 * Exibe links para as diferentes rotas (Dashboard, Produtos, Estoque).
 * Utiliza ícones da biblioteca 'lucide-react' e destaca a rota ativa.
 */
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, PlusCircle, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    // Verifica se a rota atual corresponde ao caminho do link para aplicar estilo ativo
    const isActive = (path) => location.pathname === path;

    const menuItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/products', icon: Package, label: 'Produtos' },
        { path: '/products/new', icon: PlusCircle, label: 'Novo Produto' },
        { path: '/stock/in', icon: ArrowDownCircle, label: 'Entrada' },
        { path: '/stock/out', icon: ArrowUpCircle, label: 'Saída' },
    ];

    return (
        <aside className="sidebar glass">
            <div className="sidebar-header">
                <h2 className="sidebar-title">Gerenciador</h2>
            </div>

            <nav className="sidebar-nav">
                <ul className="nav-list">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                            >
                                <item.icon size={20} color={isActive(item.path) ? 'var(--accent-primary)' : 'currentColor'} />
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
