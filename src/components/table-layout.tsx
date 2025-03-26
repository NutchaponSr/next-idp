import React from "react";

import { ColumnProps } from "@/types/filter";

import { useTable } from "@/stores/use-table";

import { TableComponents } from "@/components/table-components";

import { GroupingComponents } from "@/components/layouts/grouping/grouping-components";

interface TableLayoutProps<T extends { id: string }> {
  data: T[];
  searchQuery: string;
  columns: ColumnProps<T>[];
  isOpenToolbar: boolean;
  renderCell: (cell: T, column: ColumnProps<T>, searchQuery: string) => JSX.Element | undefined;
}

export const TableLayout = <T extends { id: string }>({ ...props }: TableLayoutProps<T>) => {
  const { groupingSelect } = useTable();

  return (
    <div className="grow shrink-0 flex flex-col relative">
      <div className="h-full relative float-left min-w-full lining-nums pb-[180px] px-24">
        {groupingSelect 
          ? <GroupingComponents {...props} /> 
          : <TableComponents {...props} />
        }
      </div>
    </div>
  );
  
}