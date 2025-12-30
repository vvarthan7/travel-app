"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import AdminHeader from "./admin-header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function AdminLayout({ title, description, user, ctaLabel, children }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        experimental_prefetchInRender: true,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <AdminHeader
            title={title}
            description={description}
            ctaLabel={ctaLabel}
          />
          <section className="px-4 mt-10">{children}</section>
        </SidebarInset>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
