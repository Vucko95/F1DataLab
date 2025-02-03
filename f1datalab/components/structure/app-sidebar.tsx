
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/structure/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Races",
    url: "/races",
    icon: Inbox,
  },
  {
    title: "Drivers",
    url: "/drivers",
    icon: Calendar,
  },
  {
    title: "Constructors",
    url: "/constructors",
    icon: Search,
  },
  {
    title: "Circuits",
    url: "/circuits",
    icon: Settings,
  },
];

export function AppSidebar() {


  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>

        <div className="absolute top-0 left-0 w-full h-[300px]" />
            <Image
              className="block dark:hidden"
              src="/images/logo/light1.png"
              alt="light-mode-image"
              width={180}
              height={180}
            />
            <Image
              className="hidden dark:block"
              src="/images/logo/dark1.png"
              alt="dark-mode-image"
              width={180}
              height={180}
            />
          <SidebarGroupContent>
            <SidebarMenu className="pt-5">
              {items.map((item) => (
                <SidebarMenuItem className="pt-2" key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
