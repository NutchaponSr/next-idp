import React from "react";

import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";
import { IconVariant } from "@/types/icon";
import { FilterData } from "@/types/filter";

interface FilterDropdownMenuProps {
  label: string;
  icon: React.ElementType;
  data: FilterData;
  isFilter: boolean;
}

export const FilterDropdownMenu = ({
  label,
  icon,
  data,
  isFilter
}: FilterDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={isFilter ? "filterAct1" : "filter"} size="filter" className="gap-1 text-xs">
          {React.createElement(icon, { className: cn(isFilter ? "text-[#2383e2]" : "text-[#7c7c78]", "size-[14px]"), variant: IconVariant.STROKE })}
          <span className="max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
            {label}
          </span>
          <ChevronDownIcon className={cn("size-3", isFilter ? "text-[#2383e2]" : "text-[#b9b9b7]")}/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-60">
        {data.map((item) => (
          <DropdownMenuItem key={item.id} className="hover:bg-[#37352f0f]" onClick={() => {
            if (item.onClick) item.onClick(item.id);
          }}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}