import { HashIcon } from "@/components/icons";
import { groups } from "@/db/schema";
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";
import { useGroupItem } from "../stores/use-group-item";
import React from "react";

interface GroupListProps {
  initialData: typeof groups.$inferSelect[]
}

export const GroupList = ({ initialData }: GroupListProps) => {
  const { isOpen, onToggle } = useGroupItem();

  return (
    initialData.map((group) => (
      <React.Fragment key={group.id}>
        <div className="group/workspace flex items-center min-h-[30px] hover:bg-[#00000008] w-full">
          <div className="flex items-center ml-9 w-full space-x-1">
            <div className="flex items-center justify-center shrink-0 grow-0 size-[22px] relative">
              <div className="grid">
                <div className="row-start-1 col-start-1 row-auto col-auto">
                  <div className="absolute inset-0 flex items-center justify-center rounded-sm transition-opacity duration-150 group-hover/workspace:opacity-0">
                    {group.icon 
                      ? group.icon
                      : <HashIcon className="size-[18px] text-[#91918e]" />
                    }
                  </div>
                  <div
                    role="button"
                    className="absolute inset-0 flex items-center justify-center rounded-sm bg-[#37352f0f] opacity-0 transition-opacity duration-100 group-hover/workspace:opacity-100"
                    onClick={() => onToggle(group.id)}
                  >
                    <ChevronRightIcon className="h-[18px] w-[18px] text-[#91918e]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="whitespace-nowrap overflow-hidden text-ellipsis text-sm w-full">
              {group.name}
            </div>
            <div className="flex items-center justify-center grow-0 shrink-0 h-full">
              <div className="group-hover/workspace:opacity-100 opacity-0 transition-opacity">
                <button className="transition flex items-center ml-auto mr-[5px] justify-center size-6 rounded-sm hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e]">
                  <MoreHorizontalIcon className="size-[18px] text-[#91918e]" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {isOpen[group.id] && (
          <p>
            Group item
          </p>
        )}
      </React.Fragment>
    ))
  );
}