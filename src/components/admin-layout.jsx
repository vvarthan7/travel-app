"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import AdminHeader from "./admin-header";

export function AdminLayout({ title, description, user, ctaLabel, children }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <AdminHeader
          title={title}
          description={description}
          ctaLabel={ctaLabel}
        />
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
