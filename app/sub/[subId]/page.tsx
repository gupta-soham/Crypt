import React from "react";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Infinite_Scrolling_Pagination_Results } from "@/config";
import { notFound } from "next/navigation";
import MiniPostCreator from "@/components/pages/MiniPostCreator";

interface PageProps {
  params: {
    subId: string;
  };
}

export default async function page({
  params,
}: PageProps): Promise<JSX.Element> {
  const { subId } = params;
  const session = await getAuthSession();
  const subgroup = await db.subgroup.findFirst({
    where: {
      name: subId,
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subgroup: true,
        },
        take: Infinite_Scrolling_Pagination_Results,
      },
    },
  });

  if (!subgroup) {
    return notFound();
  }

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">
        sub/{subgroup.name}
      </h1>

      <MiniPostCreator session={session!} />
    </>
  );
}
