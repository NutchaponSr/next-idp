import React from "react";

import { ColumnProps } from "@/types/filter";

import { TableRows } from "@/components/layouts/table/table-row";
import { TableFooter } from "@/components/layouts/table/table-footer";
import { TableHeader } from "@/components/layouts/table/table-header";

interface TableLayoutProps<T extends { id: string }> {
  data: T[];
  searchQuery: string;
  columns: ColumnProps<T>[];
  isOpenToolbar: boolean;
  selectedRows: Record<string, boolean>;
  selectAll: () => void;
  selectRow: (key: string) => void;
  renderCell: (cell: T, column: ColumnProps<T>, searchQuery: string) => JSX.Element | undefined;
}

export const TableLayout = <T extends { id: string }>({ ...props }: TableLayoutProps<T>) => {
  return (
    <div className="grow shrink-0 flex flex-col relative">
      <div className="h-full relative float-left min-w-full select-none lining-nums pb-[180px] px-24">
        <div className="relative">
          <TableHeader {...props} />
          <TableRows {...props} />
          <TableFooter 
            columns={props.columns}
            data={props.data}
          />
        </div>
      </div>
    </div>
  );
}