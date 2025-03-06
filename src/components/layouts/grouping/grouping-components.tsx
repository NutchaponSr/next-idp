import { useEffect, useMemo, useRef } from "react";
import { useTable } from "@/stores/use-table";
import { GroupingProps } from "@/types/filter";
import { grouping } from "@/constants/filters";
import { BaseComponents } from "@/types/table";

export const GroupingComponents = <T extends { id: string }>({ data, ...props }: BaseComponents<T>) => {
  const { 
    showAggregation,
    groupingHeaders,
    groupingSelect,
    groupOption,
    toggleAggregation,
    setGroupingHeaders
  } = useTable();

  const groupedData = useMemo(() => {
    let grouped: Record<string, T[]> = {};

    const textByKey = grouping.TEXT.content.find((item) => item.label === "Text by")?.label;

    if (groupingSelect && textByKey && groupOption[textByKey]?.value === "APLHABETICAL") {
      grouped = data.reduce((acc, item) => {
        const value = String(item[groupingSelect.label as keyof T] || "").trim();
        const firstChar = value.charAt(0).toUpperCase(); 

        const headerKey = /^[A-Z0-9]$/.test(firstChar) ? firstChar : "#"; 
        if (!acc[headerKey]) acc[headerKey] = [];
        acc[headerKey].push(item);

        return acc;
      }, {} as Record<string, T[]>);
    } else {
      grouped = data.reduce((acc, item) => {
        const groupKey = String(item[groupingSelect?.label as keyof T] || "Unknown");
        if (!acc[groupKey]) acc[groupKey] = [];
        acc[groupKey].push(item);
        return acc;
      }, {} as Record<string, T[]>);
    }

    return grouped;
  }, [data, groupingSelect, groupOption]);

  const prevHeadersRef = useRef<string>("");

useEffect(() => {
  const newHeaders = Object.keys(groupedData);
  const newHeadersStr = newHeaders.join(",");
  
  if (newHeadersStr !== prevHeadersRef.current) {
    prevHeadersRef.current = newHeadersStr;
    
    const newGroupingHeaders = newHeaders.reduce(
      (acc, header, index) => {
        acc[header] = groupingHeaders[header] || { isOpen: true, isShow: true, order: index };
        return acc;
      },
      {} as Record<string, GroupingProps>,
    );
    setGroupingHeaders(newGroupingHeaders);
  }
}, [groupedData, setGroupingHeaders, groupingHeaders]);// Removed groupingHeaders from dependencies

  console.log(groupOption);

  return (
    <pre>
      {JSON.stringify(groupedData, null, 2)}
    </pre>
  );
};