import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NotFoundCatchAll() {
  return (
    <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-8 p-4">
      {/* Return to Home Button */}
      <Link
        href="/"
        className={cn(buttonVariants({ variant: "ghost" }), "self-start mt-8")}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Home
      </Link>

      {/* 404 Message */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl text-gray-700">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <p className="text-md text-gray-500">
          You might have followed a bad link, or the page may have been removed.
        </p>
      </div>
    </div>
  );
}
