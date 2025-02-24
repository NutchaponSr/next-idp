import { 
  getCoreRowModel, 
  getFilteredRowModel, 
  useReactTable 
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { filterDataByConditions, sortDataByColumns } from "@/lib/utils";

import { useSort } from "@/stores/use-sort";
import { useFilter } from "@/stores/use-filter";

import { getColumns } from "@/modules/groups/components/columns";

import { useGetGroupsByYear } from "@/modules/groups/api/use-get-groups-by-year";

export const useGroupsTable = (year: string) => {
  const { selectedColumns: sortColumns } = useSort();
  const { selectedColumns: filterColumns } = useFilter();
  const { data, isLoading } = useGetGroupsByYear(year);

  const [globalFilter, setGlobalFilter] = useState("");

  const filteredData = useMemo(() => {
    if (!data) return [];

    return filterDataByConditions(data, filterColumns);
  }, [data, filterColumns]);

  const sortedData = useMemo(() => {
    return sortDataByColumns(filteredData, sortColumns);
  }, [filteredData, sortColumns]);

  const table = useReactTable({
    columns: getColumns(), 
    data: sortedData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
    },
  });

  return {
    isLoading,
    globalFilter,
    table,
    setGlobalFilter,
  };
}