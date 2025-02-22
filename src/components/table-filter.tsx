import React from "react";

import { PlusIcon } from "lucide-react";

import { FilterColumnProps } from "@/types/filter";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface TableFilterProps<T extends object> {
  columns: FilterColumnProps<T>[];
  children: React.ReactNode;
  isOpen: boolean;
  tooltipOpen: boolean;
  onClose: () => void;
  openFilter: () => void;
  addColumn: (filter: FilterColumnProps<T>) => void;
}

export const TableFilter = <T extends object>({
  columns,
  children,
  isOpen,
  tooltipOpen,
  onClose,
  openFilter,
  addColumn,
}: TableFilterProps<T>) => {
  return (
    <TooltipProvider>
      <Tooltip open={tooltipOpen} delayDuration={100}>
        <Popover open={isOpen} onOpenChange={onClose}>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              {children}
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="top" className="py-1 px-2">
            <p className="text-xs font-medium">Filter</p>
          </TooltipContent>
          <PopoverContent className="p-0 w-60" align="end">
            <Command>
                <CommandInput placeholder="Filter by..." />
                <CommandList>
                  <CommandEmpty>No filters found.</CommandEmpty>
                  <CommandGroup>
                    {columns.map((column, index) => (
                      <CommandItem 
                        key={index} 
                        onSelect={() => {
                          onClose();
                          openFilter();
                          addColumn(column);
                        }} 
                        className="px-2"
                      >
                        {React.createElement(column.icon, { className: "h-4 w-4 text-primary" })}
                        {String(column.label)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            <div className="p-1 flex flex-col shadow-[0_-1px_0_rgba(55,53,47,0.09)]">
              <Button variant="ghost" size="sm" className="justify-start text-[#37352fa6] hover:text-[#37352fa6] px-2">
                <PlusIcon className="h-4 w-4 text-[#7c7c78]" />
                Add advanced filter
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </Tooltip>
    </TooltipProvider>
  );
}