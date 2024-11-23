"use client";

import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { UserAvatar } from "@/components/UserAvatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, Link2, PlusCircle } from "lucide-react";

export default function MiniPostCreator({ session }: { session: Session }) {
  const router = useRouter();
  const pathName = usePathname();

  function handleClick() {
    router.push(pathName + "/submit");
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-4 p-4 rounded-lg shadow-md border border-border">
        <div className="relative flex-shrink-0">
          <UserAvatar
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
            className="w-10 h-10"
          />
          <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-600 outline outline-2 outline-background" />
        </div>
        <div className="flex-grow flex items-center gap-2">
          <Input
            readOnly
            onClick={handleClick}
            placeholder="Create Post"
            className="cursor-pointer bg-background dark:bg-black"
          />
          <div className="flex-shrink-0 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClick}
              className="hidden sm:flex"
            >
              <ImageIcon className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClick}
              className="hidden sm:flex"
            >
              <Link2 className="h-5 w-5 text-muted-foreground hover:text-primary rotate-45" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClick}
              className="sm:hidden"
            >
              <PlusCircle className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
