import React from "react";

import { ColumnProps } from "@/types/filter";

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

interface TableFilterProps<T extends object> {
  isOpen: boolean;
  columns: ColumnProps<T>[];
  children: React.ReactNode;
  addColumn: (filter: ColumnProps<T>) => void;
  onClose: () => void;
  onOpenSort: () => void;
}

export const TableSort = <T extends object>({
  isOpen,
  columns,
  children,
  addColumn,
  onClose,
  onOpenSort
}: TableFilterProps<T>) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <Popover open={isOpen} onOpenChange={onClose}>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              {children}
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="top" className="py-1 px-2">
            <p className="text-xs font-medium">Sort</p>
          </TooltipContent>
          <PopoverContent className="p-0 w-60" align="end">
            <Command>
              <CommandInput placeholder="Sort by..." />
              <CommandList>
                <CommandEmpty>No results</CommandEmpty>
                <CommandGroup>
                  {columns.map((column, index) => (
                    <CommandItem 
                      key={index}
                      className="px-2"
                      onSelect={() => {
                        onClose();
                        onOpenSort();
                        addColumn(column);
                      }}
                    >
                      {React.createElement(column.icon, { className: "h-4 w-4 text-primary" })}
                      {String(column.label)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </Tooltip>
    </TooltipProvider>
  );
}