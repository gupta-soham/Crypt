import PostFeed from "@/components/pages/PostFeed";
import { Infinite_Scrolling_Pagination_Results } from "@/config";
import { db } from "@/lib/db";

export const metadata = {
  title: "Trending Posts | Crypt",
  description: "See what's trending on Crypt",
};

export default async function TrendingPage() {
  const trendingPosts = await db.post.findMany({
    orderBy: [
      {
        votes: {
          _count: "desc",
        },
      },
      {
        comments: {
          _count: "desc",
        },
      },
      {
        createdAt: "desc",
      },
    ],
    include: {
      votes: true,
      author: true,
      comments: true,
      subgroup: true,
    },
    take: Infinite_Scrolling_Pagination_Results,
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Trending Posts</h1>
      <PostFeed initialPosts={trendingPosts} />
    </div>
  );
}
