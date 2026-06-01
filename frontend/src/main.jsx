import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { BackendStatusProvider } from './context/BackendStatusContext'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        newestOnTop
        pauseOnHover
        theme="colored"
      />
      <BackendStatusProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BackendStatusProvider>
    </BrowserRouter>
  </StrictMode>,
)
