import { useMemo } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { filterDataByConditions, sortDataByColumns } from "@/lib/utils";

import { useSort } from "@/stores/use-sort";
import { useFilter } from "@/stores/use-filter";

import { columns } from "@/modules/groups/components/columns";

import { useGetGroupsByYear } from "@/modules/groups/api/use-get-groups-by-year";

export const useGroupsTable = (year: string) => {
  const { selectedColumns: sortColumns } = useSort();
  const { selectedColumns: filterColumns } = useFilter();
  const { data, isLoading } = useGetGroupsByYear(year);

  const filteredData = useMemo(() => {
    if (!data) return [];

    return filterDataByConditions(data, filterColumns);
  }, [data, filterColumns]);

  const sortedData = useMemo(() => {
    return sortDataByColumns(filteredData, sortColumns);
  }, [filteredData, sortColumns]);

  const table = useReactTable({
    columns,
    data: sortedData,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    isLoading,
    table,
  };
}