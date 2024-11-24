import { Infinite_Scrolling_Pagination_Results } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import PostFeed from "./PostFeed";

export default async function CustomFeed() {
  const session = await getAuthSession();

  const followedCommunitiesPosts = await db.subscription.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      subgroup: true,
    },
  });

  const posts = await db.post.findMany({
    where: {
      subgroup: {
        name: {
          in: followedCommunitiesPosts.map(({ subgroup }) => subgroup.id),
        },
      },
    },
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

  if (posts.length <= 3) {
    return redirect("/trending");
  }

  return <PostFeed initialPosts={posts} />;
}
