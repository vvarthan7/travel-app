import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="absolute top-0 left-1/2 transform -translate-x-1/2 flex justify-between items-center px-4 py-4 md:py-8 sm:px-6 md:max-w-176 md:px-8 lg:max-w-236 lg:px-0 xl:max-w-292.5 w-full z-10">
      <div className="flex gap-1.5">
        <Image src="/assets/icons/logo.svg" alt="logo" width={30} height={30} />
        <h1 className="text-2xl font-semibold">Tourvisto</h1>
      </div>
      <div className="flex gap-6 items-center">
        <Link href="/admin/dashboard" className="text-[16px] font-normal">
          Admin Panel
        </Link>
        <Image
          src="/assets/images/david.webp"
          alt="user-avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <button>
          <Image
            src="/assets/icons/logout.svg"
            alt="logout"
            width={20}
            height={20}
          />
        </button>
      </div>
    </header>
  );
};
export default Header;
