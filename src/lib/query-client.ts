import { QueryClient } from '@tanstack/react-query'

/**
 * Configuración del QueryClient de TanStack Query
 */
export const queryClient = new QueryClient({
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
