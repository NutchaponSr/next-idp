"use client";

import { Layouts } from "@/components/layouts";
import { SelectMenu } from "@/components/select-menu";

import { Toolbar } from "@/modules/groups/components/toolbar";

import { useGroupsTable } from "@/modules/groups/hooks/use-groups-table";
import { useLayout } from "@/stores/use-layout";

export const Content = () => {
  // TODO: Query year **?year=2025
  const year = new Date().getFullYear().toString();

  const { 
    table, 
    isLoading,
    globalFilter,
    onChangeSearch
  } = useGroupsTable(year);
  const { mode } = useLayout();

  if (isLoading) return null;

  return (
    <div className="contents">
      <SelectMenu table={table} />
      <Toolbar value={globalFilter} onChange={onChangeSearch} />
      <Layouts table={table} mode={mode} />
      <div className="px-24 border-t border-[#e9e9e7] h-3" />
    </div>
  );
}