import React, { useState } from "react";

import { 
  ChevronDownIcon,
  GripVerticalIcon, 
  MoreHorizontalIcon, 
  PlusIcon
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ColumnProps } from "@/types/filter";

import { useSettings } from "@/stores/use-settings";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

interface TableLayoutProps<T extends { id: string }> {
  data: T[];
  searchQuery: string;
  columns: ColumnProps<T>[];
  selectedRows: Record<string, boolean>;
  selectAll: () => void;
  selectRow: (key: string) => void;
  renderCell: (cell: T, column: ColumnProps<T>, searchQuery: string) => JSX.Element | undefined;
}

export const TableLayout = <T extends { id: string }>({
  data,
  columns,
  searchQuery,
  selectedRows,
  selectAll,
  selectRow,
  renderCell
}: TableLayoutProps<T>) => {
  const { showVerticalLine } = useSettings();

  const [active, setActive] = useState<Record<number, boolean>>({});

  return (
    <div className="grow shrink-0 flex flex-col relative">
      <div className="h-full relative float-left min-w-full select-none lining-nums pb-[180px] px-24">
        <div className="relative">
          {/* Header */}
          <div className="h-[34px] relative">
            <div className="flex h-[34px] text-[#37352fa6] shadow-[inset_0_-1px_0_rgb(233,233,231),inset_0_1px_0_rgb(233,233,231)] min-w-[calc(100%-192px)] left-0 right-0 relative box-border">
              {/* Selector */}
              <div className="sticky -left-8 z-[83] flex">
                <div className="absolute -left-8">
                  <div className={cn(
                    "hover:opacity-100 transition",
                    data.every((item) => selectedRows[item.id]) ? "opacity-100" : "opacity-0",
                  )}>
                    <div className="h-full items-start justify-center flex cursor-pointer">
                      <div className="size-8 flex items-center justify-center">
                        <Checkbox 
                          checked={data.length > 0 && data.every((item) => selectedRows[item.id])}
                          onCheckedChange={selectAll}
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
          {/* Cell */}
          <div className="relative w-full isolation-auto">
            <div style={{ height: `${data.length * 34}px` }} className="w-full relative shrink-0">
              {data.map((item, rowIndex) => (
                <div key={rowIndex} className="absolute left-0 top-0 w-full group" style={{ transform: `translateY(${rowIndex * 34}px)` }}>
                  <div className="flex h-[34px] border-b border-[#e9e9e7]">
                    {columns.map((column, colIndex) => (
                      <div 
                        key={colIndex} 
                        style={{ width: `${column.width}px` }}
                        className={cn(
                          "flex h-full relative",
                          showVerticalLine && "border-r border-[#e9e9e7]",
                        )} 
                      >
                        <div className="sticky -left-8 flex">
                          <div className="absolute -left-8">
                            <div className={cn(
                                "group-hover:opacity-100 h-full transition",
                                selectedRows[item.id] ? "opacity-100" : "opacity-0",
                              )}>
                              <div className="h-full items-start justify-center flex cursor-pointer">
                                <div className="h-8 w-8 flex items-center justify-center">
                                  <Checkbox 
                                    checked={selectedRows[item.id] || false}
                                    onCheckedChange={() => selectRow(item.id)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="sticky -left-[50px] flex">
                          <div className="absolute -left-[50px]">
                            <div className="group-hover:opacity-100 opacity-0 h-full transition">
                              <div className="h-full items-center justify-center flex cursor-pointer">
                                <div className="w-[18px] h-8 flex items-center justify-center">
                                  <button className="transition flex items-center justify-center w-[18px] h-6 rounded-sm hover:bg-[#37352f0f]">
                                    <GripVerticalIcon className="size-3.5 shrink-0 text-[#b9b9b7]" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {renderCell(item, column, searchQuery)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div role="button" className="transition flex items-center h-[34px] pl-2 leading-5 hover:bg-[#37352f0f]">
              <PlusIcon className="size-3.5 text-[#9a9a97] mr-2" />
              <span className="text-sm text-[#37352f80] inline-flex items-center sticky left-10">
                New page
              </span>
            </div>
            {/* Calculate */}
            <div className="h-12 w-full relative group">
              <div className="border-t border-[#e9e9e7] flex min-w-full">
                <div className="flex pr-8">
                  {columns.map(({ width }, index) => (
                    <div key={index} style={{ width: `${width}px` }} className="flex">
                      <DropdownMenu open={active[index]} 
                      onOpenChange={(open) => !open && setActive((prev) => ({ ...prev, [index]: false }))}>
                        <DropdownMenuTrigger asChild>
                          <button onClick={() => setTimeout(() => setActive((prev) => ({ ...prev, [index]: !prev[index] })), 10)} className="transition flex items-center justify-end w-full h-8 pr-2 overflow-hidden whitespace-nowrap hover:bg-[#37352f0f] focus-within:shadow-[inset_0_0_0_1px_rgba(35,131,226,0.57),0_0_0_2px_rgba(35,131,226,0.35)] outline-none">
                            <div className={cn(
                              "flex items-center group-hover:opacity-100 opacity-0 transition-opacity",
                              active[index] && "opacity-100"
                            )}>
                              <span className="text-[#37352f80] text-sm">
                                Calculate
                              </span>
                              <ChevronDownIcon className="size-3 ml-1 shrink-0 text-[#9a9a97]" />
                            </div>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[200px]">
                          <DropdownMenuItem>
                            None
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Count
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Percent
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}