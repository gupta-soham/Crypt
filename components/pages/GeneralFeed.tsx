import { Infinite_Scrolling_Pagination_Results } from "@/config";
import { db } from "@/lib/db";
import PostFeed from "./PostFeed";

export default async function GeneralFeed() {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      subgroup: true,
    },
    take: Infinite_Scrolling_Pagination_Results,
  });

  return <PostFeed initialPosts={posts} />;
}
