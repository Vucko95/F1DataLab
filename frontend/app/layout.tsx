// app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "../components/ui/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppLayout } from "@/components/structure/app-layout"; // Import the new component
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL;
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

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

        {/* Umami Analytics - proxied to bypass ad blockers */}
        {umamiUrl && umamiWebsiteId && (
          <Script
            src={`${umamiUrl}/script.js`}
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}