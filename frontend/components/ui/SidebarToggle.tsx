"use client";

import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "../structure/app-sidebar";
import { Menu } from "lucide-react";



export function SidebarToggle() {

  return (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden fixed top-4 left-4 z-50"
                  aria-label="Open sidebar menu"
                >
                  <Menu className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Open sidebar menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <SheetTitle className="sr-only">Sidebar Menu</SheetTitle>
                <SheetDescription className="sr-only">Main navigation and links</SheetDescription>
                <AppSidebar isMobile />
              </SheetContent>
            </Sheet>

  );
}
