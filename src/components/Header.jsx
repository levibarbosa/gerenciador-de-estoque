/**
 * Componente Header (Cabeçalho)
 * 
 * Exibe o título da página atual com base na rota.
 * Fica fixo no topo da área de conteúdo principal.
 */
import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    // Determina o título da página baseado na URL atual
    const getTitle = () => {
        switch (location.pathname) {
            case '/': return 'Dashboard';
            case '/products': return 'Lista de Produtos';
            case '/products/new': return 'Novo Produto';
            case '/stock/in': return 'Entrada de Estoque';
            case '/stock/out': return 'Saída de Estoque';
            default: return 'Gerenciador';
        }
    };

    return (
        <header className="header glass">
            <h1 className="header-title">{getTitle()}</h1>
        </header>
    );
};

export default Header;
