/**
 * Arquivo Principal da Aplicação (App.jsx)
 * 
 * Este componente é a raiz da estrutura de UI da aplicação.
 * Ele configura o roteamento (React Router) e define o layout principal,
 * incluindo a Sidebar (barra lateral) e o Header (cabeçalho).
 * 
 * Estrutura:
 * - Router: Envolve toda a aplicação para habilitar navegação.
 * - Sidebar: Navegação lateral fixa.
 * - Header: Cabeçalho superior fixo.
 * - Routes: Define as rotas para cada página (Dashboard, Produtos, Estoque, etc).
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductForm from './pages/ProductForm';
import StockIn from './pages/StockIn';
import StockOut from './pages/StockOut';

function App() {
  return (
    <Router>
      <div className="app-layout">
        {/* Componente de Navegação Lateral */}
        <Sidebar />

        <div className="main-wrapper">
          {/* Cabeçalho da Aplicação */}
          <Header />

          {/* Área Principal de Conteúdo */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/new" element={<ProductForm />} />
              <Route path="/stock/in" element={<StockIn />} />
              <Route path="/stock/out" element={<StockOut />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
