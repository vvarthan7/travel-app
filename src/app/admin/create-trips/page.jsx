"use client";

import { AdminLayout } from "@/components/admin-layout";
import CreateTrip from "@/components/create-trip";

export default function CreateTrips() {
  return (
    <AdminLayout
      title="Create Trip"
      description="Filter, sort, and access detailed user profiles"
      ctaLabel="Add new user"
    >
      <CreateTrip />
    </AdminLayout>
  );
}
