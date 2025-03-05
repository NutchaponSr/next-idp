import React from "react";

import { 
  GripVerticalIcon, 
  PlusIcon 
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ColumnProps } from "@/types/filter";

import { useSettings } from "@/stores/use-settings";

import { Checkbox } from "@/components/ui/checkbox";
import { useTable } from "@/stores/use-table";

interface TableRowsProps<T extends { id: string }> {
  data: T[];
  columns: ColumnProps<T>[];
  searchQuery: string;
  renderCell: (cell: T, column: ColumnProps<T>, searchQuery: string) => JSX.Element | undefined;
}

export const TableRows = <T extends { id: string }>({
  data,
  columns,
  searchQuery,
  renderCell
}: TableRowsProps<T>) => {
  const { showVerticalLine } = useSettings();
  const { selectRows, toggleRowSelection } = useTable();

  return (
    <div className="relative w-full isolation-auto">
      <div style={{ height: `${data.length * 34}px` }} className="w-full relative shrink-0">
        {data.map((item, rowIndex) => (
          <div key={rowIndex} className="absolute left-0 top-0 w-full group" style={{ transform: `translateY(${rowIndex * 34}px)` }}>
            <div className="sticky -left-8 flex">
              <div className="absolute -left-8">
                <div className={cn(
                    "group-hover:opacity-100 h-full transition",
                    selectRows.has(item.id) ? "opacity-100" : "opacity-0",
                  )}>
                  <div className="h-full items-start justify-center flex cursor-pointer">
                    <div className="h-8 w-8 flex items-center justify-center">
                      <Checkbox 
                        checked={selectRows.has(item.id)}
                        onCheckedChange={() => toggleRowSelection(item.id)}
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
                  {renderCell(item, column, searchQuery)}
                </div>
              ))}
            </div>
            {selectRows.has(item.id) && <div className="absolute inset-0 top-[0.75px] bottom-0 bg-[#2383e224] rounded-sm pointer-events-none" />}
          </div>
        ))}
      </div>
      <div role="button" className="transition flex items-center h-[34px] pl-2 leading-5 hover:bg-[#37352f0f]">
        <PlusIcon className="size-3.5 text-[#9a9a97] mr-2" />
        <span className="text-sm text-[#37352f80] inline-flex items-center sticky left-10">
          New page
        </span>
      </div>
    </div>
  );
};