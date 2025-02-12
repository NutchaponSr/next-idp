import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { FilterButton } from "@/components/filter-button";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { IconVariant } from "@/types/icon";

interface FilterDropdownMenuProps {
  label: string;
  icon: React.ElementType;
}

export const FilterDropdownMenu = ({
  label,
  icon
}: FilterDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="filter" size="filter" className="gap-1 text-xs">
          {React.createElement(icon, { className: "text-[#7c7c78] size-[14px]", variant: IconVariant.STROKE })}
          <span className="max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
            {label}
          </span>
          <ChevronDownIcon className="size-3 text-[#b9b9b7]"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          Click
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}