/**
 * Hook para manejar errores de forma consistente
 */

import { useCallback } from 'react'
import type { ApiError } from '@/lib/errors'
import { errorLogger } from '@/lib/logger/error-logger'
import { useNotification } from './use-notification'

export interface ErrorHandlerOptions {
    showNotification?: boolean
    logError?: boolean
    customMessage?: string
    onError?: (error: ApiError | Error) => void
}

export function useErrorHandler() {
    const notification = useNotification()

    const handleError = useCallback(
        (error: ApiError | Error | unknown, options: ErrorHandlerOptions = {}) => {
            const {
                showNotification = true,
                logError = true,
                customMessage,
                onError,
            } = options

            // Asegurar que es un Error
            const err = error instanceof Error ? error : new Error(String(error))

            // Loguear el error
            if (logError) {
                errorLogger.error('Error handled', err)
            }

            // Mostrar notificación
            if (showNotification) {
                notification.error(customMessage || err)
            }

            // Callback personalizado
            onError?.(err)
        },
        [notification]
    )

    return {
        handleError,
    }
}
