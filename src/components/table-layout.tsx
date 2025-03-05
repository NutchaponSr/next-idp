import React from "react";

import { ColumnProps } from "@/types/filter";

import { useTable } from "@/stores/use-table";

import { GroupingHeader } from "@/components/grouping-header";

import { TableRows } from "@/components/layouts/table/table-row";
import { TableFooter } from "@/components/layouts/table/table-footer";
import { TableHeader } from "@/components/layouts/table/table-header";
import { Accordion } from "./accordion";

interface TableLayoutProps<T extends { id: string }> {
  data: T[];
  searchQuery: string;
  columns: ColumnProps<T>[];
  isOpenToolbar: boolean;
  renderCell: (cell: T, column: ColumnProps<T>, searchQuery: string) => JSX.Element | undefined;
}

export const TableLayout = <T extends { id: string }>({
  data,
  columns,
  searchQuery,
  isOpenToolbar,
  renderCell
}: TableLayoutProps<T>) => {
  const {
    groupingSelect,
    groupingHeaders,
    selectRows,
  } = useTable();

  const renderTable = (data: T[], group?: string) => {
    const ids = data.map((row) => row.id);
    const allSelected = ids.every((id) => selectRows.has(id))

    return (
      <div className="relative">
        <TableHeader
          ids={ids}
          columns={columns}
          isOpenToolbar={isOpenToolbar}
          allSelected={allSelected}
        />
        <TableRows 
          data={data}
          columns={columns}
          searchQuery={searchQuery}
          renderCell={renderCell}
        />
        <TableFooter 
          columns={columns}
          data={data}
        />
      </div>
    );
  }

  const renderGroup = () => {
    const sortedGroups = Object.entries(groupingHeaders)
      .filter(([, header]) => header.isShow)
      .sort(([, a], [, b]) => a.order - b.order)
      .map(([key]) => key)

    return (
      <div className="flex flex-col space-y-2.5">
        {sortedGroups.map((group) => {
          const groupData = groupingSelect 
            ? data.filter((item) => item[groupingSelect.label as keyof T] === group) 
            : []

          return (
            <div key={group} className="w-full border-t border-[#e9e9e7] group/grouping">
              <GroupingHeader header={group} count={groupData.length} />
              <Accordion isOpen={groupingHeaders[group].isOpen}>
                {renderTable(groupData, group)}
              </Accordion>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grow shrink-0 flex flex-col relative">
      <div className="h-full relative float-left min-w-full select-none lining-nums pb-[180px] px-24">
        {groupingSelect 
          ? renderGroup() 
          : renderTable(data)}
      </div>
    </div>
  );
}