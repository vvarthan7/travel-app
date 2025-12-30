"use client";
import { AdminLayout } from "@/components/admin-layout";
import Userslist from "@/components/users-list";

export default function Users() {
  return (
    <AdminLayout
      title="Manage Users"
      description="Filter, sort, and access detailed user profiles"
      ctaLabel="Add new user"
    >
      <Userslist />
    </AdminLayout>
  );
}
