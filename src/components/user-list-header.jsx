export const UserListHeaderComponent = () => (
  <div className="hidden lg:grid lg:grid-cols-[1fr_1fr_0.7fr_0.7fr_0.5fr_0.3fr] gap-4 py-4 px-6 border-b border-[#EEF9FF] font-semibold text-gray-700 uppercase">
    <span>Name</span>
    <span>Email Address</span>
    <span className="flex justify-center">Date Joined</span>
    <span className="flex justify-center">Itinerary Created</span>
    <span className="flex justify-end">Status</span>
  </div>
);
