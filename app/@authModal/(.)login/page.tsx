"use client";
import { SignIn } from "@/app/(auth)/login/page";
import CloseModal from "@/components/CloseModal";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function Page() {
  const router = useRouter();

  const handleClose = useCallback(() => { // Memoization
    router.back();
  }, [router]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
      handleClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [handleClose]);

  return (
    <div
      className="fixed inset-0 bg-zinc-900/20 z-10"
      onClick={handleOutsideClick}
    >
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative bg-white dark:bg-black/75 w-full h-fit py-3 rounded-lg">
          <div className="absolute top-4 right-4" onClick={handleOutsideClick}>
            <CloseModal onClick={handleClose} />
          </div>
          <SignIn />
        </div>
      </div>
    </div>
  );
}
