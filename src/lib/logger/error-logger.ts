/**
 * Error Logger Service
 * Centraliza el logging de errores con soporte para diferentes ambientes
 */

import type { ApiError } from '../errors'

export interface LogEntry {
  level: 'error' | 'warn' | 'info' | 'debug'
  message: string
  error?: Error | ApiError
  metadata?: Record<string, unknown>
  timestamp: Date
}

class ErrorLogger {
  private isDevelopment = import.meta.env.DEV

  /**
   * Log de error
   */
  error(message: string, error?: Error | ApiError, metadata?: Record<string, unknown>): void {
    const entry: LogEntry = {
      level: 'error',
      message,
      error,
      metadata,
      timestamp: new Date(),
    }

    this.log(entry)

    // En producción, enviar a servicio externo (Sentry, LogRocket, etc.)
    if (!this.isDevelopment) {
      this.sendToExternalService(entry)
    }
  }

  /**
   * Log de warning
   */
  warn(message: string, metadata?: Record<string, unknown>): void {
    const entry: LogEntry = {
      level: 'warn',
      message,
      metadata,
      timestamp: new Date(),
    }

    this.log(entry)
  }

  /**
   * Log de info
   */
  info(message: string, metadata?: Record<string, unknown>): void {
    const entry: LogEntry = {
      level: 'info',
      message,
      metadata,
      timestamp: new Date(),
    }

    this.log(entry)
  }

  /**
   * Log interno
   */
  private log(entry: LogEntry): void {
    if (this.isDevelopment) {
      const timestamp = entry.timestamp.toISOString()
      const prefix = `[${timestamp}] [${entry.level.toUpperCase()}]`

      switch (entry.level) {
        case 'error':
          console.error(prefix, entry.message, {
            error: entry.error,
            metadata: entry.metadata,
          })
          break
        case 'warn':
          console.warn(prefix, entry.message, entry.metadata)
          break
        case 'info':
          console.info(prefix, entry.message, entry.metadata)
          break
        case 'debug':
          console.debug(prefix, entry.message, entry.metadata)
          break
      }
    }
  }

  /**
   * Enviar a servicio externo (Sentry, LogRocket, etc.)
   */
  private sendToExternalService(entry: LogEntry): void {
    // TODO: Integrar con Sentry, LogRocket, DataDog, etc.
    // Ejemplo con Sentry:
    // if (window.Sentry) {
    //   window.Sentry.captureException(entry.error, {
    //     extra: entry.metadata,
    //     tags: {
    //       level: entry.level,
    //     },
    //   })
    // }

    // Por ahora solo logueamos que se enviaría
    console.log('📤 Would send to external service:', entry)
  }
}

// Singleton
export const errorLogger = new ErrorLogger()
