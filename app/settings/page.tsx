import { UpdateUsername } from "@/components/Username";
import { authOptions, getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function SettingsPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid items-start gap-8">
        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">Settings</h1>

        <div className="grid gap-10">
          <UpdateUsername
            user={{
              id: session.user.id,
              username: session.user.username || "",
            }}
          />
        </div>
      </div>
    </div>
  );
}
