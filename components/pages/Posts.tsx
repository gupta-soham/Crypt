import React from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import {
  ArrowDown,
  ArrowUp,
  Filter,
  MessageCircle,
  MessageCircleReply,
  MoveDiagonal,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type PostType = {
  content: string | JSX.Element;
  timeAgo: string;
  upvotes: number;
  comments: number;
};
export function Posts() {
  return (
    <div className="bg-card rounded-lg border border-card-border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Trending</h2>
        <Button variant="ghost" size="icon">
          <Filter className="w-5 h-5" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>
      <div className="grid gap-4">
        <Post
          content="Just finished my midterms! Time to celebrate with some friends. 🎉"
          timeAgo="2 hours ago"
          upvotes={123}
          comments={42}
        />
        <Post
          content={
            <Image
              src="/placeholder.svg"
              width={400}
              height={225}
              alt="Image"
              className="rounded-md object-cover aspect-video"
            />
          }
          timeAgo="1 day ago"
          upvotes={456}
          comments={78}
        />
        <Post
          content="Anyone else struggling with their final project? I could use some help!"
          timeAgo="3 days ago"
          upvotes={89}
          comments={21}
        />
      </div>
    </div>
  );
}

function Post({ content, timeAgo, upvotes, comments }: PostType) {
  return (
    <Card>
      <CardHeader className="flex  gap-3 relative ">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8 rounded-full border overflow-hidden">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>

          <div>
            <div className="font-medium">Anonymous User</div>
            <div className="text-xs text-muted-foreground">{timeAgo}</div>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="absolute top-2 right-2">
          <MoveDiagonal className="w-5 h-5" />
          <span className="sr-only">More</span>
        </Button>
      </CardHeader>

      <CardContent>
        <div className="text-sm">{content}</div>
      </CardContent>
      <CardFooter className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <ArrowUp className="w-5 h-5" />
          <span className="sr-only">Upvote</span>
        </Button>
        <div className="text-sm text-muted-foreground">{upvotes} upvotes</div>
        <Button variant="ghost" size="icon">
          <ArrowDown className="w-5 h-5" />
          <span className="sr-only">Downvote</span>
        </Button>
        <Button variant="ghost" size="icon">
          <MessageCircle className="w-5 h-5" />
          <span className="sr-only">Comment</span>
        </Button>
        <div className="text-sm text-muted-foreground">{comments} comments</div>
      </CardFooter>
    </Card>
  );
}
