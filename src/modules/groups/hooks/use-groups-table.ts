import { useEffect, useMemo } from "react";

import { 
  filterDataByConditions,
  groupByColumn,
  sortDataByColumns 
} from "@/lib/utils";
import { groupColumns } from "@/constants/filters";

import { SORT_KEY } from "@/types/grouping";
import { GroupingProps } from "@/types/filter";

import { TextSort } from "@/enums/grouping";

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
    groupingHeaders,
    groupingSelect,
    groupOption,
    setColumns,
    setGroupingHeaders,
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

  const isOpenToolbar = isSort || isFilter;
  const isGrouping = groupingSelect !== null;

  const groupedData = useMemo(() => {
    if (!groupingSelect) return {} as Record<string, ResponseType[]>;

    return groupByColumn(sortedData, groupingSelect.label as keyof ResponseType, groupOption)
  }, [groupOption, groupingSelect, sortedData]);

  useEffect(() => {
    const headers = Object.keys(groupedData);

    const textSort = groupOption[SORT_KEY]?.value as TextSort;

    if (textSort === TextSort.ALPHABETICAL) {
      headers.sort((a ,b) => a.localeCompare(b));
    } else if (textSort === TextSort.REVERSE_ALPHABETICAL) {
      headers.sort((a, b) => b.localeCompare(a));
    }

    if (headers.join(",") !== Object.keys(groupingHeaders).join(",")) {
      const newGroupingHeaders = headers.reduce((acc, header, index) => {
        acc[header] = groupingHeaders[header] || {
          isOpen: true,
          isShow: true,
          order: index
        }

        return acc;
      }, {} as Record<string, GroupingProps>);

      setGroupingHeaders(newGroupingHeaders);
    }
  }, [
    groupOption,
    groupedData,
    groupingHeaders,
    setGroupingHeaders
  ]);

  console.log(columns);
  
  return {
    data: sortedData,
    isLoading,
    isOpenToolbar,
    searchQuery,
    columns,
    isGrouping,
    setSearchQuery,
  };
}
