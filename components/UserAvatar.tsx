import { AvatarProps } from "@radix-ui/react-avatar";
import { User } from "next-auth";
import Image from "next/image";
import { UserIcon } from "@/components/Icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, "name" | "image">;
  }
  export function UserAvatar({ user, ...props }: UserAvatarProps) {
    return (
      <Avatar {...props}>
        {user.image ? (
          <div className="relative aspect-square h-full w-full">
            <Image
              fill
              src={user.image}
              alt="Profile Picture"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <AvatarFallback>
            <span className="sr-only">{user?.name}</span>
            <UserIcon className="w-6 h-6" />
          </AvatarFallback>
        )}
      </Avatar>
    );
  }
  