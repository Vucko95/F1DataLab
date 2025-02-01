import "./globals.css";
import { ThemeProvider } from "../components/ui/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/structure/sidebar";
import { AppSidebar } from "@/components/structure/app-sidebar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <main>
              {/* <SidebarTrigger /> TRIGGER WHICH SHOWS / HIDES SIDEBAR  */}
              {children}
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
