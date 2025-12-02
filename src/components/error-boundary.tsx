/**
 * Error Boundary Component
 * Captura errores de React que no fueron manejados
 */

import { Component, type ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { errorLogger } from '@/lib/logger/error-logger'

interface Props {
    children: ReactNode
    fallback?: ReactNode
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            hasError: false,
            error: null,
        }
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        // Log del error
        errorLogger.error('React Error Boundary caught an error', error, {
            componentStack: errorInfo.componentStack,
        })

        // Callback opcional
        this.props.onError?.(error, errorInfo)
    }

    handleReset = (): void => {
        this.setState({
            hasError: false,
            error: null,
        })
    }

    render(): ReactNode {
        if (this.state.hasError) {
            // Usar fallback personalizado si se provee
            if (this.props.fallback) {
                return this.props.fallback
            }

            // Fallback por defecto
            return (
                <div className="flex items-center justify-center min-h-screen p-4">
                    <Card className="max-w-lg w-full">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <AlertCircle className="w-6 h-6 text-red-500" />
                                <CardTitle>Algo salió mal</CardTitle>
                            </div>
                            <CardDescription>
                                Ocurrió un error inesperado en la aplicación
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {import.meta.env.DEV && this.state.error && (
                                <div className="bg-gray-100 p-4 rounded-md overflow-auto">
                                    <p className="text-sm font-mono text-red-600">
                                        {this.state.error.message}
                                    </p>
                                    {this.state.error.stack && (
                                        <pre className="text-xs mt-2 text-gray-600 whitespace-pre-wrap">
                                            {this.state.error.stack}
                                        </pre>
                                    )}
                                </div>
                            )}
                            <div className="flex gap-2">
                                <Button onClick={this.handleReset} variant="default">
                                    Reintentar
                                </Button>
                                <Button onClick={() => window.location.reload()} variant="outline">
                                    Recargar página
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )
        }

        return this.props.children
    }
}
