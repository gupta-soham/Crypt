"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [systemTheme, setSystemTheme] = useState<"light" | "dark" | "system">(
    "system"
  );

  // Ensures the component is only rendered on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (systemTheme === "system" && !theme) {
      setTheme(systemTheme);
    }
  }, [systemTheme, theme, setTheme]);

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        if (theme === "system") {
          setTheme(systemTheme === "dark" ? "light" : "dark");
        } else {
          setTheme(theme === "dark" ? "light" : "dark");
        }
      }}
      className="relative flex items-center group"
    >
      {theme === "dark" ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Sun className="w-6 h-6" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Switch to Light Mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Moon className="w-6 h-6" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Switch to Dark Mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <span className="sr-only">Toggle Dark Mode</span>
    </Button>
  );
}
