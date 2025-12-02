/**
 * Custom Error Classes para manejo profesional de errores
 */

export interface ErrorMetadata {
  timestamp: Date
  url?: string
  method?: string
  statusCode?: number
  endpoint?: string
  [key: string]: unknown
}

/**
 * Base class para errores de API
 */
export class ApiError extends Error {
  public readonly statusCode: number
  public readonly metadata: ErrorMetadata
  public readonly isOperational: boolean

  constructor(
    message: string,
    statusCode: number = 500,
    metadata: Partial<ErrorMetadata> = {},
    isOperational: boolean = true
  ) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
    this.isOperational = isOperational
    this.metadata = {
      timestamp: new Date(),
      statusCode,
      ...metadata,
    }

    // Mantiene el stack trace correcto (V8 specific)
    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, this.constructor)
    }
  }
}

/**
 * Error de red (sin conexión, timeout, etc.)
 */
export class NetworkError extends ApiError {
  constructor(message: string = 'Error de conexión a la red', metadata?: Partial<ErrorMetadata>) {
    super(message, 0, metadata)
    this.name = 'NetworkError'
  }
}

/**
 * Error de validación (400)
 */
export class ValidationError extends ApiError {
  public readonly errors: Record<string, string[]>

  constructor(
    message: string = 'Error de validación',
    errors: Record<string, string[]> = {},
    metadata?: Partial<ErrorMetadata>
  ) {
    super(message, 400, metadata)
    this.name = 'ValidationError'
    this.errors = errors
  }
}

/**
 * Error de autenticación (401)
 */
export class AuthenticationError extends ApiError {
  constructor(message: string = 'No autenticado', metadata?: Partial<ErrorMetadata>) {
    super(message, 401, metadata)
    this.name = 'AuthenticationError'
  }
}

/**
 * Error de autorización (403)
 */
export class AuthorizationError extends ApiError {
  constructor(message: string = 'No autorizado', metadata?: Partial<ErrorMetadata>) {
    super(message, 403, metadata)
    this.name = 'AuthorizationError'
  }
}

/**
 * Recurso no encontrado (404)
 */
export class NotFoundError extends ApiError {
  constructor(message: string = 'Recurso no encontrado', metadata?: Partial<ErrorMetadata>) {
    super(message, 404, metadata)
    this.name = 'NotFoundError'
  }
}

/**
 * Error del servidor (500+)
 */
export class ServerError extends ApiError {
  constructor(
    message: string = 'Error interno del servidor',
    statusCode: number = 500,
    metadata?: Partial<ErrorMetadata>
  ) {
    super(message, statusCode, metadata)
    this.name = 'ServerError'
  }
}

/**
 * Timeout error
 */
export class TimeoutError extends ApiError {
  constructor(message: string = 'Tiempo de espera agotado', metadata?: Partial<ErrorMetadata>) {
    super(message, 408, metadata)
    this.name = 'TimeoutError'
  }
}
