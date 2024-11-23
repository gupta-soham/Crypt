import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";
import ToFeedButton from "@/components/ToFeedButton";
import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { format } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Crypt",
  description:
    "Crypt offers students a confidential space to discuss academics, share insights, and connect with a supportive community anonymously.",
};

export default async function layout({
  children,
  params: { subId },
}: {
  children: ReactNode;
  params: { subId: string };
}) {
  const session = await getAuthSession();

  const subgroup = await db.subgroup.findFirst({
    where: { name: subId },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          subgroup: {
            name: subId,
          },
          user: {
            id: session.user.id,
          },
        },
      });

  const isSubscribed = !!subscription;

  if (!subgroup) return notFound();

  const memberCount = await db.subscription.count({
    where: {
      subgroup: {
        name: subId,
      },
    },
  });

  const creator = await db.user.findFirst({
    where: { id: subgroup.creatorId ?? "" },
  });

  return (
    <div className="sm:container max-w-7xl mx-auto px-4 py-6 lg:py-8">
      <ToFeedButton />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 mt-2">
        <div className="col-span-2">
          <ul className="space-y-6">{children}</ul>
        </div>

        {/* Info Sidebar */}
        <aside className="order-first md:order-last">
          <div className="rounded-lg border bg-card shadow-sm overflow-hidden dark:bg-black/20 dark:border-gray-800">
            <div className="px-6 py-4 border-b dark:border-gray-700">
              <h2 className="font-semibold text-foreground dark:text-white">
                About sub/{subgroup.name}
              </h2>
            </div>

            <div className="px-6 py-4 bg-muted/10 dark:bg-gray-900/20 space-y-4">
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between gap-x-4">
                  <dt className="text-muted-foreground dark:text-gray-400">
                    Created
                  </dt>
                  <dd className="text-foreground dark:text-white">
                    <time dateTime={subgroup.createdAt.toDateString()}>
                      {format(subgroup.createdAt, "d MMMM, yyyy")}
                    </time>
                  </dd>
                </div>

                <div className="flex justify-between gap-x-4">
                  <dt className="text-muted-foreground dark:text-gray-400">
                    Members
                  </dt>
                  <dd className="text-foreground dark:text-white">
                    {memberCount}
                  </dd>
                </div>

                {subgroup.creatorId === session?.user?.id ? (
                  <div className="text-muted-foreground dark:text-gray-400">
                    You created this community
                  </div>
                ) : (
                  <div className="text-muted-foreground dark:text-gray-400">
                    created by u/{creator?.username}
                  </div>
                )}
              </dl>

              <div className="space-y-3">
                {subgroup.creatorId !== session?.user?.id && (
                  <SubscribeLeaveToggle
                    isSubscribed={isSubscribed}
                    subgroupId={subgroup.id}
                    subgroupName={subgroup.name}
                  />
                )}

                <Link
                  className={buttonVariants({
                    variant: "outline",
                    className: "w-full",
                  })}
                  href={`/sub/${subId}/submit`}
                >
                  Create Post
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
