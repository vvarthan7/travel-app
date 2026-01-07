import { AdminLayout } from "@/components/admin-layout";
import TripDetail from "@/components/trip-detail";

const TripDetails = () => {
  return (
    <AdminLayout
      title="Trip Details"
      description="View and edit AI-generated travel plans"
      ctaLabel="Edit Trip"
    >
      <TripDetail />
    </AdminLayout>
  );
};
export default TripDetails;
