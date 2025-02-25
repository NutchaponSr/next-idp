import { Table } from "@tanstack/react-table";

import { Layout } from "@/types/filter";
import { DateTable } from "./data-table";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface LayoutsProps<TData, TValue> {
  table: Table<TData>;
  mode: Layout;
}

export const Layouts = <TData, TValue>({ table, mode }: LayoutsProps<TData, TValue>) => {
  switch (mode) {
    case Layout.TABLE:
      return <DateTable table={table} />
  }
}