import { useMemo } from "react";

import { 
  filterDataByConditions, 
  sortDataByColumns 
} from "@/lib/utils";

import { useSort } from "@/stores/use-sort";
import { useFilter } from "@/stores/use-filter";

import { useGetGroupsByYear } from "@/modules/groups/api/use-get-groups-by-year";

export const useInitialGroups = (year: string) => {
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

  return {
    data: sortedData,
    isLoading
  };
}