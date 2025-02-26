import React from "react";

import { ColumnProps } from "@/types/filter";
import { PanelButton } from "./panel-button";

interface RenderCellProps<T extends object> {
  item: T;
  column: ColumnProps<T>;
}

export const RenderCell = <T extends object>({
  item,
  column
}: RenderCellProps<T>) => {
  const value = item[column.label];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emoji = (item as any)["icon"];

  switch (column.label) {
    case "name":
      return (
        <div role="button" className="transition relative block overflow-clip w-full whitespace-normal min-h-8 py-1.5 px-2">
          {emoji && (
            <div className="inline-flex items-center justify-center mr-1">
              <div className="flex items-center justify-center size-5">
                {emoji}
              </div>
            </div>
          )}  
          <span className="leading-[1.5] whitespace-pre-wrap break-words font-medium bg-gradient-to-r from-neutral-400/20 to-neutral-400/20 bg-repeat-x bg-[position:0_100%] bg-[size:100%_1px] text-primary text-sm">
            {value as React.ReactNode}
          </span>
          <div className="whitespace-normal relative hidden group-hover:block border">
            <div className="flex justify-end absolute -top-3 right-0 left-0 mr-1">
              <div className="flex pointer-events-auto sticky right-1">
                <PanelButton data={item} /> 
              </div>
            </div>
          </div>
        </div>
      );
  }
}