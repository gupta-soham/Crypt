// import ToFeedButton from '@/components/ToFeedButton'
import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";
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
    <div className="sm:container max-w-7xl mx-auto h-full pt-12">
      <div>
        {/* <ToFeedButton /> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          <ul className="flex flex-col col-span-2 space-y-6">{children}</ul>

          {/* Info Sidebar */}
          <div className="hidden overflow-hidden h-fit rounded-lg border border-gray-200 dark:border-gray-700 order-first md:order-last sm:block">
            <div className="px-6 py-4 dark:bg-gray-800">
              <p className="font-semibold py-3 dark:text-white">
                About sub/{subgroup.name}
              </p>
            </div>
            <dl className="divide-y divide-gray-100 dark:divide-gray-700 px-6 py-4 text-sm leading-6 bg-gray-200 dark:bg-black/10">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500 dark:text-gray-400">Created</dt>
                <dd className="text-gray-700 dark:text-gray-300">
                  <time dateTime={subgroup.createdAt.toDateString()}>
                    {format(subgroup.createdAt, "d MMMM, yyyy")}
                  </time>
                </dd>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500 dark:text-gray-400">Members</dt>
                <dd className="flex items-start gap-x-2">
                  <div className="text-gray-900 dark:text-gray-100">
                    {memberCount}
                  </div>
                </dd>
              </div>
              {subgroup.creatorId === session?.user?.id ? (
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500 dark:text-gray-400">
                    You created this community
                  </dt>
                </div>
              ) : (
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500 dark:text-gray-400">
                    created by u/@{creator?.username}
                  </dt>
                </div>
              )}

              {subgroup.creatorId !== session?.user?.id ? (
                <SubscribeLeaveToggle
                  isSubscribed={isSubscribed}
                  subgroupId={subgroup.id}
                  subgroupName={subgroup.name}
                />
              ) : null}
              <Link
                className={buttonVariants({
                  variant: "outline",
                  className:
                    "w-full mb-6 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
                })}
                href={`/sub/${subId}/submit`}
              >
                Create Post
              </Link>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
