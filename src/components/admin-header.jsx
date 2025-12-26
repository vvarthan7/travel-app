import Image from "next/image";
import { SidebarTrigger } from "./ui/sidebar";

const AdminHeader = ({ title, description, user, ctaLabel }) => {
  return (
    <header className="sm:flex-col md:flex-row shrink-0 items-center justify-between gap-4 px-4 mt-7">
      <div className="flex gap-2 items-center">
        <SidebarTrigger className="-ml-1 " />
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">
            {title}
            {user}
          </h1>
          <p>{description}</p>
        </div>
      </div>
      <button className="flex gap-2.5 btn-primary py-3 px-14 bg-primary-100 rounded-md text-white">
        <Image src="/assets/icons/plus.svg" alt="plus" width={20} height={20} />{" "}
        {ctaLabel}
      </button>
    </header>
  );
};
export default AdminHeader;
