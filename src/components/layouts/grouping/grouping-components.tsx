import { BaseComponents } from "@/types/table";

import { useTable } from "@/stores/use-table";

export const GroupingComponents = <T extends { id: string }>({ ...props }: BaseComponents<T>) => {
  const { 
    groupOption,
    groupingHeaders,
    groupingSelect,
  } = useTable();
  
  const sortedGroups = Object.entries(groupingHeaders)
      .sort(([, a], [, b]) => a.order - b.order)
      .map(([key]) => key);

  return (
    <div className="flex flex-col space-y-2.5">
      {/* {sortedGroups.map((group) => (
        <pre key={group} className="text-xs">
          {JSON.stringify(props.data.filter((item) => item[groupingSelect?.label as keyof T] === group), null, 2)}
        </pre>
      ))} */}
      <pre>
        {JSON.stringify(groupingHeaders, null, 2)}
        {JSON.stringify(groupOption, null, 2)}
      </pre>
    </div>
  );
};