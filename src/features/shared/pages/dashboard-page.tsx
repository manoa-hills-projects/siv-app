import { Badge, TrendingDown, TrendingUp, Loader2 } from "lucide-react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useDashboardStats, useRecentActivity } from "../hooks/use-dashboard"

/**
 * Página de Dashboard con datos de TanStack Query + MSW
 */
export const DashboardPage = () => {
  // Usar los hooks de React Query
  const { data: stats, isLoading, isError, error } = useDashboardStats()
  const { data: activity } = useRecentActivity()

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
            <CardDescription>Total Users</CardDescription>
            <CardTitle>{stats?.totalUsers.toLocaleString()}</CardTitle>
            <CardAction>
              <Badge>
                <TrendingUp />
                +{stats?.growthRate}%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter>
            <div>
              Up {stats?.growthRate}% this period <TrendingUp />
            </div>
            <div>Great user growth!</div>
          </CardFooter>
        </Card>

        {/* Active Users */}
        <Card>
          <CardHeader>
            <CardDescription>Active Users</CardDescription>
            <CardTitle>{stats?.activeUsers.toLocaleString()}</CardTitle>
            <CardAction>
              <Badge>
                <TrendingUp />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter>
            <div>
              Strong user retention <TrendingUp />
            </div>
            <div>Engagement exceed targets</div>
          </CardFooter>
        </Card>

        {/* Total Revenue */}
        <Card>
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle>${stats?.totalRevenue.toLocaleString()}</CardTitle>
            <CardAction>
              <Badge>
                <TrendingUp />
                +{stats?.growthRate}%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter>
            <div>
              Steady revenue increase <TrendingUp />
            </div>
            <div>Meets revenue projections</div>
          </CardFooter>
        </Card>
      </div>

      {/* Actividad reciente */}
      {activity && activity.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activity.map((item) => (
                <div key={item.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className="flex-1">
                    <p className="font-medium">{item.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <Badge>{item.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
