import Link from "next/link";
import { toast } from "@/components/hooks/use-toast";
import { buttonVariants } from "@/components/ui/button";

export default function useCustomToast() {
  const loginToast = () => {
    const { dismiss } = toast({
      title: "Login required.",
      description: "You need to be logged in to do that.",
      variant: "destructive",
      action: (
        <Link
          onClick={() => dismiss()}
          href="/login"
          className={buttonVariants({ variant: "outline" })}
        >
          Login
        </Link>
      ),
    });
  };

  return { loginToast };
}
