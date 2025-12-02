/**
 * Handlers principales de MSW
 *
 * Importa y combina todos los handlers organizados por módulo/feature
 */

// Importar handlers por módulo
import { authHandlers } from './handlers/auth.handlers'
import { usersHandlers } from './handlers/users.handlers'
import { dashboardHandlers } from './handlers/dashboard.handlers'

/**
 * Combina todos los handlers de los diferentes módulos
 *
 * Para agregar un nuevo módulo:
 * 1. Crea un archivo en ./handlers/tu-modulo.handlers.ts
 * 2. Exporta un array con el nombre tuModuloHandlers
 * 3. Impórtalo aquí y agrégalo al array handlers
 */
export const handlers = [
  ...authHandlers,
  ...usersHandlers,
  ...dashboardHandlers,
  // Agrega más módulos aquí...
]
