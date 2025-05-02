import '@src/i18n/config.ts'
import '@src/i18n/yup/index.ts'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import App from './App.tsx'
import { AppProvider } from './context/AppProvider.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <App />
      <ToastContainer />
    </AppProvider>
  </StrictMode>
)
