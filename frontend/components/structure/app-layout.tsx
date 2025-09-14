import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/structure/app-sidebar";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { SidebarToggle } from "../ui/SidebarToggle";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar">

      {/* Mobile Burger Button and Mobile Sidebar */}
      <SidebarToggle />

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AppSidebar />
      </div>

      {/* Main content area */}
      <SidebarInset className="relative p-4 overflow-y-auto">
        <div className="fixed top-4 right-4 z-50">
          <ModeToggle />
        </div>
        {children}
      </SidebarInset>
    </div>
  );
}