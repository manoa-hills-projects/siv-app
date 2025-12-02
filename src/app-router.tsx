import { BrowserRouter, Route, Routes } from "react-router"
import { AppLayout } from "@shared/layout/app-layout"
import { DashboardPage } from "./features/shared/pages/dashboard-page"

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />} >
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
