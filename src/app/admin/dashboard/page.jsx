import { AdminLayout } from "@/components/admin-layout";

/**
 * Render the admin dashboard layout with a responsive three-panel grid.
 *
 * Renders an AdminLayout titled "Dashboard" containing a responsive grid of three equal-aspect placeholder panels.
 * @returns {JSX.Element} The dashboard React element.
 */
export default function Dashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
    </AdminLayout>
  );
}