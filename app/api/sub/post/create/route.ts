import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import { SubgroupSubscriptionValidator } from "@/lib/validators/sub";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorised", { status: 401 });
    }

    const body = await req.json();

    const { subgroupId, title, content } = PostValidator.parse(body);

    const subscriptionExists = await db.subscription.findFirst({
      where: { subgroupId, userId: session.user.id },
    });

    if (!subscriptionExists) {
      return new Response("Subscribe this community to post.", {
        status: 400,
      });
    }

    await db.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
        subgroupId,
      },
    });

    return new Response("SUCCESS");
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid POST request data passed", { status: 422 }); // Unprocessable entity
    }

    return new Response("Couldn't create a post.", { status: 500 });
  }
}
