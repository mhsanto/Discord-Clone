import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Navigation } from "./navigation";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationServers } from "./navigation-servers";

export const LeftSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) throw new Error("Please Sign up with your email");

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1f1f22] py-3">
      <Navigation />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea>
        {servers.map(({ id, name, imageUrl }) => (
          <div key={id} className="mb-4 ">
            <NavigationServers id={id} imageUrl={imageUrl} name={name} />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};
