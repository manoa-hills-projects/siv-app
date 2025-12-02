import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppRouter } from './app-router'
import { queryClient } from './lib/query-client'

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      {/* Devtools solo en desarrollo */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
