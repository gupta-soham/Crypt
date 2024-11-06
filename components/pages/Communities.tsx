"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronRight, Menu, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type CommunityType = {
  name: string;
  members: string;
  avatar: string;
  link: string;
};

export function Communities() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle communities menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div
        className={`bg-card rounded-lg border shadow-sm transition-all duration-200 ${
          isMenuOpen ? "block" : "hidden md:block"
        }`}
      >
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Communities</h2>
            <Link href="/sub/create">
              <Button
                variant="ghost"
                size="icon"
                className="group transition-colors"
              >
                <Plus className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="sr-only">Create Community</span>
              </Button>
            </Link>
          </div>

          <div className="space-y-2">
            <CommunityLink
              name="Study Group"
              members="1.2k"
              avatar="SG"
              link="/sub/study-group"
            />
            <CommunityLink
              name="Programming"
              members="5.4k"
              avatar="PG"
              link="/sub/programming"
            />
            <CommunityLink
              name="Design"
              members="2.8k"
              avatar="DS"
              link="/sub/design"
            />
            <CommunityLink
              name="Universities"
              members="3.6k"
              avatar="Uni"
              link="/sub/universities"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunityLink({ name, members, avatar, link }: CommunityType) {
  return (
    <Link
      href={link}
      className="group flex items-center gap-3 p-2 rounded-md hover:bg-accent/50 transition-colors"
      prefetch={false}
    >
      <Avatar className="h-10 w-10 border shadow-sm">
        <AvatarImage src="/placeholder-user.jpg" alt={name} />
        <AvatarFallback className="bg-muted text-muted-foreground">
          {avatar}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{name}</div>
        <div className="text-xs text-muted-foreground">{members} members</div>
      </div>

      <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
