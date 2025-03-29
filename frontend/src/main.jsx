import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import AuthProvider from './contexts/Auth/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider> 
        <StrictMode>
          <App/>
        </StrictMode>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)