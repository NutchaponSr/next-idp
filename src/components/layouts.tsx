import React from "react";

import { 
  ColumnProps, 
  Layout 
} from "@/types/filter";

import { useLayout } from "@/stores/use-layout";

import { TableLayout } from "@/components/table-layout";

interface LayoutsProps<T extends { id: string }> {
  data: T[];
  searchQuery: string;
  isOpenToolbar: boolean;
  columns: ColumnProps<T>[];
  selectAll: () => void;
  selectRow: (key: string) => void;
  selectedRows: Record<string, boolean>;
  renderCell: (cell: T, column: ColumnProps<T>, searchQuery: string) => React.JSX.Element | undefined;
}

export const Layouts = <T extends { id: string }>({ ...props }: LayoutsProps<T>) => {
  const { mode } = useLayout();

  switch (mode) {
    case Layout.TABLE:
      return <TableLayout {...props} />
  }
}