import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";

/**
 * Provides an admin layout with a sidebar, header showing the given title, and a main content area.
 *
 * @param {Object} props
 * @param {string} props.title - The title text displayed in the header.
 * @param {import('react').ReactNode} props.children - Content rendered inside the layout's main area.
 * @returns {JSX.Element} The rendered admin layout element.
 */
export function AdminLayout({ title, children }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-lg font-semibold">{title}</h1>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}