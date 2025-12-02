import ky from 'ky'
import { parseHttpError } from './errors/error-handler'

/**
 * Instancia base de Ky con configuración predeterminada
 * Maneja automáticamente la transformación de errores
 */
export const apiClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  retry: {
    limit: 2,
    methods: ['get', 'put', 'head', 'delete', 'options', 'trace'],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  hooks: {
    beforeError: [
      async (error) => {
        const { response } = error

        if (response) {
          const apiError = await parseHttpError(
            response,
            response.url,
            error.request.method
          )

          throw apiError
        }
        return error
      },
    ],
  },
})
