"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function ToggleTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      <span className="sr-only">Toggle Dark Mode</span>
    </Button>
  );
}
