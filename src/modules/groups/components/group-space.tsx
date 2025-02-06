import { toast } from "sonner";
import { PlusIcon } from "lucide-react";
import React, { useCallback } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { CalendarDaysIcon } from "@/components/icons";
import { Hint } from "@/components/hint";

import { GroupItem } from "@/modules/groups/components/group-item";
import { SidebarItem } from "@/modules/dashboard/components/sidebar-item";

import { useGetGroups } from "@/modules/groups/api/use-get-groups";
import { useCreateGroup } from "@/modules/groups/api/use-create-group";
import { useSidebarToggle } from "@/modules/dashboard/stores/use-sidebar-toggle";

export const GroupSpace = () => {
  const { 
    data: groups,
    isPending: loadingGroups,
  } = useGetGroups();
  const { on, toggle } = useSidebarToggle();
  const { mutate: createGroup } = useCreateGroup();

  const currentYear = new Date().getFullYear();

  const onCreate = useCallback((year: string) => {
    toast.loading("Creating group...", { id: "create-group" });
    createGroup({
      json: {
        year,
        name: "Untitled",
        icon: null,
      }
    })
  }, [createGroup]);

  const years = Array.from({ length: 5 }, (_, i) => String(currentYear - i));
  
  if (loadingGroups) {
    return (
      Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="flex items-center min-h-[30px] p-1">
          <SidebarItem.Skeleton key={i} />
          <Skeleton className="h-2.5 w-full rounded-full mr-1" />
        </div>
      ))
    );
  }
  
  return (
    <div className="flex flex-col">
      {years.map((year) => {
        const initialGroups = groups?.filter((group) => group.year === year) || [];

        return (
          <SidebarItem 
            key={year}
            label={year}
            isOpen={on[year]} 
            onToggle={() => toggle(year)} 
            icon={CalendarDaysIcon}
            href={`/groups?year=${year}`}
            background="default"
            indent="pl-3"
            actions={
              <Hint label="Create a new group" side="right" sideOffset={6}>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onCreate(year)
                  }} 
                  className="transition flex items-center ml-auto justify-center size-6 rounded-sm hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e]"
                >
                  <PlusIcon className="size-[18px] text-[#91918e]" />
                </button>
              </Hint>
            }
          >
            {initialGroups.length ? (
              initialGroups.map((group, index) => <GroupItem key={index} group={group} />)
            ) : (
              <div className="flex items-center min-h-[30px] p-1 pl-5 w-full text-sm">
                Not found result
              </div>
            )}
          </SidebarItem>
        );
      })}
      <button className="group/workspace flex items-center min-h-[30px] p-1 pl-3 text-[#91918e] hover:bg-[#00000008] w-full text-xs">
        More detail...
      </button>
    </div>
  );
}