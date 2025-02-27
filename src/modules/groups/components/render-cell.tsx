import React from "react";

import { highlightText } from "@/lib/utils";
import { ColumnProps } from "@/types/filter";

import { useSettings } from "@/stores/use-settings";

import { GroupPanelButton } from "@/modules/groups/components/group-panel-button";

import { ResponseType } from "@/modules/groups/api/use-get-groups-by-year";

interface GroupCellProps {
  cell: ResponseType,
  column: ColumnProps<ResponseType>,
  searchQuery: string,
}

export const GroupCell = ({
  cell,
  column,
  searchQuery
}: GroupCellProps): JSX.Element | undefined => {
  const emoji = cell["icon"];
  const value = cell[column.label];

  const { showIcon } = useSettings();

  switch (column.label) {
    case "name":
      return (
        <div role="button" className="transition relative block overflow-clip w-full whitespace-normal min-h-8 py-1.5 px-2">
          {(showIcon && emoji) && (
            <div className="inline-flex items-center justify-center mr-1">
              <div className="flex items-center justify-center size-5">
                {emoji}
              </div>
            </div>
          )}  
          <span className="leading-[1.5] whitespace-pre-wrap break-words font-medium bg-gradient-to-r from-neutral-400/20 to-neutral-400/20 bg-repeat-x bg-[position:0_100%] bg-[size:100%_1px] text-primary text-sm">
            {highlightText(value as string, searchQuery)}
          </span>
          <div className="flex justify-end absolute top-1 right-0 z-[20] mx-1 opacity-0 group-hover:opacity-100 transition">
            <GroupPanelButton group={cell} /> 
          </div>
        </div>
      );
  }
}