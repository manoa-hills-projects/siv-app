import { http, HttpResponse, delay } from 'msw'

/**
 * Handlers para el módulo de autenticación
 */
export const authHandlers = [
    // POST /api/auth/login
    http.post('/api/auth/login', async ({ request }) => {
        await delay(500) // Simular latencia
        const body = await request.json() as { email: string; password: string }

        // Simular validación
        if (body.email && body.password) {
            return HttpResponse.json({
                success: true,
                token: 'mock-jwt-token-12345',
                user: {
                    id: 1,
                    email: body.email,
                    name: 'Usuario Mock',
                    role: 'admin',
                },
            })
        }

        return HttpResponse.json(
            { success: false, message: 'Credenciales inválidas' },
            { status: 401 }
        )
    }),

    // POST /api/auth/logout
    http.post('/api/auth/logout', async () => {
        await delay(200)
        return HttpResponse.json({ success: true, message: 'Sesión cerrada' })
    }),

    // GET /api/auth/me
    http.get('/api/auth/me', async () => {
        await delay(300)
        return HttpResponse.json({
            id: 1,
            email: 'usuario@example.com',
            name: 'Usuario Mock',
            role: 'admin',
        })
    }),

    // POST /api/auth/refresh
    http.post('/api/auth/refresh', async () => {
        await delay(200)
        return HttpResponse.json({
            token: 'new-mock-jwt-token-67890',
        })
    }),
]
