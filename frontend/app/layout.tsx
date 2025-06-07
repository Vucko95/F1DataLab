import "./globals.css";
import { ThemeProvider } from "../components/ui/theme-provider";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/structure/app-sidebar";
import { ModeToggle } from "@/components/ui/ModeToggle";

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
              <AppSidebar />
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