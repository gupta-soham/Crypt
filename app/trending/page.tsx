import TrendingPostFeed from "@/components/pages/TrendingPostFeed";
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
    <div className="flex flex-col h-screen gap-3 p-2 mt-5">
      <h1 className="text-3xl font-bold mb-6">Trending Posts</h1>
      <TrendingPostFeed initialPosts={trendingPosts} />
    </div>
  );
}
