import { 
  ArrowUpDownIcon, 
  ListFilterIcon, 
} from "lucide-react";
import { useState } from "react";
import { useToggle } from "react-use";

import { cn } from "@/lib/utils";

import { useSort } from "@/stores/use-sort";
import { useFilter } from "@/stores/use-filter";

import { Button } from "@/components/ui/button";

import { TableSort } from "@/components/table-sort";
import { TableFilter } from "@/components/table-filter";
import { FilterColumns } from "@/components/filter-columns";
import { Separator } from "@/components/ui/separator";
import { SortColumns } from "@/components/sort-columns";

export const Toolbar = () => {
  const { 
    isFilter,
    columns: filterColumns, 
    isOpen: isOpenFilter,
    selectedColumns, 
    isAnyFilterActive,
    addColumn: addFilter,
    onOpen: onOpenFilter,
    onClose: onCloseFilter,
  } = useFilter();
  const {
    isSort,
    isOpen: isOpenSort,
    columns: sortColumns,
    addColumn: addSort,
    onOpen: onOpenSort,
    onClose: onCloseSort,
  } = useSort();

  const [on, toggle] = useToggle(false);

  const [tooltipOpen ,setTooltipOpen] = useState(false);
  
  return (
    <div className="min-h-10 px-24 sticky left-0 shrink-0 z-[80]">
      <div className={cn(
        "flex items-center h-10 w-full",
        (isFilter || isSort) && "shadow-[inset_0_-1px_0_rgb(233,233,231)]"
      )}>
        <div className="flex items-center justify-between h-full grow space-x-1">
          {/* TODO: Group each year */}
          <div />
          <div className="flex items-center space-x-0.5">
            <TableFilter 
              columns={filterColumns} 
              isOpen={isOpenFilter} 
              tooltipOpen={tooltipOpen}
              addColumn={addFilter} 
              onClose={onCloseFilter}
              openFilter={() => toggle(true)}
            >
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => {
                  if (isFilter) toggle();
                  else setTimeout(() => onOpenFilter(), 10);
                }}
                onMouseEnter={() => {if (!isFilter) setTooltipOpen(true)}}
                onMouseLeave={() => setTooltipOpen(false)}
              >
                <ListFilterIcon className={cn("h-4 w-4", isAnyFilterActive ? "text-[#2383e2]" : "text-[#9A9A97]")} />
              </Button>
            </TableFilter>
            <TableSort 
              isOpen={isOpenSort}
              columns={sortColumns}
              addColumn={addSort}
              onClose={onCloseSort}
              onOpenSort={() => toggle(true)}
            >
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => {
                  if (isOpenSort) toggle();
                  else setTimeout(() => onOpenSort(), 10);
                }}
              >
                <ArrowUpDownIcon className="h-4 w-4 text-[#9A9A97]" />
              </Button>
            </TableSort>
          </div>
        </div>
      </div>
      {on && (
        <div className="flex items-center relative grow-0 overflow-hidden min-h-10 h-10 w-full">
          <div className="flex items-center pt-3 pb-2 overflow-x-auto overflow-y-hidden space-x-2 w-full">
            {isSort && <SortColumns />}
            {(isSort && isFilter) && <Separator orientation="vertical" className="h-6" />}
            {selectedColumns.map((column, index) => (
              <FilterColumns key={index} {...{ ...column, label: column.label.toString() }} />
            ))}
            {/* <TableFilter columns={columns} addColumn={addColumn}>
              <Button size="xs" variant="ghostFlow" className="px-1 gap-1 text-[#37352f80] hover:text-[#37352f80]">
                <PlusIcon className="size-4 text-[#9A9A97]" />
                Add filter
              </Button>
            </TableFilter> */}
          </div>
        </div>
      )}
    </div>
  );
}