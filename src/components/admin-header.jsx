"use client";

import Image from "next/image";
import { SidebarTrigger } from "./ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminHeader = ({ title, description, user, ctaLabel }) => {
  const isMobile = useIsMobile();
  return (
    <header className="flex flex-col lg:flex-row shrink-0 justify-between gap-4 mt-7 md:items-center">
      {isMobile && (
        <div className="flex items-center justify-between mb-4 border-b pb-4 px-4 border-sidebar-border w-full">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/icons/logo.svg"
              alt="logo"
              width={30}
              height={30}
            />
            <h1 className="text-2xl font-semibold">Tourvisto</h1>
          </div>
          <SidebarTrigger className="-ml-1 " />
        </div>
      )}
      <div className="flex gap-2 items-center px-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold mb-3.5">
            {title} {user}
          </h1>
          <p className="text-lg font-normal">{description}</p>
        </div>
      </div>
      <button className="flex gap-2.5 btn-primary py-3 px-14 mx-4 bg-primary-100 rounded-md text-white justify-center items-center font-semibold text-base">
        <Image src="/assets/icons/plus.svg" alt="plus" width={20} height={20} />{" "}
        {ctaLabel}
      </button>
    </header>
  );
};
export default AdminHeader;
