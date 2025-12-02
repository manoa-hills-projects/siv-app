import { Badge, TrendingUp, Loader2 } from "lucide-react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useDashboardStats } from "../hooks/use-dashboard"

/**
 * Página de Dashboard con datos de TanStack Query + MSW
 */
export const DashboardPage = () => {
  // Usar los hooks de React Query
  const { data: stats, isLoading, isError, error } = useDashboardStats()

  // Estado de carga
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Cargando dashboard...</span>
      </div>
    )
  }

  // Estado de error
  if (isError) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-500">Error al cargar el dashboard</p>
          <p className="text-sm text-gray-500">{error?.message}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Total Users */}
        <Card>
          <CardHeader>
            <CardDescription>Total  </CardDescription>
            <CardTitle>{stats?.totalFamilies.toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </>
  )
}
