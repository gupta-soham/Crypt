"use client";

import { UserAvatar } from "@/components/UserAvatar";
import { toast } from "@/hooks/use-toast";
import { formatTimeToNow } from "@/lib/utils";
import { CommentRequest } from "@/lib/validators/comment";
import { Comment, CommentVote, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import CommentVotes from "./CommentVotes";

type ExtendedComment = Comment & {
  votes: CommentVote[];
  author: User;
};

interface PostCommentProps {
  comment: ExtendedComment;
  votesAmt: number;
  currentVote: CommentVote | undefined;
  postId: string;
}

export default function PostComment({
  comment,
  votesAmt,
  currentVote,
  postId,
}: PostCommentProps) {
  const { data: session } = useSession();
  const commentRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<string>(`@${comment.author.username} `);
  const router = useRouter();

  const { mutate: postComment, isPending } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = { postId, text, replyToId };

      const { data } = await axios.patch("/api/sub/post/comment/", payload);
      return data;
    },

    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Comment wasn't created! Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div ref={commentRef} className="flex flex-col">
      <div className="flex items-center">
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className="h-6 w-6"
        />
        <div className="ml-2 flex items-center gap-x-2">
          <p className="text-sm font-medium text-gray-900">
            u/{comment.author.username}
          </p>

          <p className="max-h-40 truncate text-xs text-zinc-500">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>

      <p className="text-sm text-zinc-900 mt-2">{comment.text}</p>

      <div className="flex gap-2 items-center">
        <CommentVotes
          commentId={comment.id}
          votesAmt={votesAmt}
          currentVote={currentVote}
        />
      </div>
    </div>
  );
}
