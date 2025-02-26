import { ColumnProps, Layout } from "@/types/filter";

import { TableLayout } from "@/components/table-layout";

interface LayoutsProps<T extends object> {
  data: T[];
  columns: ColumnProps<T>[];
  mode: Layout;
}

export const Layouts = <T extends object>({ 
  data, 
  columns,
  mode,
}: LayoutsProps<T>) => {
  switch (mode) {
    case Layout.TABLE:
      return <TableLayout data={data} columns={columns}  />
  }
}