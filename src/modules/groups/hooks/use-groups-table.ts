import { useMemo } from "react";

import { 
  filterDataByConditions, 
  sortDataByColumns 
} from "@/lib/utils";

import { useSort } from "@/stores/use-sort";
import { useSearch } from "@/hooks/use-search";
import { useFilter } from "@/stores/use-filter";

import { useGetGroupsByYear } from "@/modules/groups/api/use-get-groups-by-year";
import { groupColumns } from "@/constants/filters";

export const useGroupsTable = (year: string) => {
  const { selectedColumns: sortColumns } = useSort();
  const { selectedColumns: filterColumns } = useFilter();
  

  const { data, isLoading } = useGetGroupsByYear(year);
  
  const {
    searchQuery,
    setSearchQuery,
    filteredItems
  } = useSearch(data || [], groupColumns.map((col) => col.label))

  const filteredData = useMemo(() => {
    return filterDataByConditions(filteredItems, filterColumns);
  }, [filteredItems, filterColumns]);
  
  const sortedData = useMemo(() => {
    return sortDataByColumns(filteredData, sortColumns);
  }, [filteredData, sortColumns]);

  return {
    data: sortedData,
    isLoading,
    searchQuery,
    setSearchQuery
  };
}