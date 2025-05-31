"use client";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Puzzle, CircleUser, Gauge, Users, Flag } from "lucide-react";
import Image from "next/image";

const items = [
  { title: "Home", url: "/", icon: Puzzle },
  { title: "Races", url: "/races", icon: Flag },
  { title: "Drivers", url: "/drivers", icon: CircleUser },
  { title: "Constructors", url: "/constructors", icon: Users },
  { title: "Compare", url: "/compare", icon: Gauge },
];

export function AppSidebar() {

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Image
            className="block dark:hidden"
            src="/images/logo/darknlight.png"
            alt="light-mode-image"
            width={180}
            height={180}
          />
          <Image
            className="hidden dark:block"
            src="/images/logo/darknlight.png"
            alt="dark-mode-image"
            width={180}
            height={180}
          />
          <SidebarGroupContent>
            <SidebarMenu className="pt-2">
              {items.map((item) => (
                <SidebarMenuItem className="pt-2 ml-1" key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center text-lg">
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
