/**
 * Hooks de TanStack Query para el Dashboard
 */

import { useQuery } from '@tanstack/react-query'
import { getDashboardStats, getChartData, getRecentActivity } from '../services/dashboard.service'

/**
 * Hook para obtener estadísticas del dashboard
 */
export function useDashboardStats() {
    return useQuery({
        queryKey: ['dashboard', 'stats'],
        queryFn: getDashboardStats,
        // Refetch cada 30 segundos
        refetchInterval: 30000,
    })
}

/**
 * Hook para obtener datos del gráfico
 */
export function useChartData(period: string = 'week') {
    return useQuery({
        queryKey: ['dashboard', 'chart-data', period],
        queryFn: () => getChartData(period),
        // Solo refetch manual
        refetchInterval: false,
    })
}

/**
 * Hook para obtener actividad reciente
 */
export function useRecentActivity() {
    return useQuery({
        queryKey: ['dashboard', 'recent-activity'],
        queryFn: getRecentActivity,
        // Refetch cada minuto
        refetchInterval: 60000,
    })
}
