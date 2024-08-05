import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";
import UserAuthentication from "@/components/UserAuthentication";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "self-start -mt-20"
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Home
        </Link>

        <SignIn />
      </div>
    </div>
  );
}

export const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-24 w-24" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Crypt anonyumous account and agree
          to our User Agreement and Privacy Policy.
        </p>
      </div>
      <UserAuthentication />
      <p className="px-8 text-center text-sm text-muted-foreground">
        New to Crypt?{" "}
        <Link
          href="/register"
          className="hover:text-brand text-sm underline underline-offset-4"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};
