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
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ProductsProvider } from './context/ProductsContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Lazy Loading das páginas
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Products = lazy(() => import('./pages/Products'));
const ProductForm = lazy(() => import('./pages/ProductForm'));
const StockIn = lazy(() => import('./pages/StockIn'));
const StockOut = lazy(() => import('./pages/StockOut'));

// Componente de Loading Simples
const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--text-secondary)' }}>
    Carregando...
  </div>
);

function App() {
  return (
    <ProductsProvider>
      <Router>
        <div className="app-layout">
          <Toaster position="top-right" />
          <Sidebar />

          <div className="main-wrapper">
            <Header />

            <main className="main-content">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/new" element={<ProductForm />} />
                  <Route path="/stock/in" element={<StockIn />} />
                  <Route path="/stock/out" element={<StockOut />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
      </Router>
    </ProductsProvider>
  );
}

export default App;
