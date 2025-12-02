# MSW (Mock Service Worker) - Guía de Uso

## 🎯 ¿Qué es esto?

Este directorio contiene la configuración de **MSW** para mockear APIs durante el desarrollo.

## � Estructura de Archivos

```
src/mocks/
├── browser.ts              # Configuración del worker de MSW
├── handlers.ts             # Combina todos los handlers
├── handlers/               # Handlers organizados por módulo
│   ├── auth.handlers.ts    # Autenticación (login, logout, etc.)
│   ├── users.handlers.ts   # Usuarios (CRUD)
│   └── dashboard.handlers.ts # Dashboard (estadísticas, gráficos)
└── README.md              # Esta guía
```

## �🚀 Activar/Desactivar Mocks

### Opción 1: Variable de Entorno (Recomendado)

Edita el archivo `.env` en la raíz del proyecto:

```bash
# Para usar MOCKS
VITE_ENABLE_MOCKING=true

# Para usar la API REAL
VITE_ENABLE_MOCKING=false
```

**Recarga el navegador** después de cambiar esta variable.

### Opción 2: Desde la Consola del Navegador

Abre la consola del navegador (F12) y ejecuta:

```javascript
// Detener mocks (usar API real)
window.msw.worker.stop()

// Reiniciar mocks
window.msw.worker.start()
```

## 📝 Agregar Nuevos Mocks

### Crear un Nuevo Módulo

1. **Crea un archivo** en `src/mocks/handlers/`:

```typescript
// src/mocks/handlers/productos.handlers.ts
import { http, HttpResponse, delay } from 'msw'

export const productosHandlers = [
  http.get('/api/productos', async () => {
    await delay(300)
    return HttpResponse.json([
      { id: 1, nombre: 'Producto 1', precio: 100 },
      { id: 2, nombre: 'Producto 2', precio: 200 },
    ])
  }),

  http.post('/api/productos', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({
      id: 3,
      ...body,
    }, { status: 201 })
  }),
]
```

2. **Importa y agrega** en `src/mocks/handlers.ts`:

```typescript
import { productosHandlers } from './handlers/productos.handlers'

export const handlers = [
  ...authHandlers,
  ...usersHandlers,
  ...dashboardHandlers,
  ...productosHandlers, // ⬅️ Agregar aquí
]
```

### Editar Mocks Existentes

Edita el archivo correspondiente en `src/mocks/handlers/`:

- **Autenticación**: `auth.handlers.ts`
- **Usuarios**: `users.handlers.ts`
- **Dashboard**: `dashboard.handlers.ts`

## 📚 Ejemplos de Handlers

```typescript
// GET con parámetros de ruta
http.get('/api/posts/:id', ({ params }) => {
  return HttpResponse.json({
    id: params.id,
    title: 'Post Mockeado',
  })
}),

// POST con body
http.post('/api/posts', async ({ request }) => {
  const body = await request.json()
  return HttpResponse.json({
    id: 1,
    ...body,
  }, { status: 201 })
}),

// Query params
http.get('/api/search', ({ request }) => {
  const url = new URL(request.url)
  const query = url.searchParams.get('q')
  return HttpResponse.json({ results: [] })
}),

// Con delay (simular latencia)
http.get('/api/slow', async () => {
  await delay(2000) // 2 segundos
  return HttpResponse.json({ data: 'respuesta lenta' })
}),

// Simular error
http.get('/api/error', () => {
  return HttpResponse.json(
    { message: 'Error del servidor' },
    { status: 500 }
  )
}),
```

## 🔍 Verificar que Funciona

Cuando MSW está activo, verás en la consola del navegador:

```
[MSW] Mocking enabled.
```

## 📚 Documentación Oficial

- [MSW Docs](https://mswjs.io/)
- [Ejemplos](https://mswjs.io/docs/recipes)
