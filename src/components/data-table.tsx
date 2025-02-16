"use client";

import { 
  flexRender, 
  Table as TB 
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface DateTableProps<TData, TValue> {
  table: TB<TData>;
}

export const DateTable = <TData, TValue>({
  table
}: DateTableProps<TData, TValue>) => {
  return (
    <div className="relative float-left min-w-full pb-[180px] pr-24 pl-16">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                No filter Result. Click to add a row
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}