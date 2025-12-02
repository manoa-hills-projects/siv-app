/**
 * Hook para manejar notificaciones
 */

import { toast } from 'sonner'
import type { ApiError } from '@/lib/errors'
import { getUserFriendlyMessage } from '@/lib/errors'

export interface NotificationOptions {
    duration?: number
    description?: string
    action?: {
        label: string
        onClick: () => void
    }
}

export function useNotification() {
    const success = (message: string, options?: NotificationOptions) => {
        toast.success(message, {
            duration: options?.duration,
            description: options?.description,
            action: options?.action,
        })
    }

    const error = (errorOrMessage: ApiError | Error | string, options?: NotificationOptions) => {
        const message =
            typeof errorOrMessage === 'string'
                ? errorOrMessage
                : getUserFriendlyMessage(errorOrMessage)

        toast.error(message, {
            duration: options?.duration || 5000,
            description: options?.description,
            action: options?.action,
        })
    }

    const warning = (message: string, options?: NotificationOptions) => {
        toast.warning(message, {
            duration: options?.duration,
            description: options?.description,
            action: options?.action,
        })
    }

    const info = (message: string, options?: NotificationOptions) => {
        toast.info(message, {
            duration: options?.duration,
            description: options?.description,
            action: options?.action,
        })
    }

    const loading = (message: string) => {
        return toast.loading(message)
    }

    const dismiss = (toastId?: string | number) => {
        toast.dismiss(toastId)
    }

    const promise = <T,>(
        promise: Promise<T>,
        messages: {
            loading: string
            success: string | ((data: T) => string)
            error: string | ((error: unknown) => string)
        }
    ) => {
        return toast.promise(promise, messages)
    }

    return {
        success,
        error,
        warning,
        info,
        loading,
        dismiss,
        promise,
    }
}
