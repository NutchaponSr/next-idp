import React, { useMemo } from "react";

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
  isOpen?: boolean;
  showTooltip?: boolean;
  columns: ColumnProps<T>[];
  children: React.ReactNode;
  align?: "start" | "center" |"end";
  addColumn: (filter: ColumnProps<T>) => void;
  onClose?: () => void;
  onOpenSort?: () => void;
}

export const TableSort = <T extends object>({
  isOpen,
  showTooltip,
  columns,
  children,
  align = "end",
  addColumn,
  onClose,
  onOpenSort
}: TableFilterProps<T>) => {
  const popoverContent = useMemo(() => (
    <PopoverContent className="p-0 w-60" align={align}>
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
                  onClose?.();
                  onOpenSort?.();
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
  ), [columns, onClose, onOpenSort, addColumn, align]);

  const triggerElement = <PopoverTrigger asChild>{children}</PopoverTrigger>

  return (
    <TooltipProvider>
      <Popover open={isOpen} onOpenChange={onClose}>
        {showTooltip ? (
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>{triggerElement}</TooltipTrigger>
            <TooltipContent side="top" className="py-1 px-2">
              <p className="text-xs font-medium">Sort</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          triggerElement
        )}
        {popoverContent}
      </Popover>
    </TooltipProvider>
  );
}