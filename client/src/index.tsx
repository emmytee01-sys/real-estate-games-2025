import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { GlobalStyles } from './styles/GlobalStyles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #00ff88',
          },
          success: {
            iconTheme: {
              primary: '#00ff88',
              secondary: '#1a1a1a',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff4444',
              secondary: '#1a1a1a',
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
); 