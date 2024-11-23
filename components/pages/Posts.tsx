// Preview Component for each Post
import { formatTimeToNow } from "@/lib/utils";
import { Post, User, Vote } from "@prisma/client";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import EditorOutput from "@/components/EditorOutput";
import PostVoteClient from "@/components/votes/PostVoteClient";

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
    <article className="rounded-lg border bg-card shadow-sm transition-colors dark:bg-black/20 dark:border-gray-800">
      <div className="flex flex-col sm:flex-row p-4 sm:p-6">
        <div className="flex sm:flex-col items-center sm:items-start mb-4 sm:mb-0">
          <PostVoteClient
            postId={post.id}
            initialTotalVotes={totalVotes}
            initialVote={currentVote?.type ?? null}
          />
        </div>

        <div className="flex-1 sm:ml-4 space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {subgroupName && (
              <>
                <Link
                  href={`/sub/${subgroupName}`}
                  className="font-medium text-foreground dark:text-muted-foreground hover:underline"
                >
                  sub/{subgroupName}
                </Link>
                <span>•</span>
              </>
            )}
            <span>Posted by u/{post.author.username}</span>
            <span>•</span>
            <span>{formatTimeToNow(new Date(post.createdAt))}</span>
          </div>

          <Link
            href={`/sub/${subgroupName}/post/${post.id}`}
            className="block group"
          >
            <h2 className="text-xl font-semibold text-primary dark:text-white group-hover:underline decoration-2 underline-offset-2">
              {post.title}
            </h2>
          </Link>

          {/* gradient background  */}
          <div
            className="relative max-h-40 overflow-hidden text-sm text-muted-foreground"
            ref={pRef}
          >
            <EditorOutput content={post.content} />
            {pRef.current?.clientHeight === 160 && (
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-background dark:from-gray-900 to-transparent" />
            )}
          </div>
        </div>
      </div>

      <div className="border-t bg-muted/10 px-4 sm:px-6 py-3 dark:border-gray-800 dark:bg-gray-900/50">
        <Link
          href={`/sub/${subgroupName}/post/${post.id}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageSquare className="h-4 w-4" />
          <span>
            {commentAmt} {commentAmt === 1 ? "comment" : "comments"}
          </span>
        </Link>
      </div>
    </article>
  );
}
