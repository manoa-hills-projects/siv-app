import { QueryClient, MutationCache, QueryCache } from '@tanstack/react-query'
import { errorLogger } from './logger/error-logger'
import { toast } from 'sonner'
import { getUserFriendlyMessage } from './errors/error-handler'

/**
 * Manejador global de errores para React Query
 */
const handleGlobalError = (error: Error) => {
  // Loguear error
  errorLogger.error('Global Query Error', error)

  // Mostrar notificación
  toast.error(getUserFriendlyMessage(error))
}

/**
 * Configuración del QueryClient de TanStack Query
 */
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleGlobalError,
  }),
  mutationCache: new MutationCache({
    onError: handleGlobalError,
  }),
  defaultOptions: {
    queries: {
      // Tiempo de stale (datos considerados "antiguos")
      staleTime: 1000 * 60 * 5, // 5 minutos

      // Tiempo de caché
      gcTime: 1000 * 60 * 10, // 10 minutos (antes era cacheTime)

      // Reintentos en caso de error
      retry: 1,

      // Refetch cuando la ventana obtiene foco
      refetchOnWindowFocus: false,

      // Refetch cuando se reconecta la red
      refetchOnReconnect: true,
    },
    mutations: {
      // Reintentos para mutaciones
      retry: 0,
    },
  },
})
