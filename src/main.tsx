import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import './index.css'

/**
 * Habilita MSW (Mock Service Worker) si la variable de entorno está activa
 */
async function enableMocking() {
  // Solo habilitar si VITE_ENABLE_MOCKING está en 'true'
  if (import.meta.env.VITE_ENABLE_MOCKING !== 'true') {
    return
  }

  const { worker } = await import('./mocks/browser')

  return worker.start({
    onUnhandledRequest: 'bypass', // No advertir sobre requests no mockeadas
  })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
