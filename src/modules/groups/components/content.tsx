"use client";


import { Layouts } from "@/components/layouts";

import { GroupCell } from "@/modules/groups/components/render-cell";

import { Toolbar } from "../../../components/toolbar";
import { useGroupsTable } from "@/modules/groups/hooks/use-groups-table";

export const Content = () => {
  // TODO: Query year **?year=2025
  const year = new Date().getFullYear().toString();

  const {
    data,
    columns,
    isLoading,
    searchQuery,
    isOpenToolbar,
    setSearchQuery,
  } = useGroupsTable(year);
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }
  if (isLoading) return null;

  return (
    <div className="contents">
      {/* <SelectMenu selectedData={selectedData} /> */}
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
      />
      <div className="px-24 border-t border-[#e9e9e7] h-3" />
    </div>
  );
}