import React from "react";

import { MoreHorizontalIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { ColumnProps } from "@/types/filter";

import { useTable } from "@/stores/use-table";
import { useSettings } from "@/stores/use-settings";

import { Checkbox } from "@/components/ui/checkbox";

interface TableHeaderProps<T extends { id: string }> {
  ids: string[];
  columns: ColumnProps<T>[];
  isOpenToolbar: boolean;
  allSelected: boolean;
}

export const TableHeader = <T extends { id: string }>({
  ids,
  columns,
  isOpenToolbar,
  allSelected,
}: TableHeaderProps<T>) => {
  const { toggleAllSelection } = useTable();
  const { showVerticalLine } = useSettings();

  return (
    <div className="h-[34px] relative">
      <div className={cn(
        "flex h-[34px] text-[#37352fa6] left-0 right-0 relative box-border",
        isOpenToolbar ? "shadow-[inset_0_-1px_0_rgb(233,233,231)]" : "shadow-[inset_0_-1px_0_rgb(233,233,231),inset_0_1px_0_rgb(233,233,231)] min-w-[calc(100%-192px)]",
      )}>
        {/* Selector */}
        <div className="sticky -left-8 z-[83] flex">
          <div className="absolute -left-8">
            <div className={cn(
              "hover:opacity-100 transition",
              allSelected ? "opacity-100" : "opacity-0",
            )}>
              <div className="h-full items-start justify-center flex cursor-pointer">
                <div className="size-8 flex items-center justify-center">
                  <Checkbox 
                    checked={allSelected}
                    onCheckedChange={() => toggleAllSelection(ids)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Columns */}
        {columns.map((column, index) => (
          <div 
            key={index} 
            style={{ width: `${column.width}px` }}
            className={cn(
              "flex shrink-0 overflow-hidden text-sm",
              showVerticalLine && "border-r border-[#e9e9e7]",
              isOpenToolbar ? "border-none" : "border-r border-[#e9e9e7]",
            )} 
          >
            <div role="button" className="transition flex items-center w-full h-full px-2 hover:bg-[#37352f0f]">
              <div className="flex items-center leading-[120%] text-sm flex-auto">
                <div className="mr-1 grid justify-center items-center">
                  <div className="flex items-center justify-center size-6">
                    {React.createElement(column.icon, { className: "size-4 shrink-0 text-[#9A9A97]" })}
                  </div>
                </div>
                <h1 className="whitespace-nowrap overflow-hidden text-ellipsis capitalize">
                  {String(column.label)}
                </h1>
              </div>
            </div>
          </div>
        ))}
        <div className="flex">
          <button className="transition flex justify-start grow w-8 hover:bg-[#37352f0f]">
            <div className="flex w-8 h-full items-center justify-center">
              <MoreHorizontalIcon className="size-4 text-[#9a9a97]" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}