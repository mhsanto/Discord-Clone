"use client";
import { cn } from "@/lib/utils";
import { TooltipAction } from "../tooltip-action";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

type NavigationServerProps = {
  id: string;
  name: string;
  imageUrl: string;
};
export function NavigationServers({
  id,
  name,
  imageUrl,
}: NavigationServerProps) {
  const params = useParams();
  const serverId = params?.serverId;
  const router = useRouter();
  return (
    <TooltipAction label={name} align="center" side="right">
      <button
        type="button"
        onClick={() => {}}
        className="relative group flex items-center w-full"
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all duration-300 w-[4px]",
            serverId !== id && "group-hover:h-[20px] ",
            serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden duration-300",
            serverId === id && "bg-primary/10 text-primary rounded-[16px] "
          )}
        >
          <Image
            src={imageUrl}
            fill
            className="rounded-full object-cover aspect-square hover:rounded-sm"
            alt={name}
          />
        </div>
      </button>
    </TooltipAction>
  );
}
