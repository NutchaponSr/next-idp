import { ColumnProps } from "@/types/filter";

interface GroupingLayoutProps<T extends { id: string }> {
  data: T[];
  groupedData: T[] | Record<string, T[]>
  searchQuery: string;
  columns: ColumnProps<T>[];
  isOpenToolbar: boolean;
  selectedRows: Record<string, boolean>;
  selectAll: () => void;
  selectRow: (key: string) => void;
  renderCell: (cell: T, column: ColumnProps<T>, searchQuery: string) => JSX.Element | undefined;
}

export const GroupingLayout = <T extends { id: string }>({
  data,
  columns,
  groupedData,
  searchQuery,
  selectedRows,
  isOpenToolbar,
  selectAll,
  selectRow,
  renderCell
}: GroupingLayoutProps<T>) => {
  return (
    <pre className="text-sm">
      {JSON.stringify(groupedData, null, 2)}
    </pre>
  );
}