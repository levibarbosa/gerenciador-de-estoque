/**
 * Ponto de Entrada da Aplicação (main.jsx)
 * 
 * Este é o arquivo inicial onde o React é injetado no DOM do navegador.
 * Ele renderiza o componente raiz (App) dentro da div com id 'root'.
 * Também importa os estilos globais (index.css).
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
