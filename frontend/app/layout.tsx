
import "./globals.css";
import { ThemeProvider } from "../components/ui/theme-provider";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/structure/app-sidebar";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            <div
              className="group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar"
              style={
                {
                  "--sidebar-width": "13rem",
                  "--sidebar-width-icon": "3rem"
                } as React.CSSProperties & Record<string, string>
              }
            >
              {/* Mobile Burger Button and Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <button className="md:hidden p-2 fixed top-4 left-4 z-50  rounded shadow">
                    <Menu className="h-7 w-7" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                  <SheetTitle className="sr-only">Sidebar Menu</SheetTitle>
                  <SheetDescription className="sr-only">Main navigation and links</SheetDescription>
                  <AppSidebar isMobile />
                </SheetContent>
              </Sheet>

              {/* Desktop Sidebar */}
              <div className="hidden md:block">
                <AppSidebar />
              </div>

              <SidebarInset className="relative p-4 overflow-y-auto">
                <div className="fixed top-4 right-4 z-50">
                  <ModeToggle />
                </div>
                {children}
              </SidebarInset>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}