"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from "@/components/ui/sidebar";
import { House, Car, GitCompare, Flag, Mail, Users } from "lucide-react";
import Image from "next/image";

const navigationItems = [
  { title: "Home", url: "/", icon: House },
  { title: "Races", url: "/races", icon: Flag },
  { title: "Drivers", url: "/drivers", icon: Car },
  { title: "Teams", url: "/constructors", icon: Users },
  { title: "Compare", url: "/compare", icon: GitCompare },
];


export function AppSidebar({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();

  if (isMobile) {
    return (
      <div className="p-4 bg-background text-center min-h-full">
        <div className="flex flex-col items-center mb-4">
          <img
            className="block dark:hidden"
            src="/images/logo/darknlight.png"
            alt="F1 Data Hub Logo"
            width={100}
            height={100}
          />
          <img
            className="hidden dark:block"
            src="/images/logo/darknlight.png"
            alt="F1 Data Hub Logo"
            width={100}
            height={100}
          />
          <span
            className="text-2xl font-extrabold whitespace-nowrap bg-gradient-to-r from-orange-700 to-yellow-300 bg-clip-text text-transparent mt-2"
            style={{ fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, 'sans-serif'" }}
          >
            F1 DataLab
          </span>
        </div>
        <nav className="flex flex-col gap-2 items-center">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-orange-100 dark:hover:bg-yellow-900 text-lg font-medium w-full justify-center"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    );
  }
  // Desktop sidebar (original content)
  return (
    <Sidebar>
      <SidebarContent className="p-2">
        <SidebarHeader className="flex items-center justify-center p-2">
          <Link href="/" className="flex flex-col items-center">
            <Image
              className="block dark:hidden"
              src="/images/logo/darknlight.png"
              alt="F1 Data Hub Logo"
              width={150}
              height={150}
            />
            <Image
              className="hidden dark:block"
              src="/images/logo/darknlight.png"
              alt="F1 Data Hub Logo"
              width={150}
              height={150}
            />
            <span
              className="text-2xl font-extrabold whitespace-nowrap relative group transition-colors duration-300 bg-gradient-to-r from-orange-700 to-yellow-300 bg-clip-text text-transparent"
              style={{ fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, 'sans-serif'" }}
            >
              F1 DataLab
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-primary/40 rounded transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>
        </SidebarHeader>

        <SidebarSeparator />

        <SidebarGroup className="p-2">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url} passHref legacyBehavior>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className="w-full text-lg justify-start gap-3 p-4"
                      size="lg"
                    >
                        <span className="flex items-center gap-3 cursor-pointer">
                        <item.icon className="h-6 w-6" />
                        <span>{item.title}</span>
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarFooter className="p-2">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <Link href="/feedback" passHref legacyBehavior>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === "/feedback"}
                    className="w-full text-lg justify-start gap-3 p-3"
                    size="lg"
                  >
                    <span className="flex items-center gap-3">
                      <Mail className="h-6 w-6" />
                      <span>Feedback</span>
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
