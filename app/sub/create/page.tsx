"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import useCustomLoginToast from "@/hooks/useCustomToast";
import { CreateSubgroupPayload } from "@/lib/validators/sub";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Create() {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const { loginToast } = useCustomLoginToast();

  const { mutate: createCommunity, isPending } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubgroupPayload = {
        name: input,
      };
      const response = await axios.post("/api/sub", payload);
      return response.data;
    },

    onSuccess: (data) => {
      toast({
        title: `Yay! Created sub/${data} 🥳`,
        variant: "default",
      });

      router.push(`/sub/${data}`);
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "That Community Already Exists!",
            description: "Please choose a different name.",
            variant: "destructive",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: "Invalid Community Name!",
            description:
              "Please try again using a different set of characters, ranging from 3 to 20",
            variant: "destructive",
          });
        }

        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      toast({
        title: "Something went wrong!",
        description: "Couldn't create community",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });

  return (
    <div className="container flex flex-col items-center h-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold">Create a Community</div>
        </div>

        <hr className="bg-zinc-500 h-px" />

        <div>
          <p className="text-lg font-medium">Name Your Community</p>
          <p className="text-xs pb-2">
            Communities with capitalization cannot be changed later!
          </p>
        </div>

        <div className="relative">
          <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400 pl-2">
            sub/
          </p>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Button Container */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-auto sm:mt-6 w-full">
        <Button
          variant="secondary"
          onClick={() => router.back()}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
        <Button
          isLoading={isPending}
          disabled={input.length === 0}
          onClick={() => createCommunity()}
          className="w-full sm:w-auto"
        >
          Create Community
        </Button>
      </div>
    </div>
  );
}
