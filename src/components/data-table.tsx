"use client";

import { 
  flexRender, 
  Table as TB 
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { useFilter } from "@/stores/use-filter";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useSort } from "@/stores/use-sort";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface DateTableProps<TData, TValue> {
  table: TB<TData>;
}

export const DateTable = <TData, TValue>({
  table
}: DateTableProps<TData, TValue>) => {
  const { isSort } = useSort();
  const { isFilter } = useFilter();

  return (
    <div className="relative float-left min-w-full pb-[180px] pr-24 pl-16">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <TableHead 
                  key={header.id} 
                  className={cn(
                    (isFilter || isSort) && "border-none",
                    (index === 0 || index === 1) && "w-8",
                    (index !== 0 && index !== 1) && "hover:bg-[#37352f0f]",
                    (index !== 0 && index !== 1 && index !== headerGroup.headers.length - 1) && "border-r border-[#e9e9e7]",
                    header.column.id === "actions"
                      ? "shadow-none"
                      : (isFilter || isSort)
                        ? "shadow-[inset_0_-1px_0_rgb(233,233,231)]"
                        : "shadow-[inset_0_-1px_0_rgb(233,233,231),inset_0_1px_0_rgb(233,233,231)]"
                  )}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => {
              const isSelected = row.getIsSelected();
              return (
                <TableRow key={row.id} className="group relative" data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell 
                      key={cell.id}
                      className={cn(
                        "group/cell",
                        cell.column.id === "actions" ? "border-none" : "border-b",
                        (index !== 0 && index !== 1 && index !== row.getVisibleCells().length - 1) && "border-r border-[#e9e9e7]"
                      )}
                    >
                      <div
                        className={cn(
                          "group-hover/cell:opacity-100 transition ease-in",
                          index === 1 && "opacity-0",
                          isSelected && index === 1 && "opacity-100",
                          index === 0 && "opacity-0 group-hover:opacity-100"
                        )}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </TableCell>
                  ))}
                  {isSelected && (
                    <div className="absolute inset-0 top-[0.75px] bottom-0 bg-[#2383e224] rounded-sm pointer-events-none ml-8" />
                  )}
                </TableRow>
              );
            })
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