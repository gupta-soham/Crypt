"use client";

import { Icons } from "@/components/Icons";
import UserAccountNav from "@/components/UserAccountNav";
import AnimatedBackground from "@/components/ui/AnimatedBG";
import { Button, buttonVariants } from "@/components/ui/button";
import ToggleTheme from "@/lib/toggleTheme";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";

const TABS = [
  { name: "Communities", link: "#" },
  { name: "Trending", link: "/trending" },
  { name: "Create", link: "/sub/create" },
];

export function Navbar({ session }: { session: any }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleCommunitiesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSearchOpen(true);
  };

  return (
    <header className="bg-card border-b border-card-border px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex gap-1 items-center" prefetch={false}>
            <Icons.logo className="h-14 w-14 sm:h-10 sm:w-10" />
            <p className="hidden text-xl font-bold sm:block">Crypt</p>
          </Link>
          <Link
            href="https://github.com/gupta-soham/Crypt"
            className="hidden sm:block"
          >
            <span className="rounded-full text-sm bg-primary/10 border border-primary/50 px-2">
              v1.0
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center text-bold font-semibold">
          <AnimatedBackground
            defaultValue={TABS[0].name}
            className="rounded-lg bg-zinc-100 dark:bg-zinc-800"
            transition={{
              type: "spring",
              bounce: 0.2,
              duration: 0.3,
            }}
            enableHover
          >
            {TABS.map((tab) => (
              <Link
                key={tab.name}
                href={tab.link}
                className="px-3 py-1.5 text-zinc-600 transition-colors duration-300 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                data-id={tab.name.toLowerCase()}
                onClick={
                  tab.name === "Communities"
                    ? handleCommunitiesClick
                    : undefined
                }
              >
                {tab.name}
              </Link>
            ))}
          </AnimatedBackground>
        </nav>

        <div className="flex items-center gap-3">
          <SearchBar isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
          <ToggleTheme />
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Link href="/login" className={buttonVariants()}>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
