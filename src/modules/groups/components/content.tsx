"use client";

import { DateTable } from "@/components/data-table";
import { SelectMenu } from "@/components/select-menu";

import { Toolbar } from "@/modules/groups/components/toolbar";

import { useGroupsTable } from "@/modules/groups/hooks/use-groups-table";

export const Content = () => {
  // TODO: Query year **?year=2025
  const year = new Date().getFullYear().toString();

  const { 
    table, 
    isLoading,
    globalFilter,
    setGlobalFilter
  } = useGroupsTable(year);

  if (isLoading) return null;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  }

  return (
    <div className="contents">
      <SelectMenu table={table} />
      <Toolbar value={globalFilter} onChange={onChange} />
      <DateTable table={table} />
    </div>
  );
}