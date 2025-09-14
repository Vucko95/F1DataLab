// app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "../components/ui/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppLayout } from "@/components/structure/app-layout"; // Import the new component

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
            {/* The main layout wrapper is now a single component */}
            <AppLayout>
              {children}
            </AppLayout>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}