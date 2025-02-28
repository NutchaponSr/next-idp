import React from "react";

import { ColumnProps } from "@/types/filter";

import { TableRows } from "@/components/layouts/table/table-row";
import { TableFooter } from "@/components/layouts/table/table-footer";
import { TableHeader } from "@/components/layouts/table/table-header";

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
  return (
    <div className="grow shrink-0 flex flex-col relative">
      <div className="h-full relative float-left min-w-full select-none lining-nums pb-[180px] px-24">
        <div className="relative">
          <TableHeader 
            columns={columns}
            data={data}
            selectedRows={selectedRows}
            selectAll={selectAll}
          />
          <TableRows 
            data={data}
            columns={columns}
            searchQuery={searchQuery}
            selectedRows={selectedRows}
            selectRow={selectRow}
            renderCell={renderCell}
          />
          <TableFooter 
            columns={columns}
            data={data}
          />
        </div>
      </div>
    </div>
  );
}