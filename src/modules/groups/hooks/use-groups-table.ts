import { useMemo } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { filterDataByConditions } from "@/lib/utils";

import { useFilter } from "@/stores/use-filter";

import { columns } from "@/modules/groups/components/columns";

import { useGetGroupsByYear } from "@/modules/groups/api/use-get-groups-by-year";

export const useGroupsTable = (year: string) => {
  const { selectedColumns } = useFilter();
  const { data, isLoading } = useGetGroupsByYear(year);

  const filteredData = useMemo(() => {
    if (!data) return [];

    return filterDataByConditions(data, selectedColumns);
  }, [data, selectedColumns]);

  const table = useReactTable({
    columns,
    data: filteredData,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    isLoading,
    table,
  };
}