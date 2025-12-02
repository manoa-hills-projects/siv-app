import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router"
import { AppBreadcrumb } from "../components/breadcrumb/app-breadcrumb"
import { AppSidebar } from "../components/app-sidebar/app-sidebar"

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppBreadcrumb />
        <main className="flex flex-1 flex-col gap-12 p-4 pt-0">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
