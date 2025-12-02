import { http, HttpResponse, delay } from 'msw'

/**
 * Handlers para el módulo de usuarios
 */
export const usersHandlers = [
    // GET /api/users - Listar usuarios
    http.get('/api/users', async ({ request }) => {
        await delay(300)

        const url = new URL(request.url)
        const page = url.searchParams.get('page') || '1'
        const limit = url.searchParams.get('limit') || '10'

        return HttpResponse.json({
            data: [
                { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'admin' },
                { id: 2, name: 'María García', email: 'maria@example.com', role: 'user' },
                { id: 3, name: 'Carlos López', email: 'carlos@example.com', role: 'user' },
            ],
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: 50,
            },
        })
    }),

    // GET /api/users/:id - Obtener usuario por ID
    http.get('/api/users/:id', async ({ params }) => {
        await delay(200)
        const { id } = params

        return HttpResponse.json({
            id,
            name: `Usuario ${id}`,
            email: `usuario${id}@example.com`,
            role: 'user',
            createdAt: new Date().toISOString(),
        })
    }),

    // POST /api/users - Crear usuario
    http.post('/api/users', async ({ request }) => {
        await delay(400)
        const body = await request.json() as Record<string, unknown>

        return HttpResponse.json(
            {
                id: Math.floor(Math.random() * 1000),
                ...body,
                createdAt: new Date().toISOString(),
            },
            { status: 201 }
        )
    }),

    // PUT /api/users/:id - Actualizar usuario
    http.put('/api/users/:id', async ({ params, request }) => {
        await delay(300)
        const { id } = params
        const body = await request.json() as Record<string, unknown>

        return HttpResponse.json({
            id,
            ...body,
            updatedAt: new Date().toISOString(),
        })
    }),

    // DELETE /api/users/:id - Eliminar usuario
    http.delete('/api/users/:id', async ({ params }) => {
        await delay(250)
        const { id } = params

        return HttpResponse.json({
            success: true,
            message: `Usuario ${id} eliminado`,
        })
    }),
]
