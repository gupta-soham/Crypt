import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubgroupSubscriptionValidator } from "@/lib/validators/sub";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorised", { status: 401 });
    }

    const body = await req.json();

    const { subgroupId } = SubgroupSubscriptionValidator.parse(body);

    const subscriptionExists = await db.subscription.findFirst({
      where: { subgroupId, userId: session.user.id },
    });

    if (subscriptionExists) {
      return new Response("You're already Subscribed to this community.", {
        status: 400,
      });
    }

    await db.subscription.create({
      data: {
        subgroupId,
        userId: session.user.id,
      },
    });

    return new Response(subgroupId);
  } catch (err) {
    if (err instanceof z.ZodError) {
        return new Response("Invalid request data passed", { status: 422 }); // Unprocessable entity
      }
  
      return new Response("Something went wrong!", { status: 500 });
    }
}
