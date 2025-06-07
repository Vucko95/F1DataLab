"use client";

import { Coffee } from "lucide-react";

import { Button } from "@/components/ui/button";


  const handleRedirect = () => {
    window.open("https://www.buymeacoffee.com/f1StatsHub", "_blank");
  }; 

export function ModeCoffe() {

  return (
    <div className="fixed top-4 right-16 z-50">

<Button variant="outline" size="icon" onClick={handleRedirect}>
      <Coffee className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Coffee className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Buy me a coffee</span>
    </Button>
    </div>

  );
}
