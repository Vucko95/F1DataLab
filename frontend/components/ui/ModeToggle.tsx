"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("system");

  // Ensure the state matches the current theme on initial load
  useEffect(() => {
    if (theme) setCurrentTheme(theme);
  }, [theme]);

//   const themes = ["light", "dark", "system"];
  const themes = [ "dark", "light"];

  const handleToggle = () => {
    const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
    setTheme(nextTheme);
    setCurrentTheme(nextTheme);
  };

  return (
    <div className="fixed top-4 right-4 z-50">

    <Button variant="outline" size="icon" onClick={handleToggle}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
    </div>

  );
}
