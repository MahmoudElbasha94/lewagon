import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// TODO: في Django، سيتم استخدام:
// 1. Django WSGI/ASGI بدلاً من React Entry Point
// 2. Django Static Files بدلاً من React Assets
// 3. Django Template Engine بدلاً من React DOM
// 4. Django Settings بدلاً من React Config

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
