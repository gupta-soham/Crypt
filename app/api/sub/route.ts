import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubgroupValidator } from "@/lib/validators/sub";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = SubgroupValidator.parse(body);

    const subgroupExists = await db.subgroup.findFirst({
      where: {
        name,
      },
    });

    if (subgroupExists) {
      return new Response("Subgroup already exists!", { status: 409 });
    }

    const subgroup = await db.subgroup.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    });

    await db.subscription.create({
      data: {
        userId: session.user.id,
        subgroupId: subgroup.id,
      },
    });

    return new Response(subgroup.name, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(err.message, { status: 422 }); // Unprocessable entity
    }

    return new Response("Couldn't Create Community :(", { status: 500 });
  }
}
