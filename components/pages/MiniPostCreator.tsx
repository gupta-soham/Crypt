"use client";

import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { UserAvatar } from "@/components/UserAvatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, Link2 } from "lucide-react";

export default function MiniPostCreator({ session }: { session: Session }) {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <>
      <li className="overflow-hidden rounded-md shadow outline-double">
        <div className="h-full px-6 py-4 flex justify-between gap-1 sm:gap-3">
          <div className="relative">
            <UserAvatar
              user={{
                name: session?.user.name || null,
                image: session?.user.image || null,
              }}
            />

            <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-600 outline outline-2 outline-white" />
          </div>

          <Input
            readOnly
            onClick={() => router.push(pathName + "/submit")}
            placeholder="Create Post"
          />

          <Button
            variant="ghost"
            onClick={() => router.push(pathName + "/submit")}
          >
            <ImageIcon className="text-zinc-600 hover:text-purple-600" />
          </Button>

          <Button
            variant="ghost"
            onClick={() => router.push(pathName + "/submit")}
          >
            <Link2 className="text-zinc-600 rotate-45 hover:text-purple-600" />
          </Button>
        </div>
      </li>
    </>
  );
}
