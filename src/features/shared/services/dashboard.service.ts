import { apiClient } from '@/lib/api-client'
import type { DashboardStats } from '../types/dashboard.types'

export const getDashboardStats = (): Promise<DashboardStats> => {
  return apiClient.get('dashboard/stats').json()
}
