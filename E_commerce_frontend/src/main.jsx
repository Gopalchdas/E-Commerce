import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ShopcontextProvider from './contexts/Shopcontext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ShopcontextProvider>
    <App />
    </ShopcontextProvider>
)
