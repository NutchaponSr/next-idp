"use client";

import { useCallback, useState } from "react";

import { Layouts } from "@/components/layouts";

import { GroupCell } from "@/modules/groups/components/render-cell";

import { Toolbar } from "../../../components/toolbar";
import { useGroupsTable } from "@/modules/groups/hooks/use-groups-table";
import { SelectMenu } from "@/components/select-menu";

export const Content = () => {
  // TODO: Query year **?year=2025
  const year = new Date().getFullYear().toString();

  const {
    data,
    columns,
    isLoading,
    searchQuery,
    isOpenToolbar,
    setSearchQuery
  } = useGroupsTable(year);

  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  
  const selectRow = useCallback((key: string) => {
    setSelectedRows((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const selectAll = useCallback(() => {
    const allSelected = data.every((item) => selectedRows[item.id]);
    
    if (allSelected) {
      setSelectedRows({});
    } else {
      const newSelectedRow: Record<string, boolean> = {};
      data.forEach((item) => { newSelectedRow[item.id] = true; });
      setSelectedRows(newSelectedRow);
    }
  }, [data, selectedRows]);
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  if (isLoading) return null;

  const selectedData = data.filter(item => selectedRows[item.id]);
  
  return (
    <div className="contents">
      <SelectMenu selectedData={selectedData} />
      <Toolbar 
        value={searchQuery} 
        onChange={onChange} 
        columns={columns} 
      />
      <Layouts 
        data={data} 
        renderCell={(cell, column, searchQuery) => (
          <GroupCell {...{ cell, column, searchQuery }} />
        )} 
        isOpenToolbar={isOpenToolbar}
        searchQuery={searchQuery}
        columns={columns.filter((col) => !col.isHide)} 
        selectedRows={selectedRows}
        selectRow={selectRow}
        selectAll={selectAll}
      />
      <div className="px-24 border-t border-[#e9e9e7] h-3" />
    </div>
  );
}