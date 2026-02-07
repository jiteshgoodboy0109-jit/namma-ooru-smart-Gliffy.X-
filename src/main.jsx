import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/Global.css'
import { HashRouter } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { CartProvider } from './context/CartContext'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <CartProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </CartProvider>
    </ToastProvider>
  </React.StrictMode>
)
