import React from "react";

import { 
  ChevronDownIcon,
  MoreHorizontalIcon 
} from "lucide-react";

import { cn } from "@/lib/utils";
import { IconVariant } from "@/types/icon";
import { FilterCondition } from "@/types/filter";
import { filterConditions } from "@/constants/filters";

import { useFilterTable } from "@/stores/use-filter-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { TrashIcon } from "@/components/icons";
import { ClearableInput } from "@/components/clearable-input";

interface ColumnTextProps {
  label: string;
  icon: React.ElementType;
  isFilter: boolean;
  searchQuery: string;
  condition: FilterCondition;
}

export const ColumnText = ({ 
  label, 
  icon,
  isFilter,
  searchQuery, 
  condition, 
}: ColumnTextProps) => {
  const { 
    deleteColumn, 
    onCondition,
    onSearchQuery 
  } = useFilterTable();

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={isFilter ? "filterAct1" : "filter"} size="filter" className="gap-1 text-xs">
          {React.createElement(icon, { className: cn(isFilter ? "text-[#2383e2]" : "text-[#7c7c78]", "size-[14px]"), variant: IconVariant.STROKE })}
          <span className={cn(
            "max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis",
            isFilter && "font-semibold",
          )}>
            {label}{isFilter && ":"} 
            {isFilter && (
              <span className="font-normal">
                {" " + searchQuery}
              </span>
            )}
          </span>
          <ChevronDownIcon className={cn("size-3", isFilter ? "text-[#2383e2]" : "text-[#b9b9b7]")}/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0" align="start">
        <div className="p-1 px-2 flex items-center text-[#37352f80] text-xs gap-0.5">
          <span className="text-ellipsis whitespace-nowrap overflow-hidden">{String(label)}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="xxs" variant="ghostFlow" className="text-[#37352fa6] hover:text-[#37352fa6] font-semibold">
                {condition}
                <ChevronDownIcon className="size-3 text-[#9A9A97]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              {Object.values(filterConditions).map((condition) => (
                <DropdownMenuItem 
                  key={condition.label} 
                  onClick={() => onCondition(label, condition.value)}
                >
                  {condition.label}
                </DropdownMenuItem> 
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="xxsIcon" variant="ghostFlow" className="ml-auto">
                <MoreHorizontalIcon className="size-4 text-[#9A9A97]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="w-[220px]">
              <DropdownMenuItem className="group focus:text-destructive" onClick={() => deleteColumn(label)}>
                <TrashIcon className="size-4 text-[#37352f] group-focus:text-destructive transition-colors" />
                Delete filter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="p-2 pt-1">
          <ClearableInput 
            area="sm" 
            value={searchQuery}
            variant="search" 
            placeholder="Type a value..."
            onChange={(e) => onSearchQuery(label, e.target.value)}
            onClear={() => onSearchQuery(label, "")}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}