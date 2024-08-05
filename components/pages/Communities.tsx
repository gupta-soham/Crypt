"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type CommunityType = {
  name: string;
  members: string;
  avatar: string;
};

export function Communities() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // <div className="bg-card rounded-lg border border-card-border p-4 space-y-4 ">
      <div className={`bg-card rounded-lg border border-card-border p-4 space-y-4 ${isMenuOpen ? "block" : "hidden md:block"}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Communities</h2>
        <Button variant="ghost" size="icon">
          <Link href='/sub/create' className={buttonVariants({variant: "ghost"})}>
            <Plus className="w-5 h-5 hover:w-6 hover:h-6"  />
          </Link>
          <span className="sr-only">Create Community</span>
        </Button>
      </div>
      <div className="grid gap-2">
        <CommunityLink name="Study Group" members="1.2k" avatar="SG" />
        <CommunityLink name="Programming" members="5.4k" avatar="PG" />
        <CommunityLink name="Design" members="2.8k" avatar="DS" />
        <CommunityLink name="Universities" members="3.6k" avatar="Uni" />
      </div>
    </div>
  );
}

function CommunityLink({ name, members, avatar }: CommunityType) {
  return (
    <Link
      href="#"
      className="flex items-center gap-3 bg-muted/20 rounded-md px-3 py-2 hover:bg-muted/30"
      prefetch={false}
    >
      <div className="w-10 h-10 rounded-full border overflow-hidden">
        <Avatar>
          <AvatarImage
            src="/placeholder-user.jpg"
            alt={name}
            className="w-full h-full object-cover"
          />

          <AvatarFallback className="w-full h-full flex items-center justify-center">
            {avatar}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <div className="font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{members} members</div>
      </div>
      <Button variant="ghost" size="icon">
        <ChevronRight className="w-5 h-5" />
        <span className="sr-only">View Community</span>
      </Button>
    </Link>
  );
}
