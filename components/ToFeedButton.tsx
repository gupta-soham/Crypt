"use client";

import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";

export default function ToFeedButton() {
  const pathname = usePathname();

  // if path is /sub/abc, turn into /
  // if path is /sub/abc/post/[postId], turn into /sub/abc

  const subgroupPath = getSubgroupPath(pathname);

  return (
    <a
      href={subgroupPath}
      className={buttonVariants({ variant: "outline" })}
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      {subgroupPath === "/" ? "Back Home" : "Back to Community"}
    </a>
  );
}

const getSubgroupPath = (pathname: string) => {
  const splitPath = pathname.split("/");

  if (splitPath.length === 3) return "/";
  else if (splitPath.length > 3) return `/${splitPath[1]}/${splitPath[2]}`;
  // default path, in case pathname does not match expected format
  else return "/";
};
