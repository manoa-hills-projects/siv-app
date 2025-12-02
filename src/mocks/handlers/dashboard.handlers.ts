import { http, HttpResponse, delay } from 'msw'

/**
 * Handlers para el módulo de dashboard
 */
export const dashboardHandlers = [
    // GET /api/dashboard/stats - Estadísticas del dashboard
    http.get('/api/dashboard/stats', async () => {
        await delay(400)

        return HttpResponse.json({
            totalUsers: 1245,
            activeUsers: 823,
            totalRevenue: 45230.50,
            newOrders: 156,
            growthRate: 12.5,
        })
    }),

    // GET /api/dashboard/chart-data - Datos para gráficos
    http.get('/api/dashboard/chart-data', async ({ request }) => {
        await delay(350)

        const url = new URL(request.url)
        const period = url.searchParams.get('period') || 'week'

        // Generar datos mock según el período
        const data = Array.from({ length: 7 }, (_, i) => ({
            date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            value: Math.floor(Math.random() * 1000) + 500,
        }))

        return HttpResponse.json({
            period,
            data,
        })
    }),

    // GET /api/dashboard/recent-activity - Actividad reciente
    http.get('/api/dashboard/recent-activity', async () => {
        await delay(300)

        return HttpResponse.json([
            {
                id: 1,
                type: 'user_registration',
                description: 'Nuevo usuario registrado',
                timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // Hace 5 min
            },
            {
                id: 2,
                type: 'order_completed',
                description: 'Pedido #1234 completado',
                timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // Hace 15 min
            },
            {
                id: 3,
                type: 'payment_received',
                description: 'Pago recibido: $150.00',
                timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // Hace 30 min
            },
        ])
    }),
]
