"use client";

import { Infinite_Scrolling_Pagination_Results } from "@/config";
import { ExtendedPost } from "@/types/db";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import Posts from "./Posts";

interface PostFeedTypes {
  initialPosts: ExtendedPost[];
  subgroupName?: string;
}

export default function PostFeed({
  initialPosts,
  subgroupName,
}: PostFeedTypes) {
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data: session } = useSession();

  // Functionality for Infinite Scrolling (TanSatck Query)
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["infinite-query", subgroupName],
    queryFn: async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${Infinite_Scrolling_Pagination_Results}&page=${pageParam}` +
        (subgroupName ? `&sub=${subgroupName}` : "");

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
      fetchNextPage(); // Load more posts when the last post comes into view
    }
  }, [entry, fetchNextPage]);

  const posts = data.pages.flatMap((page) => page) ?? initialPosts;

  return (
    // <ul className="flex flex-col col-span-2 space-y-6">
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

        if (index === posts.length - 1)
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
        else
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
      })}
    </ul>
  );
}
