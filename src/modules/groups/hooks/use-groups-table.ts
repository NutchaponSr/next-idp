import { useEffect, useMemo } from "react";

import { 
  filterDataByConditions, 
  sortDataByColumns 
} from "@/lib/utils";
import { groupColumns } from "@/constants/filters";

import { useSearch } from "@/hooks/use-search";

import { useTable } from "@/stores/use-table";

import { useGetGroupsByYear } from "@/modules/groups/api/use-get-groups-by-year";

export const useGroupsTable = (year: string) => {
  const { data, isLoading } = useGetGroupsByYear(year);

  const { 
    setColumns,
    selectedFilterColumns,
    selectedSortColumns
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

  return {
    data: sortedData,
    isLoading,
    searchQuery,
    setSearchQuery
  };
}