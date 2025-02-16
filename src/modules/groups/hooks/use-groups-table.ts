import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { useGetGroupsByYear } from "@/modules/groups/api/use-get-groups-by-year";
import { columns } from "../components/columns";

export const useGroupsTable = (year: string) => {
  const { data, isLoading } = useGetGroupsByYear(year);

  // TODO: Hook sort

  const table = useReactTable({
    columns,
    data: data || [],
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    isLoading,
    table,
  };
}