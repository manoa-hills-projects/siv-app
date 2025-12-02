import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

/**
 * Worker de MSW para el navegador
 * Intercepta las peticiones HTTP en desarrollo
 */
export const worker = setupWorker(...handlers)

// Exponer globalmente para control desde la consola (solo en desarrollo)
if (import.meta.env.DEV) {
    // @ts-expect-error - Agregando propiedad global para debugging
    window.msw = { worker }
}
