/**
 * API Service para el Dashboard
 * Estos endpoints serán interceptados por MSW cuando VITE_ENABLE_MOCKING=true
 */

import type { DashboardStats, ChartData, Activity } from '../types/dashboard.types'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

/**
 * Obtener estadísticas del dashboard
 */
export async function getDashboardStats(): Promise<DashboardStats> {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`)

    if (!response.ok) {
        throw new Error('Error al obtener estadísticas del dashboard')
    }

    return response.json()
}

/**
 * Obtener datos para gráficos
 */
export async function getChartData(period: string = 'week'): Promise<ChartData> {
    const response = await fetch(`${API_BASE_URL}/dashboard/chart-data?period=${period}`)

    if (!response.ok) {
        throw new Error('Error al obtener datos del gráfico')
    }

    return response.json()
}

/**
 * Obtener actividad reciente
 */
export async function getRecentActivity(): Promise<Activity[]> {
    const response = await fetch(`${API_BASE_URL}/dashboard/recent-activity`)

    if (!response.ok) {
        throw new Error('Error al obtener actividad reciente')
    }

    return response.json()
}
