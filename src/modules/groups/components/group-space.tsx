import { 
  DotIcon, 
  PlusIcon
} from "lucide-react";
import { toast } from "sonner";
import React, { useCallback, useState } from "react";


import { Skeleton } from "@/components/ui/skeleton";

import { 
  CalendarDaysIcon, 
  HashIcon 
} from "@/components/icons";
import { Hint } from "@/components/hint";

import { Content } from "@/modules/dashboard/components/content";
import { GroupActions } from "@/modules/groups/components/group-actions";
import { IconWrapper } from "@/modules/dashboard/components/icon-wrapper";

import { useGetGroups } from "@/modules/groups/api/use-get-groups";
import { useCreateGroup } from "@/modules/groups/api/use-create-group";
import { SiderbarItem } from "@/modules/dashboard/components/sidebar-item";
import { useGroupYear } from "../stores/use-group-year";
import { useGroupItem } from "../stores/use-group-item";

export const GroupSpace = () => {
  const { 
    data: groups,
    isPending: loadingGroups,
  } = useGetGroups();
  const { on: onYear, toggle: toggleYear } = useGroupYear();
  const { on: onItem, toggle: toggleItem } = useGroupItem();
  const { mutate: createGroup } = useCreateGroup();

  const currentYear = new Date().getFullYear();
  
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const onCreate = useCallback(() => {
    toast.loading("Creating group...", { id: "create-group" });
    createGroup({
      json: {
        name: null,
        icon: null,
        year: selectedYear.toString(),
      }
    })
  }, [createGroup, selectedYear]);

  const initialGroups = groups?.filter((group) => group.year === selectedYear.toString()) || [];

  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  
  if (loadingGroups) {
    return (
      <div className="flex items-center min-h-[30px] p-1">
        <IconWrapper.Skeleton />
        <Skeleton className="h-2.5 w-full rounded-full mr-1" />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col">
      {years.map((year) => (
        <React.Fragment key={year}>
          <SiderbarItem
            label={String(year)}
            isOpen={onYear[year]}
            onToggle={() => toggleYear(year)}
            background="default"
            icon={CalendarDaysIcon}
            indent="pl-3"
            actions={
              <Hint label="Create a new group" side="right" sideOffset={6}>
                <button className="transition flex items-center ml-auto justify-center size-6 rounded-sm hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e]">
                  <PlusIcon className="size-[18px] text-[#91918e]" />
                </button>
              </Hint>
            }
          />
          <Content isOpen={onYear[year]}>
            {initialGroups.map((group) => (
              <React.Fragment key={group.id}>
                <SiderbarItem
                  label={group.name}
                  isOpen={onItem[group.id]}
                  indent="pl-5"
                  background="none"
                  onToggle={() => toggleItem(group.id)}
                  actions={
                    <Hint label="Delete, duplicate, and more..." side="right" sideOffset={6}>
                      <GroupActions />
                    </Hint>
                  }
                >
                  {group.icon ? group.icon : <HashIcon className="size-[18px] text-[#91918e]" />}
                </SiderbarItem>
                <Content isOpen={onItem[group.id]}>
                  <button className="flex items-center hover:bg-[#00000008] min-h-[30px] h-[30px] p-1 pl-7 w-full">
                    <DotIcon className="size-6" />
                    <div className="whitespace-nowrap overflow-hidden text-ellipsis text-start text-sm w-full">
                      Competency
                    </div>
                  </button>
                  <button className="flex items-center hover:bg-[#00000008] min-h-[30px] h-[30px] p-1 pl-7 w-full">
                    <DotIcon className="size-6" />
                    <div className="whitespace-nowrap overflow-hidden text-ellipsis text-start text-sm w-full">
                      Employee
                    </div>
                  </button>
                </Content>
              </React.Fragment>
            ))}
          </Content>
        </React.Fragment>
      ))}
      <div>
        More detail...
      </div>
    </div>
  );
}