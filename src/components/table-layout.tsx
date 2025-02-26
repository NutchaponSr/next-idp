import React from "react";

import { ColumnProps } from "@/types/filter";

import { RenderCell } from "@/components/render-cell";

interface TableLayoutProps<T extends object> {
  data: T[];
  columns: ColumnProps<T>[];
}

export const TableLayout = <T extends object>({
  data,
  columns,
}: TableLayoutProps<T>) => {
  return (
    <div className="grow shrink-0 flex flex-col relative">
      <div className="h-full relative float-left min-w-full select-none lining-nums pb-[180px] px-24">
        <div className="relative">
          {/* Header */}
          <div className="h-[34px] relative">
            <div className="flex h-[34px] text-[#37352fa6] shadow-[inset_0_-1px_0_rgb(233,233,231),inset_0_1px_0_rgb(233,233,231)] min-w-[calc(100%-192px)] left-0 right-0 relative box-border">
              {columns.map((column, index) => (
                <div 
                  key={index} 
                  className="flex shrink-0 overflow-hidden text-sm" 
                  style={{ width: `${column.width}px` }}
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
                        className="flex h-full overflow-hidden" 
                        style={{ width: `${column.width}px` }}
                      >
                        <RenderCell item={item} column={column} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}