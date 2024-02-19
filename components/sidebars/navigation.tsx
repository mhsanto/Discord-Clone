import { PlusIcon } from "@radix-ui/react-icons";
import { TooltipAction } from "../tooltip-action";

export function Navigation() {
  return (
    <div>
      <TooltipAction label="Add a server" align="center" side="right">
        <button className="group flex items-center">
          <span className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-blue-500">
            <PlusIcon className="group-hover:text-white transition text-blue-500 h-8 w-8" />
          </span>
        </button>
      </TooltipAction>
    </div>
  );
}
