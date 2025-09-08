import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
import BreadcrumbWrapper from "../breadcrumb-wrapper";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import UserCheck from "@/components/UserCheck";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserCheck>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between w-full px-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <BreadcrumbWrapper />
              </div>

              {/* Logo in header for when sidebar is collapsed */}
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-900 md:hidden group-has-[[data-collapsible=icon]]/sidebar-wrapper:flex"
              >
                <Image
                  src="/logo.png"
                  alt="Thrive Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-lg font-bold">Thrive</span>
              </Link>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </UserCheck>
  );
}
