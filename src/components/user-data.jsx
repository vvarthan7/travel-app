import Image from "next/image";

const UserData = ({ data, status }) => {
  return (
    <div className="relative min-h-[400px]">
      <div
        className={`absolute inset-0 flex justify-center items-center p-10 bg-gray-100 rounded-xl transition-opacity duration-500 ${
          status === "pending" ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/assets/icons/loader.svg"
          alt="loading"
          width={50}
          height={50}
        />
      </div>
      <div
        className={`transition-opacity duration-500 grid grid-cols-1 lg:grid-cols-1 gap-2.5 lg:gap-0 ${
          status !== "pending" ? "opacity-100" : "opacity-0"
        }`}
      >
        {data?.data?.map((user) => (
          <div
            key={user.id}
            className="flex flex-col lg:grid lg:grid-cols-[1fr_1fr_0.7fr_0.7fr_0.5fr_0.3fr] gap-4 py-4 px-6 border border-[#EEF9FF] odd:bg-light-200 hover:bg-gray-50 transition-colors bg-white"
          >
            <div className="flex flex-col lg:flex-row lg:items-center">
              <span className="text-xs text-gray-500 lg:hidden font-medium">
                Name:
              </span>
              <span className="text-sm md:text-base text-gray-900 font-semibold lg:text-gray-900">
                {user.first_name} {user.last_name}
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center">
              <span className="text-xs text-gray-500 lg:hidden font-medium">
                Email:
              </span>
              <span className="text-sm md:text-base text-gray-600 lg:text-gray-600">
                {user.email}
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center">
              <span className="text-xs text-gray-500 lg:hidden font-medium">
                Date Joined:
              </span>
              <span className="text-sm md:text-base text-gray-600 lg:text-gray-600">
                {new Date(user.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center">
              <span className="text-xs text-gray-500 lg:hidden font-medium">
                Itinerary Created:
              </span>
              <span className="text-sm md:text-base text-gray-600 lg:text-gray-600">
                {user.itinerary_created}
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center">
              <span className="text-xs text-gray-500 lg:hidden font-medium">
                Status:
              </span>
              <span
                className={`text-sm md:text-base ${
                  user.role === "user"
                    ? "text-success-500 capitalize bg-success-50 px-2 py-1 rounded-full w-max"
                    : "text-gray-700 capitalize bg-gray-100 px-2 py-1 rounded-full w-max"
                }`}
              >
                {user.role}
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center">
              <span className="text-xs text-gray-500 lg:hidden font-medium">
                Actions:
              </span>
              <button className="cursor-pointer text-red-500 hover:text-red-700 transition-colors flex justify-start lg:justify-start">
                <Image
                  src="/assets/icons/trash.svg"
                  alt="trash"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserData;
