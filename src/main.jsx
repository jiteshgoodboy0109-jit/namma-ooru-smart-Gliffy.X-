import React from 'react'
import { createRoot } from 'react-dom/client'
import App, { ToastProvider } from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ToastProvider>
        <App />
      </ToastProvider>
    </HashRouter>
  </React.StrictMode>
)
