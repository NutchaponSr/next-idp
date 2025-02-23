import React, { useState } from "react";

import { 
  ArrowUpIcon,
  ChevronDownIcon, 
  GripVerticalIcon, 
  PlusIcon, 
  XIcon
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useSort } from "@/stores/use-sort";

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

import { TableSort } from "@/components/table-sort";
import { sorts } from "@/types/filter";
import { TrashIcon } from "./icons";



export const SortColumns = () => {
  const {
    columns,
    selectedColumns,
    addColumn,
    onSortOrder,
  } = useSort();

  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (label: string) => {
    setOpen((prev) => ({
      ...prev,
      [label]: !prev[label], 
    }));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="filter" size="filter" className="gap-1 text-xs">
          <ArrowUpIcon className="text-[#7c7c78] size-[14px]" />
          <span className={cn(
            "max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis",
          )}>
            {String(selectedColumns[0].label)} 
          </span>
          <ChevronDownIcon className={cn("size-3 text-[#b9b9b7]")}/>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="max-w-[calc(100vw-24px)] p-0">
        <div className="flex flex-col py-2">
          {selectedColumns.map((column, index) => (
            <div key={index} className="flex items-center min-h-7 text-sm mx-2">
              <div className="flex items-center justify-center size-7 cursor-grab">
                <GripVerticalIcon className="size-4 text-[#9a9a97]" />
              </div>
              <div className="mx-2 flex-auto">
                <div className="flex items-center space-x-2 whitespace-nowrap overflow-hidden text-ellipsis">
                  <TableSort 
                    isOpen={open[String(column.label)]}
                    columns={columns}
                    addColumn={addColumn}
                    onClose={() => toggle(String(column.label))}
                    onOpenSort={() => {}}
                  >
                    <Button size="sm" variant="gray" className="gap-1.5">
                      <div className="flex items-center space-x-1">
                        {React.createElement(column.icon, { className: "text-[#7c7c78] size-4" })}
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis capitalize">
                          {String(column.label)}
                        </span>
                      </div>
                      <ChevronDownIcon className="size-3 text-[#b9b9b7]" />
                    </Button>
                  </TableSort>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="gray" className="gap-1.5">
                        <div className="flex items-center space-x-1">
                          <span className="whitespace-nowrap overflow-hidden text-ellipsis capitalize">
                            {column.sortOrder?.label}
                          </span>
                        </div>
                        <ChevronDownIcon className="size-3 text-[#b9b9b7]" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {Object.values(sorts).map((sort) => (
                        <DropdownMenuItem 
                          key={sort.label} 
                          onClick={() => onSortOrder(String(column.label), sort.value)}
                        >
                          {sort.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="ml-auto shrink-0">
                <Button variant="ghost" size="icon">
                  <XIcon className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-1 flex flex-col">
          <Button variant="ghost" size="sm" className="justify-start text-[#37352fa6] hover:text-[#37352fa6] px-2">
            <PlusIcon className="h-4 w-4 text-[#7c7c78]" />
            Add sort
          </Button>
          <Button variant="ghost" size="sm" className="justify-start text-[#37352fa6] hover:text-destructive px-2 group">
            <TrashIcon className="h-4 w-4 text-[#7c7c78] group-hover:text-destructive transition-colors" />
            Delete sort
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}