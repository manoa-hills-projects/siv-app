# TanStack Query + MSW - Guía de Uso

## 🎯 ¿Qué tienes configurado?

- **TanStack Query (React Query)** - Manejo de estado del servidor
- **MSW** - Mock de APIs
- **Integración completa** - Los hooks de React Query consumen los mocks de MSW

## 📁 Estructura

```
src/
├── lib/
│   └── query-client.ts              # Configuración del QueryClient
├── features/
│   └── shared/
│       ├── types/
│       │   └── dashboard.types.ts   # TypeScript types
│       ├── services/
│       │   └── dashboard.service.ts # Funciones fetch (API layer)
│       ├── hooks/
│       │   └── use-dashboard.ts     # Hooks de React Query
│       └── pages/
│           ├── dashboard-page.tsx   # Tu página original
│           └── dashboard-page-with-query.tsx # Ejemplo con React Query
└── mocks/
    └── handlers/
        └── dashboard.handlers.ts    # Mocks de MSW
```

## 🚀 Cómo Usar

### 1. En tu componente, importa el hook:

```tsx
import { useDashboardStats } from '../hooks/use-dashboard'

export const MiComponente = () => {
  const { data, isLoading, isError, error } = useDashboardStats()

  if (isLoading) return <div>Cargando...</div>
  if (isError) return <div>Error: {error.message}</div>

  return <div>{data.totalUsers}</div>
}
```

### 2. Hooks Disponibles

#### `useDashboardStats()`
Obtiene estadísticas generales del dashboard.

```tsx
const { data, isLoading, isError, error, refetch } = useDashboardStats()

// data contiene:
// {
//   totalUsers: number
//   activeUsers: number
//   totalRevenue: number
//   newOrders: number
//   growthRate: number
// }
```

#### `useChartData(period)`
Obtiene datos para gráficos.

```tsx
const { data } = useChartData('week')

// data contiene:
// {
//   period: string
//   data: Array<{ date: string, value: number }>
// }
```

#### `useRecentActivity()`
Obtiene actividad reciente.

```tsx
const { data } = useRecentActivity()

// data es un array de actividades:
// [{
//   id: number
//   type: string
//   description: string
//   timestamp: string
// }]
```

## 🎨 Ejemplo Completo

```tsx
import { useDashboardStats, useRecentActivity } from '@/features/shared/hooks/use-dashboard'

export const Dashboard = () => {
  const stats = useDashboardStats()
  const activity = useRecentActivity()

  if (stats.isLoading || activity.isLoading) {
    return <div>Cargando...</div>
  }

  return (
    <div>
      <h1>Total Users: {stats.data.totalUsers}</h1>

      <ul>
        {activity.data?.map(item => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ul>
    </div>
  )
}
```

## 🔄 Características de React Query

### Auto-refetch
Los datos se recargan automáticamente:
- `useDashboardStats()` - cada 30 segundos
- `useRecentActivity()` - cada 60 segundos

### Refetch Manual

```tsx
const { data, refetch } = useDashboardStats()

<button onClick={() => refetch()}>Actualizar</button>
```

### Estados Avanzados

```tsx
const {
  data,           // Datos obtenidos
  isLoading,      // Primera carga
  isFetching,     // Cargando datos (incluye refetch)
  isError,        // Hubo un error
  error,          // Objeto del error
  refetch,        // Función para refetch manual
  isSuccess,      // Datos cargados exitosamente
} = useDashboardStats()
```

## 🔧 Crear Nuevos Hooks

### 1. Define el tipo (opcional)

```typescript
// src/features/shared/types/user.types.ts
export interface User {
  id: number
  name: string
  email: string
}
```

### 2. Crea el servicio

```typescript
// src/features/shared/services/user.service.ts
export async function getUsers(): Promise<User[]> {
  const response = await fetch('/api/users')
  if (!response.ok) throw new Error('Error al obtener usuarios')
  return response.json()
}
```

### 3. Crea el hook

```typescript
// src/features/shared/hooks/use-users.ts
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../services/user.service'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })
}
```

### 4. Usa el hook

```tsx
import { useUsers } from '../hooks/use-users'

const { data: users } = useUsers()
```

## 🧪 Mutaciones (POST, PUT, DELETE)

Para crear, actualizar o eliminar datos:

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newUser) => {
      return fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
      })
    },
    // Invalidar cache después de crear
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

// Uso:
const createUser = useCreateUser()

<button onClick={() => createUser.mutate({ name: 'Juan' })}>
  Crear Usuario
</button>
```

## 🔍 React Query Devtools

Las devtools están habilitadas en desarrollo. Presiona el ícono de React Query en la esquina inferior de tu navegador para:
- Ver todas las queries
- Inspeccionar datos en caché
- Forzar refetch
- Ver estado de mutaciones

## 🌐 Cambiar entre Mocks y API Real

### Con Mocks (MSW activo):
```bash
# .env
VITE_ENABLE_MOCKING=true
```

### Con API Real:
```bash
# .env
VITE_ENABLE_MOCKING=false
VITE_API_URL=https://tu-api-real.com
```

## 📚 Recursos

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [MSW + React Query](https://mswjs.io/docs/recipes/query-client)
