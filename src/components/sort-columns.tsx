import React, { useCallback, useRef } from "react";

import { 
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ChevronDownIcon, 
  GripVerticalIcon, 
  PlusIcon, 
  XIcon
} from "lucide-react";
import { Reorder } from "framer-motion";

import { cn } from "@/lib/utils";
import { sorts } from "@/types/filter";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { TrashIcon } from "@/components/icons";
import { TableSort } from "@/components/table-sort";
import { Hint } from "./hint";
import { useTable } from "@/stores/use-table";


export const SortColumns = () => {
  const {
    columns,
    isAnySortActive,
    selectedSortColumns,
    addSortColumn,
    onSortOrder,
    onSortReorder,
    removeSortColumn,
    removeSortAll
  } = useTable();

  const containerRef = useRef<HTMLDivElement>(null);

  const onDragEnd = useCallback((draggedIndex: number, droppedIndex: number) => {
    if (draggedIndex === droppedIndex) return; 

    const newColumns = Array.from(selectedSortColumns);
    const [movedColumn] = newColumns.splice(draggedIndex, 1); 
    newColumns.splice(droppedIndex, 0, movedColumn); 

    onSortReorder(newColumns);
  }, [selectedSortColumns, onSortReorder]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={isAnySortActive ? "filterAct1" : "filter"} size="filter" className="gap-1 text-xs">
          {selectedSortColumns.length > 1 ? (
            <ArrowUpDownIcon className={cn("size-[14px]", isAnySortActive ? "text-[#2383e2]" : "text-[#7c7c78]" )} />
          ) : (
            selectedSortColumns[0].sortOrder?.value === "asc" 
              ? <ArrowUpIcon className={cn("size-[14px]", isAnySortActive ? "text-[#2383e2]" : "text-[#7c7c78]" )} />
              : <ArrowDownIcon className={cn("size-[14px]", isAnySortActive ? "text-[#2383e2]" : "text-[#7c7c78]" )} />
          )}
          <span className="max-w-56 whitespace-nowrap overflow-hidden text-ellipsis">
            {selectedSortColumns.length > 1 ? (
              selectedSortColumns.length + " Sorts"
            ) : (
              String(selectedSortColumns[0].label)
            )}
          </span>
          <ChevronDownIcon className={cn("size-3", isAnySortActive ? "text-[#2383e2]" : "text-[#b9b9b7]")}/>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <div className="flex flex-col py-2">
          <div ref={containerRef}>
            <Reorder.Group axis="y" values={selectedSortColumns} onReorder={() => {}}>
              {selectedSortColumns.map((column, index) => (
                <Reorder.Item
                  key={index}
                  value={column}
                  dragConstraints={containerRef}
                  dragElastic={0}
                  onDragEnd={(e, info) => {
                    const targetIndex = Math.round(info.offset.y / 50); 
                    if (targetIndex !== index) {
                      onDragEnd(index, targetIndex);
                    }
                  }}
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
                                onClick={() => onSortOrder(String(column.label), sort.value)}
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
            columns={columns}
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
      </PopoverContent>
    </Popover>
  );
}