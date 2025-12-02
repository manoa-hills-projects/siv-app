import { apiClient } from '@/lib/api-client'
import type { DashboardStats } from '../types/dashboard.types'

export async function getDashboardStats(): Promise<DashboardStats> {
  return apiClient.get('dashboard/stats').json()
}
