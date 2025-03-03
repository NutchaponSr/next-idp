import { useEffect, useMemo } from "react";

import { 
  filterDataByConditions, 
  groupByColumn, 
  sortDataByColumns 
} from "@/lib/utils";
import { groupColumns } from "@/constants/filters";

import { useSearch } from "@/hooks/use-search";

import { useTable } from "@/stores/use-table";

import { ResponseType } from "@/modules/groups/api/use-get-group";
import { useGetGroupsByYear } from "@/modules/groups/api/use-get-groups-by-year";

export const useGroupsTable = (year: string) => {
  const { data, isLoading } = useGetGroupsByYear(year);

  const { 
    columns,
    selectedFilterColumns,
    selectedSortColumns,
    isSort,
    isFilter,
    groupingSelect,
    setColumns
  } = useTable();

  useEffect(() => {
    setColumns(groupColumns);
  }, [setColumns]);
  
  const {
    searchQuery,
    setSearchQuery,
    filteredItems
  } = useSearch(data || [], groupColumns.map((col) => col.label))

  const filteredData = useMemo(() => {
    return filterDataByConditions(filteredItems, selectedFilterColumns);
  }, [filteredItems, selectedFilterColumns]);
  
  const sortedData = useMemo(() => {
    return sortDataByColumns(filteredData, selectedSortColumns);
  }, [filteredData, selectedSortColumns]);

  const groupedData = groupingSelect ? groupByColumn(sortedData, groupingSelect.label as keyof ResponseType) : sortedData;

  const isOpenToolbar = isSort || isFilter;

  return {
    data: sortedData,
    isLoading,
    isOpenToolbar,
    searchQuery,
    columns,
    groupedData,
    setSearchQuery
  };
}