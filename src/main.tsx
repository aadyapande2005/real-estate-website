import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.scss"
import { AuthContextProvider } from './context/authcontext'

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
)
