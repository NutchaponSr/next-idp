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
import { GroupingProps } from "@/types/filter";

export const useGroupsTable = (year: string) => {
  const { data, isLoading } = useGetGroupsByYear(year);

  const { 
    columns,
    selectedFilterColumns,
    selectedSortColumns,
    isSort,
    isFilter,
    groupingHeaders,
    groupingSelect,
    setColumns,
    setGroupingHeaders
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

  const groupedData = useMemo(() => {
    if (!groupingSelect) return {} as Record<string, ResponseType[]>
    return groupByColumn(sortedData, groupingSelect.label as keyof ResponseType)
  }, [sortedData, groupingSelect])

  const isOpenToolbar = isSort || isFilter;
  const isGrouping = groupingSelect !== null;

  useEffect(() => {
    const newHeaders = Object.keys(groupedData)

    if (newHeaders.join(",") !== Object.keys(groupingHeaders).join(",")) {
      const newGroupingHeaders = newHeaders.reduce(
        (acc, header, index) => {
          acc[header] = groupingHeaders[header] || { isOpen: true, isShow: true, order: index }
          return acc
        },
        {} as Record<string, GroupingProps>,
      )
      setGroupingHeaders(newGroupingHeaders)
    }
  }, [groupedData, groupingHeaders, setGroupingHeaders])

  return {
    data: sortedData,
    isLoading,
    isOpenToolbar,
    searchQuery,
    columns,
    isGrouping,
    setSearchQuery
  };
}