import Editor from "@/components/pages/Editor";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface SubmitProps {
  params: {
    subId: string;
  };
}

export default async function Submit({ params: { subId } }: SubmitProps) {
  const subgroup = await db.subgroup.findFirst({
    where: { name: subId },
  });

  if (!subgroup) return notFound();

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="border-b border-gray-200 pb-5">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-base font-semibold leading-6">
            Create Post
          </h3>

          <p className="ml-2 mt-1 truncate text-sm text-gray-500">
            in sub/{subId}
          </p>
        </div>
      </div>

      {/* Form */}
      <Editor subgroupId={subgroup.id}/>
      <div className="w-full flex justify-normal">
        <Button type="submit" className="w-full" form="subgroup-post-form">
          Post
        </Button>
      </div>
    </div>
  );
}
