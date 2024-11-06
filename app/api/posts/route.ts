import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const session = await getAuthSession();

  let followedCommunitiesIds: string[] = [];

  if (session) {
    const followedCommunities = await db.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        subgroup: true,
      },
    });

    followedCommunitiesIds = followedCommunities.map((sub) => sub.subgroup.id);
  }

  // Fetch posts
  try {
    const { limit, page, subgroupName } = z
      .object({
        limit: z.string(),
        page: z.string(),
        subgroupName: z.string().nullish().optional(), // for specific subgroup
      })
      .parse({
        subgroupName: url.searchParams.get("sub"),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      });

    // Filter posts by subgroup or followed communities
    let whereClause = {};

    if (subgroupName) {
      whereClause = {
        subgroup: {
          name: subgroupName,
        },
      };
    } else if (session) {
      whereClause = {
        subgroup: {
          id: {
            in: followedCommunitiesIds,
          },
        },
      };
    }

    // Infinite scrolling pagination
    const posts = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
      orderBy: {
        createdAt: "desc",
      },
      include: {
        subgroup: true,
        votes: true,
        author: true,
        comments: true,
      },
      where: whereClause,
    });

    return new Response(JSON.stringify(posts));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid data passed", { status: 422 }); // Unprocessable entity
    }

    return new Response("Could not fetch posts", { status: 500 });
  }
}
