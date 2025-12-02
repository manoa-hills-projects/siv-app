import { http, HttpResponse, delay } from 'msw'

export const dashboardHandlers = [
  http.get('/api/dashboard/stats', async () => {
    await delay(400)

    return HttpResponse.json({
      totalPersons: 100,
      totalFamilies: 823,
      pendingProcedures: 15,
    })
  }),
]
