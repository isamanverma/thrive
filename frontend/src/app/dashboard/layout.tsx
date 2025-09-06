import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserCheck from "@/components/UserCheck";
import { AppSidebar } from "../../components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserCheck>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </UserCheck>
  );
}
