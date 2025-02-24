import React, { useMemo } from "react";

import { PlusIcon } from "lucide-react";

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
import { Button } from "@/components/ui/button";

interface TableFilterProps<T extends object> {
  columns: ColumnProps<T>[];
  children: React.ReactNode;
  isOpen?: boolean;
  showTooltip?: boolean;
  tooltipOpen?: boolean;
  align?: "start" | "center" | "end";
  onClose?: () => void;
  openFilter?: () => void;
  addColumn: (filter: ColumnProps<T>) => void;
}

export const TableFilter = <T extends object>({
  columns,
  children,
  isOpen,
  showTooltip,
  tooltipOpen,
  align = "end",
  onClose,
  openFilter,
  addColumn,
}: TableFilterProps<T>) => {
  const popoverContent = useMemo(() => (
    <PopoverContent className="p-0 w-60" align={align}>
      <Command>
          <CommandInput placeholder="Filter by..." />
          <CommandList>
            <CommandEmpty>No filters found.</CommandEmpty>
            <CommandGroup>
              {columns.map((column, index) => (
                <CommandItem 
                  key={index} 
                  onSelect={() => {
                    onClose?.();
                    openFilter?.();
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
        {/* TODO: Add advanced filter features */}
        <Button variant="ghost" size="sm" className="justify-start text-[#37352fa6] hover:text-[#37352fa6] px-2">
          <PlusIcon className="h-4 w-4 text-[#7c7c78]" />
          Add advanced filter
        </Button>
      </div>
    </PopoverContent>
  ), [
    addColumn,
    columns,
    onClose,
    openFilter,
    align
  ]);

  const triggerElement = <PopoverTrigger asChild>{children}</PopoverTrigger>

  return (
    <TooltipProvider>
      <Popover open={isOpen} onOpenChange={onClose}>
        {showTooltip ? (
          <Tooltip open={tooltipOpen} delayDuration={100}>
            <TooltipTrigger asChild>{triggerElement}</TooltipTrigger>
            <TooltipContent side="top" className="py-1 px-2">
              <p className="text-xs font-medium">Filter</p>
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