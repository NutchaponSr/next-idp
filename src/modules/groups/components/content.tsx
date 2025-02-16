"use client";

import { DateTable } from "@/components/data-table";

import { Toolbar } from "@/modules/groups/components/toolbar";

import { useGroupsTable } from "@/modules/groups/hooks/use-groups-table";

export const Content = () => {
  // TODO: Query year **?year=2025
  const { table, isLoading } = useGroupsTable("2025");

  if (isLoading) return null;

  return (
    <div className="contents">
      <Toolbar />
      <DateTable table={table} />
    </div>
  );
}