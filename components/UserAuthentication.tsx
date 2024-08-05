"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Icons } from "./Icons";
import { useToast } from "./hooks/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserAuthentication({
  className,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn('google');
    } catch (error) {
      console.error("Sign-in error:", error);
      toast({
        title: "Uh Oh!",
        description: "There was a problem signing you in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        onClick={loginWithGoogle}
        isLoading={isLoading}
        size="sm"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        {isLoading ? "Signing in..." : "Google"}
      </Button>
    </div>
  );
}
