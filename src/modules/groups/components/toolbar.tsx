import { ListFilterIcon, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { useFilterTable } from "@/stores/use-filter-table";

import { Button } from "@/components/ui/button";

import { TableFilter } from "@/components/table-filter";
import { FilterColumns } from "@/components/filter-columns";

export const Toolbar = () => {
  const { 
    columns, 
    isFilter,
    selectedColumns, 
    addColumn 
  } = useFilterTable();
  
  return (
    <div className="min-h-10 px-24 sticky left-0 shrink-0 z-[80]">
      <div className={cn(
        "flex items-center h-10 w-full",
        isFilter && "shadow-[inset_0_-1px_0_rgb(233,233,231)]"
      )}>
        <div className="flex items-center justify-between h-full grow space-x-1">
          {/* TODO: Group each year */}
          <div />
          <div className="flex items-center space-x-0.5">
            <TableFilter columns={columns} addColumn={addColumn}>
              <Button size="icon" variant="ghost">
                <ListFilterIcon className="h-4 w-4 text-muted-foreground" />
              </Button>
            </TableFilter>
          </div>
        </div>
      </div>
      {isFilter && (
        <div className="flex items-center relative grow-0 overflow-hidden min-h-10 h-10 w-full">
          <div className="flex items-center pt-3 pb-2 overflow-x-auto overflow-y-hidden space-x-2">
            {selectedColumns.map((column, index) => (
              <FilterColumns key={index} {...{ ...column, label: column.label.toString() }} />
            ))}
            <TableFilter columns={columns} addColumn={addColumn}>
              <Button size="xs" variant="ghostFlow" className="px-1 gap-1 text-[#37352f80] hover:text-[#37352f80]">
                <PlusIcon className="size-4 text-[#9A9A97]" />
                Add filter
              </Button>
            </TableFilter>
          </div>
        </div>
      )}
    </div>
  );
}