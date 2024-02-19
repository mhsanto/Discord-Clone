import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Navigation } from "./navigation";

export const LeftSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) throw new Error("Please Sign up with your email");

  const server = await db.server.findMany({
    where: {
      members: {
        some: {
          id: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1f1f22] py-3">
      <Navigation />
    </div>
  );
};
