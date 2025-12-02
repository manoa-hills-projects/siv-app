/**
 * Error Handler - Transformación y normalización de errores
 */

import {
    ApiError,
    NetworkError,
    ValidationError,
    AuthenticationError,
    AuthorizationError,
    NotFoundError,
    ServerError,
    TimeoutError,
    type ErrorMetadata,
} from './api-error'

/**
 * Parsea un error de respuesta HTTP y lo convierte en un ApiError apropiado
 */
export async function parseHttpError(
    response: Response,
    endpoint?: string,
    method?: string
): Promise<ApiError> {
    const metadata: Partial<ErrorMetadata> = {
        statusCode: response.status,
        url: response.url,
        endpoint,
        method,
    }

    let errorMessage = response.statusText || 'Error en la solicitud'
    let errorData: unknown = null

    // Intentar parsear el body del error
    try {
        const contentType = response.headers.get('content-type')
        if (contentType?.includes('application/json')) {
            errorData = await response.json()
            errorMessage = (errorData as { message?: string })?.message || errorMessage
        } else {
            errorMessage = await response.text()
        }
    } catch {
        // Si falla el parseo, usar el mensaje por defecto
    }

    metadata.responseData = errorData

    // Crear el error apropiado según el status code
    switch (response.status) {
        case 400:
            return new ValidationError(
                errorMessage,
                (errorData as { errors?: Record<string, string[]> })?.errors || {},
                metadata
            )
        case 401:
            return new AuthenticationError(errorMessage, metadata)
        case 403:
            return new AuthorizationError(errorMessage, metadata)
        case 404:
            return new NotFoundError(errorMessage, metadata)
        case 408:
            return new TimeoutError(errorMessage, metadata)
        case 500:
        case 502:
        case 503:
        case 504:
            return new ServerError(errorMessage, response.status, metadata)
        default:
            return new ApiError(errorMessage, response.status, metadata)
    }
}

/**
 * Maneja errores de fetch (network errors)
 */
export function handleFetchError(error: Error, endpoint?: string, method?: string): ApiError {
    const metadata: Partial<ErrorMetadata> = {
        endpoint,
        method,
        originalError: error.message,
    }

    // Timeout error
    if (error.name === 'AbortError') {
        return new TimeoutError('La solicitud tardó demasiado tiempo', metadata)
    }

    // Network error
    if (error.message.includes('fetch') || error.message.includes('network')) {
        return new NetworkError('Error de conexión. Verifica tu internet.', metadata)
    }

    // Error genérico
    return new ApiError(error.message, 500, metadata)
}

/**
 * Determina si un error es recuperable
 */
export function isRecoverableError(error: unknown): boolean {
    if (error instanceof ApiError) {
        // Network errors y timeouts son recuperables
        if (error instanceof NetworkError || error instanceof TimeoutError) {
            return true
        }

        // 5xx server errors pueden ser recuperables
        if (error.statusCode >= 500 && error.statusCode < 600) {
            return true
        }

        // 429 (rate limit) es recuperable
        if (error.statusCode === 429) {
            return true
        }
    }

    return false
}

/**
 * Obtiene un mensaje user-friendly del error
 */
export function getUserFriendlyMessage(error: unknown): string {
    if (error instanceof ValidationError) {
        return 'Por favor verifica los datos ingresados'
    }

    if (error instanceof AuthenticationError) {
        return 'Debes iniciar sesión para continuar'
    }

    if (error instanceof AuthorizationError) {
        return 'No tienes permisos para realizar esta acción'
    }

    if (error instanceof NotFoundError) {
        return 'El recurso solicitado no fue encontrado'
    }

    if (error instanceof NetworkError) {
        return 'Error de conexión. Verifica tu internet.'
    }

    if (error instanceof TimeoutError) {
        return 'La solicitud tardó demasiado. Intenta de nuevo.'
    }

    if (error instanceof ServerError) {
        return 'Error en el servidor. Intenta más tarde.'
    }

    if (error instanceof ApiError) {
        return error.message
    }

    return 'Ocurrió un error inesperado'
}
