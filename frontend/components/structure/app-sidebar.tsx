"use client";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { House, Car, GitCompare, ChevronsLeftRightEllipsis, Flag, Mail } from "lucide-react";
import Image from "next/image";

const items = [
  { title: "Home", url: "/", icon: House },
  { title: "Races", url: "/races", icon: Flag },
  { title: "Drivers", url: "/drivers", icon: Car },
  { title: "Constructors", url: "/constructors", icon: ChevronsLeftRightEllipsis },
  { title: "Compare", url: "/compare", icon: GitCompare },
  { title: "Feedback", url: "/feedback", icon: Mail },
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
            <SidebarMenu className="">
              {items.map((item) => (
                <SidebarMenuItem className="" key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center text-xl text-muted-foreground hover:text-primary transition-colors">
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
