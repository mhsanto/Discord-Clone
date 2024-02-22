import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Navigation } from "./navigation";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationServers } from "./navigation-servers";
import { ToggleMode } from "../toggle-mode";
import { UserButton } from "@clerk/nextjs";

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
    <div className="space-y-4 flex flex-col items-center h-full w-full text-primary  dark:bg-[#1f1f22] bg-[#E3E5E8] py-3">
      <Navigation />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map(({ id, name, imageUrl }) => (
          <div key={id} className="mb-4 ">
            <NavigationServers id={id} imageUrl={imageUrl} name={name} />
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ToggleMode />
        <UserButton 
        afterSignOutUrl="/"
        appearance={{
          elements:{
            avatarBox:"h-[40px] w-[40px]"
          }
        }} />
      </div>
    </div>
  );
};
