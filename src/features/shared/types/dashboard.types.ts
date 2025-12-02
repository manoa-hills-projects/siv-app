/**
 * Tipos TypeScript para el Dashboard
 */

export interface DashboardStats {
    totalUsers: number
    activeUsers: number
    totalRevenue: number
    newOrders: number
    growthRate: number
}

export interface ChartDataPoint {
    date: string
    value: number
}

export interface ChartData {
    period: string
    data: ChartDataPoint[]
}

export interface Activity {
    id: number
    type: string
    description: string
    timestamp: string
}
