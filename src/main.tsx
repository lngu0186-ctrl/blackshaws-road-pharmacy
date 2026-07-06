import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastProvider } from './context/ToastContext'
import './index.css'
import App from './App'

// Scroll-reveal styles only hide content when this flag is present,
// so the site stays readable if JS never runs.
document.documentElement.classList.add('js-motion')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>,
)
