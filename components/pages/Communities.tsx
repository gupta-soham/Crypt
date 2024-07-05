import React from "react";
import Link from "next/link";
import { Button } from "@/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/ui/avatar";
import { PlusIcon, ChevronRightIcon } from "@/components/Icons";

type CommunityType = {
  name: string;
  members: string;
  avatar: string;
};

export function Communities() {
  return (
    <div className="bg-card rounded-lg border border-card-border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Communities</h2>
        <Button variant="ghost" size="icon">
          <PlusIcon className="w-5 h-5" />
          <span className="sr-only">Create Community</span>
        </Button>
      </div>
      <div className="grid gap-2">
        <CommunityLink name="Study Group" members="1.2k" avatar="SG" />
        <CommunityLink name="Programming" members="5.4k" avatar="PG" />
        <CommunityLink name="Design" members="2.8k" avatar="DS" />
        <CommunityLink name="Universities" members="3.6k" avatar="UV" />
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
      <div className="w-8 h-8 rounded-full border-2 border overflow-hidden">
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
        <ChevronRightIcon className="w-5 h-5" />
        <span className="sr-only">View Community</span>
      </Button>
    </Link>
  );
}
