import Image from "next/image";
import React, { useState } from "react";

import { ChevronDownIcon } from "lucide-react";

import { cn, calculateColumnValues } from "@/lib/utils";
import { CalculationType, ColumnProps } from "@/types/filter";
import { calculationPrefixes, calculations } from "@/constants/filters";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";

interface ColumnCalculation {
  type: CalculationType | null;
  result: string | null;
}

interface TableFooterProps<T extends { id: string }> {
  columns: ColumnProps<T>[];
  data: T[];
}

export const TableFooter = <T extends { id: string }>({
  columns,
  data
}: TableFooterProps<T>) => {
  const [active, setActive] = useState<Record<number, boolean>>(
    Object.fromEntries(columns.map((_, index) => [index, false])),
  );  

  const [calculatedValues, setCalculatedValues] = useState<Record<number, ColumnCalculation>>(
    Object.fromEntries(columns.map((_, index) => [index, { type: null, result: null }])),
  );

  const handleCalculate = (index: number, values: object[], type: CalculationType | null) => {
    const result = calculateColumnValues(values, type);
    setCalculatedValues(prev => ({
      ...prev,
      [index]: { type, result }
    }));
    setActive(prev => ({ ...prev, [index]: false }));
  }

  return (
    <div className="h-12 w-full relative group">
      <div className="border-t border-[#e9e9e7] flex min-w-full">
        <div className="flex pr-8">
          {columns.map((column, index) => {
            const values = data.map((item) => item[column.label]) as object[]; 
            return (
              <div key={index} style={{ width: `${column.width}px` }} className="flex">
                <DropdownMenu 
                  open={active[index]} 
                  onOpenChange={(open) => !open && setActive((prev) => ({ ...prev, [index]: false }))}
                >
                  <DropdownMenuTrigger asChild>
                    <button 
                      onClick={() => setTimeout(() => setActive((prev) => ({ ...prev, [index]: !prev[index] })), 10)} 
                      className="transition flex items-center justify-end w-full h-8 pr-2 overflow-hidden whitespace-nowrap hover:bg-[#37352f0f] focus-within:shadow-[inset_0_0_0_1px_rgba(35,131,226,0.57),0_0_0_2px_rgba(35,131,226,0.35)] outline-none"
                    >
                      <div className={cn(
                        "flex items-center group-hover:opacity-100 opacity-0 transition-opacity",
                        (active[index] || calculatedValues[index].result !== null) && "opacity-100"
                      )}>
                        {calculatedValues[index]?.type && (
                          <span className="text-[10px] uppercase tracking-wider text-[#37352fa6] mr-1 mt-px font-light">
                            {calculationPrefixes[calculatedValues[index].type]}
                          </span>
                        )}
                        {calculatedValues[index].result ? (
                          <span className="text-sm text-primary">
                            {calculatedValues[index].result }
                          </span>
                        ) : (
                          <span className="text-[#37352f80] text-sm">
                            Calculate
                          </span>
                        )}
                        <ChevronDownIcon className="size-3 ml-1 shrink-0 text-[#9a9a97]" />
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[200px]">
                    <DropdownMenuItem onClick={() => handleCalculate(index, values, null)}>
                      None
                    </DropdownMenuItem>
                    {calculations.map((group, i) => (
                      <DropdownMenuSub key={group.label}>
                        <DropdownMenuSubTrigger>{group.label}</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="w-[250px]">
                          {i === 0 && (
                            <>
                              <div role="menuitem" className="transition cursor-pointer w-full flex rounded-md hover:bg-[#37352f0f]">
                                <div className="flex items-start gap-2 w-full leading-[120%] min-h-11 text-sm p-2">
                                  <div className="flex-auto">
                                    <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                                      Show large counts as 99+
                                    </div>
                                    <div className="text-[#787774] whitespace-normal overflow-hidden text-ellipsis mt-1.5 text-xs">
                                      This improves performance for large databases.
                                    </div>
                                  </div>
                                  <div className="ml-auto flex-auto">
                                    <div className="flex p-0.5">
                                      <Switch />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <DropdownMenuSeparator />
                            </>
                          )}
                          {group.options.map((option) => (
                            <TooltipProvider delayDuration={100} key={option.label}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <DropdownMenuItem  onClick={() => handleCalculate(index, values, option.type)}>
                                    {option.label}
                                  </DropdownMenuItem>
                                </TooltipTrigger>
                                <TooltipContent align="center" side="right" className="w-[160px] p-1.5">
                                  <div className="flex flex-col space-y-1">
                                    <Image 
                                      src={option.image ?? ""}
                                      alt={option.label}
                                      width={160}
                                      height={160}
                                      className="object-contain rounded-sm"
                                    />
                                    <p className="text-xs font-medium">
                                      {option.description}
                                    </p>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};