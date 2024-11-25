"use client";

import { Infinite_Scrolling_Pagination_Results } from "@/config";
import { ExtendedPost } from "@/types/db";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import Posts from "@/components/pages/Posts";

interface TrendingPostFeedProps {
  initialPosts: ExtendedPost[];
}

export default function TrendingPostFeed({
  initialPosts,
}: TrendingPostFeedProps) {
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data: session } = useSession();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["infinite-query-trending"],
    queryFn: async ({ pageParam = 1 }) => {
      const query = `/api/posts/trending?limit=${Infinite_Scrolling_Pagination_Results}&page=${pageParam}`;
      const { data } = await axios.get(query);
      return data as ExtendedPost[];
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length < Infinite_Scrolling_Pagination_Results) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    initialData: { pages: [initialPosts], pageParams: [1] },
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <ul className="space-y-6">
      {posts.map((post, index) => {
        const totalVotes = post.votes.reduce((acc, vote) => {
          if (vote.type === "UP") return acc + 1;
          if (vote.type === "DOWN") return acc - 1;
          return acc;
        }, 0);

        const isVoted = post.votes.find(
          (vote) => vote.userId === session?.user.id
        );

        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <Posts
                post={post}
                commentAmt={post.comments.length}
                subgroupName={post.subgroup.name}
                totalVotes={totalVotes}
                currentVote={isVoted}
              />
            </li>
          );
        } else {
          return (
            <Posts
              key={post.id}
              post={post}
              commentAmt={post.comments.length}
              subgroupName={post.subgroup.name}
              totalVotes={totalVotes}
              currentVote={isVoted}
            />
          );
        }
      })}
    </ul>
  );
}
