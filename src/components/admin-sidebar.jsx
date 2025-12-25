"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Home, Users, Sparkles, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Render the admin navigation sidebar for admin pages.
 *
 * The sidebar includes a header with the site logo and title, a navigation menu
 * with Dashboard, All Users, and AI Trips items (each highlighting when the
 * current route matches), and a footer displaying the admin avatar, name,
 * email, and a logout icon.
 *
 * @returns {JSX.Element} The sidebar element ready to be included in the admin layout.
 */
export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-7">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={30}
            height={30}
          />{" "}
          <h1 className="text-2xl font-semibold">Tourvisto</h1>
        </div>
      </SidebarHeader>
      <hr className="mx-6 border-b border border-sidebar-border" />
      <SidebarContent className="px-6 mt-7">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3.5">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/dashboard"}
                  className="px-3.5 py-5"
                >
                  <Link href="/admin/dashboard">
                    <Image
                      src="/assets/icons/home.svg"
                      alt="home"
                      width={20}
                      height={20}
                      className={
                        pathname === "/admin/dashboard"
                          ? "brightness-0 invert"
                          : ""
                      }
                    />
                    <span className="font-figtree font-semibold text-lg">
                      Dashboard
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/users"}
                  className="px-3.5 py-5"
                >
                  <Link href="/admin/users">
                    <Image
                      src="/assets/icons/users.svg"
                      alt="users"
                      width={20}
                      height={20}
                      className={
                        pathname === "/admin/users" ? "brightness-0 invert" : ""
                      }
                    />
                    <span className="font-figtree font-semibold text-lg">
                      All Users
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/admin/trip-list"}
                  className="px-3.5 py-5"
                >
                  <Link href="/admin/trip-list">
                    <Image
                      src="/assets/icons/itinerary.svg"
                      alt="itinerary"
                      width={20}
                      height={20}
                      className={
                        pathname === "/admin/trip-list"
                          ? "brightness-0 invert"
                          : ""
                      }
                    />
                    <span className="font-figtree font-semibold text-lg">
                      AI Trips
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center justify-between py-2 px-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-muted">
              <Image
                src="/assets/images/david.webp"
                alt="admin-avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Admin User</span>
              <span className="text-xs text-muted-foreground">
                admin@tourvisto.com
              </span>
            </div>
          </div>
          <div>
            <Image
              src="/assets/icons/logout.svg"
              alt="logout"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}