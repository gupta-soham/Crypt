import { Button, buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import ToggleTheme from "@/lib/toggleTheme";
import { Bell, Search } from "lucide-react";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import UserAccountNav from "@/components/UserAccountNav";
import AnimatedBackground from "@/components/ui/AnimatedBG";

export async function Navbar() {
  const session = await getAuthSession();
  const TABS = [
    { name: "Communities", link: "/sub/search" },
    { name: "Trending", link: "/trending" },
    { name: "Create", link: "/sub/create" },
  ];

  return (
    <header className="bg-card border-b border-card-border px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex gap-1 items-center" prefetch={false}>
          <Icons.logo className="h-14 w-14 sm:h-10 sm:w-10" />
          <p className="hidden text-xl font-bold md:block">Crypt</p>
        </Link>
        <Link href="https://github.com/gupta-soham/Crypt">
          <span className="rounded-full text-xl bg-primary/10 border border-primary/50 px-2 hidden sm:block ">
            v1.0
          </span>
        </Link>

        <nav className="hidden md:flex pl-3 items-center gap-4 text-bold font-semibold text-gray-600">
          <div className="flex flex-row">
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
              {TABS.map((tab, index) => (
                <Link
                  key={index}
                  href={tab.link}
                  className="px-2 py-0.5 text-zinc-600 transition-colors duration-300 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                  data-id={tab.name.toLowerCase()}
                >
                  {tab.name}
                </Link>
              ))}
            </AnimatedBackground>
          </div>
        </nav>
      </div>

      <div className="flex items-center gap-5">
        <ToggleTheme />

        <Button variant="ghost" size="icon">
          <Search className="w-6 h-6" />
          <span className="sr-only">Search</span>
        </Button>

        <Button variant="ghost" size="icon">
          <Bell className="w-6 h-6" />
          <span className="sr-only">Notifications</span>
        </Button>

        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href="/login" className={buttonVariants()}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
