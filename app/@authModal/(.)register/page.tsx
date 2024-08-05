"use client";
import { SignUp } from "@/app/(auth)/register/page";
import CloseModal from "@/components/CloseModal";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-zinc-900/20 z-10"
      onClick={handleOutsideClick}
    >
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative bg-white w-full h-fit py-3 rounded-lg">
          <div className="absolute top-4 right-4">
            <CloseModal onClick={handleClose} />
          </div>
          <SignUp />
        </div>
      </div>
    </div>
  );
}
