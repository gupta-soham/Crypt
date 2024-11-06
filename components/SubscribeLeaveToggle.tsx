"use client";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { SubscribeToSubgroupPayload } from "@/lib/validators/sub";
import axios, { AxiosError } from "axios";
import { ToastAction } from "./ui/toast";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import useCustomLoginToast from "@/hooks/useCustomToast";
import { startTransition } from "react";
interface SubscribeLeaveToggleProps {
  isSubscribed: boolean;
  subgroupId: string;
  subgroupName: string;
}
export default function SubscribeLeaveToggle({
  isSubscribed,
  subgroupId,
  subgroupName,
}: SubscribeLeaveToggleProps) {
  const router = useRouter();
  const { loginToast } = useCustomLoginToast();

  // Subscribe
  const { mutate: subscribe, isPending: isSubscribing } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubgroupPayload = {
        subgroupId,
      };
      const response = await axios.post("/api/sub/subscribe", payload);
      return response.data;
    },

    onSuccess: (data) => {
      startTransition(() => {
        router.refresh();
      });
      return toast({
        title: `Yay! Joined sub/${subgroupName} 🫡`,
        description: "Subscribed Successfully!",
        variant: "default",
      });
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }

        if (err.response?.status === 400) {
          return toast({
            title: "Already a Community member!",
            description: "You're already a member of this community.",
            variant: "default",
          });
        }
      }

      toast({
        title: "Something went wrong!",
        description: "Couldn't join community",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });

  // Unsubscribe
  const { mutate: unsubscribe, isPending: isUnsubscribing } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubgroupPayload = {
        subgroupId,
      };
      const response = await axios.post("/api/sub/unsubscribe", payload);
      return response.data;
    },

    onSuccess: (data) => {
      startTransition(() => {
        router.refresh();
      });
      return toast({
        title: "Unsubscribed 😶‍🌫️",
        description: `You are now unsubscribed from sub/${subgroupName}`,
      });
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }

        if (err.response?.status === 400) {
          return toast({
            title: "Already a Community member!",
            description: "You're not a member of this community.",
            variant: "default",
          });
        }

        if (err.response?.status === 402) {
          return toast({
            title: "Creator cannot unsubscribe!",
            description: "You're the creator of this community 🪿",
          });
        }
      }

      toast({
        title: "Something went wrong!",
        description: "Couldn't leave the community",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });

  return isSubscribed ? (
    <Button
      onClick={() => unsubscribe()}
      isLoading={isUnsubscribing}
      className="w-full my-1"
    >
      Leave Community
    </Button>
  ) : (
    <Button
      onClick={() => subscribe()}
      isLoading={isSubscribing}
      className="w-full my-1"
    >
      Join to Post
    </Button>
  );
}
