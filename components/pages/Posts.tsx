// Preview Component for each Post
import { formatTimeToNow } from "@/lib/utils";
import { Post, User, Vote } from "@prisma/client";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import EditorOutput from "../EditorOutput";
import PostVoteClient from "./PostVoteClient";

type PartialVote = Pick<Vote, "type">;

interface PostProps {
  post: Post & {
    author: User;
    votes: Vote[];
  };
  totalVotes: number;
  subgroupName: string;
  currentVote?: PartialVote;
  commentAmt: number | null;
}
export default function Posts({
  post,
  totalVotes,
  currentVote,
  subgroupName,
  commentAmt,
}: PostProps) {
  const pRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="rounded-md bg-white dark:bg-black/30 shadow">
      <div className="px-6 py-4 flex justify-between">
        <PostVoteClient
          postId={post.id}
          initialTotalVotes={totalVotes}
          initialVote={currentVote?.type ?? null}
        />

        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            {subgroupName ? (
              <>
                <a
                  className="underline text-zinc-900 dark:text-zinc-100 text-sm underline-offset-2"
                  href={`/sub/${subgroupName}`}
                >
                  sub/{subgroupName}
                </a>
                <span className="px-1">•</span>
              </>
            ) : null}
            <span>Posted by u/{post.author.username}</span>{" "}
            {formatTimeToNow(new Date(post.createdAt))}
          </div>
          <a href={`/sub/${subgroupName}/post/${post.id}`}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900 dark:text-gray-100">
              {post.title}
            </h1>
          </a>

          <div
            className="relative text-sm max-h-40 w-full overflow-clip"
            ref={pRef}
          >
            <EditorOutput content={post.content} />
            {pRef.current?.clientHeight === 160 ? (
              // blur bottom if content is too long
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white dark:from-black to-transparent"></div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-zinc-900 z-20 text-sm px-4 py-4 sm:px-6">
        <Link
          href={`/sub/${subgroupName}/post/${post.id}`}
          className="w-fit flex items-center gap-2 text-gray-900 dark:text-gray-100"
        >
          <MessageSquare className="h-4 w-4" /> {commentAmt} comments
        </Link>
      </div>
    </div>
  );
}
