import { useMemo } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { useGetGroupsByYear } from "@/modules/groups/api/use-get-groups-by-year";
import { columns } from "../components/columns";
import { useFilterTable } from "@/stores/use-filter-table";
import { filterDataByConditions } from "@/lib/utils";

export const useGroupsTable = (year: string) => {
  const { selectedColumns } = useFilterTable();
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