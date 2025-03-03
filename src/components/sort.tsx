import React from "react";

import { useRef } from "react";
import { Reorder } from "framer-motion";
import { ChevronDownIcon, GripVerticalIcon, PlusIcon, XIcon } from "lucide-react";

import { ColumnProps, SortOrder, sorts } from "@/types/filter";

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { Hint } from "@/components/hint";
import { TrashIcon } from "@/components/icons";
import { TableSort } from "./table-sort";

interface SortProps<T extends object> {
  sortColumns: ColumnProps<T>[];
  selectedSortColumns: ColumnProps<T>[];
  addSortColumn: (column: ColumnProps<T>) => void;
  onSortOrder: (label: keyof T, key: SortOrder) => void;
  onSortReorder: (newOrder: ColumnProps<T>[]) => void;
  removeSortColumn: (label: keyof T) => void;
  removeSortAll: () => void;
}

export const Sort = <T extends object>({
  sortColumns,
  selectedSortColumns,
  addSortColumn,
  onSortOrder,
  onSortReorder,
  removeSortColumn,
  removeSortAll
} :SortProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  console.log(selectedSortColumns)

  return (
    <>
      <div className="flex flex-col py-2">
        <div ref={containerRef}>
          <Reorder.Group axis="y" values={selectedSortColumns} onReorder={(newOrder) => {
            const updatedColumns = newOrder.map((col, index) => ({
              ...col,
              order: index + 1,
            }));
            
            onSortReorder(updatedColumns);
          }}>
            {selectedSortColumns.map((column) => (
              <Reorder.Item
                key={String(column.label)}
                value={column}
                dragConstraints={containerRef}
                dragElastic={0}
                style={{ marginBottom: "4px" }}
              >
                <div className="flex items-center min-h-7 text-sm mx-2">
                  <div className="flex items-center justify-center size-7 shrink-0 cursor-grab">
                    <GripVerticalIcon className="size-4 text-[#9a9a97]" />
                  </div>
                  <div className="mx-2 flex-auto">
                    <div className="flex items-center space-x-2 whitespace-nowrap overflow-hidden text-ellipsis">
                      <Button size="sm" variant="gray" className="gap-1.5 bg-background">
                        <div className="flex items-center space-x-1">
                          {React.createElement(column.icon, { className: "text-[#7c7c78] size-4" })}
                          <span className="whitespace-nowrap overflow-hidden text-ellipsis capitalize">
                            {String(column.label)}
                          </span>
                        </div>
                        <ChevronDownIcon className="size-3 text-[#b9b9b7]" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="gray" className="gap-1.5 bg-background">
                            <div className="flex items-center space-x-1">
                              <span className="whitespace-nowrap overflow-hidden text-ellipsis capitalize">
                                {column.sortOrder?.label}
                              </span>
                            </div>
                            <ChevronDownIcon className="size-3 text-[#b9b9b7]" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {Object.values(sorts).map((sort) => (
                            <DropdownMenuItem 
                              key={sort.label} 
                              onClick={() => onSortOrder(column.label, sort.value)}
                            >
                              {sort.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="ml-auto shrink-0">
                    <Hint label="Remove sort rule">
                      <Button variant="ghost" size="icon" onClick={() => removeSortColumn(column.label)}>
                        <XIcon className="size-4 text-[#9a9a97]" />
                      </Button>
                    </Hint>
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </div>
      <div className="p-1 flex flex-col">
        <TableSort 
          align="center"
          columns={sortColumns}
          addColumn={addSortColumn}
        >
          <Button 
            size="sm" 
            variant="ghost" 
            className="justify-start text-[#37352fa6] hover:text-[#37352fa6] px-2"
          >
            <PlusIcon className="h-4 w-4 text-[#7c7c78]" />
            Add sort
          </Button>
        </TableSort>
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={removeSortAll}
          className="justify-start text-[#37352fa6] hover:text-destructive px-2 group" 
        >
          <TrashIcon className="h-4 w-4 text-[#7c7c78] group-hover:text-destructive transition-colors" />
          Delete sort
        </Button>
      </div>
    </>
  );
}