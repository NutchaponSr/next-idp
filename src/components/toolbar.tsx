import { 
  ArrowDownIcon,
  ArrowUpDownIcon, 
  ArrowUpIcon, 
  ChevronDownIcon, 
  ListFilterIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  ZapIcon, 
} from "lucide-react";
import { useState } from "react";
import { useToggle } from "react-use";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { IconVariant } from "@/types/icon";
import { ColumnProps } from "@/types/filter";

import { useTable } from "@/stores/use-table";
import { useMoreSidebar } from "@/stores/use-more-sidebar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Hint } from "@/components/hint";
import { Sort } from "@/components/sort";
import { TableSort } from "@/components/table-sort";
import { CircleCancelIcon } from "@/components/icons";
import { MoreSidebar } from "@/components/more-sidebar";
import { TableFilter } from "@/components/table-filter";
import { FilterColumns } from "@/components/filter-columns";

interface ToolbarProps<T extends object> {
  value: string;
  columns: ColumnProps<T>[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Toolbar = <T extends object>({
  value,
  onChange
}: ToolbarProps<T>) => {
  const {
    isSort,
    isFilter,
    isOpenSort,
    isOpenFilter,
    sortColumns,
    filterColumns,
    isAnySortActive,
    isAnyFilterActive,
    selectedFilterColumns,
    selectedSortColumns,
    addSortColumn,
    addFilterColumn,
    onOpenSort,
    onOpenFilter,
    onCloseSort,
    onCloseFilter,
    onSortOrder,
    onSortReorder,
    removeSortColumn,
    removeSortAll
  } = useTable();
  const { 
    isOpenSidebar,
    onOpenSidebar
  } = useMoreSidebar();

  const [isOpenSearch, onSearch] = useToggle(false);
  const [isSubToolbar, onSubToolbar] = useToggle(false);

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
          <div className="flex items-center space-x-1">
            <TableFilter 
              showTooltip
              columns={filterColumns} 
              isOpen={isOpenFilter} 
              tooltipOpen={tooltipOpen}
              addColumn={addFilterColumn} 
              onClose={onCloseFilter}
              openFilter={() => onSubToolbar(true)}
            >
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => {
                  if (isFilter) onSubToolbar();
                  else setTimeout(() => onOpenFilter(), 10);
                }}
                onMouseEnter={() => setTooltipOpen(true)}
                onMouseLeave={() => setTooltipOpen(false)}
              >
                <ListFilterIcon className={cn("h-4 w-4", isAnyFilterActive ? "text-[#2383e2]" : "text-[#9A9A97]")} />
              </Button>
            </TableFilter>
            <TableSort 
              showTooltip
              isOpen={isOpenSort}
              columns={sortColumns}
              addColumn={addSortColumn}
              onClose={onCloseSort}
              onOpenSort={() => onSubToolbar(true)}
            >
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => {
                  if (isSort) onSubToolbar();
                  else setTimeout(() => onOpenSort(), 10);
                }}
              >
                <ArrowUpDownIcon className={cn("h-4 w-4", isAnySortActive ? "text-[#2383e2]" : "text-[#9A9A97]")} />
              </Button>
            </TableSort>
            {/* TODO: Automation ex: send an email */}
            <Hint label="Create and view automations" side="top">
              <Button size="icon" variant="ghost">
                <ZapIcon className="h-4 w-4 text-transparent fill-[#9A9A97]" />
              </Button>
            </Hint>
            <div className="flex items-center relative">
              <Hint label="Search" side="top">
                <Button size="icon" variant="ghost" onClick={onSearch}>
                  <SearchIcon className="h-4 w-4 text-[#9A9A97]" />
                </Button>
              </Hint>
              <motion.div
                animate={{ width: isOpenSearch ? 150 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden flex items-center"
              >
                <AnimatePresence>
                  {isOpenSearch && (
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}  
                      animate={{ x: 0, opacity: 1 }}   
                      exit={{ x: 50, opacity: 0 }}      
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex items-center w-[150px]"
                    >
                      <div className="flex items-center border-none w-full text-sm text-primary px-1">
                        <Input
                          autoFocus
                          area="none"
                          variant="none"
                          value={value}
                          placeholder="Type to search"
                          onChange={(e) => onChange(e)}
                          className="resize-none p-0 block w-[120px] border-none bg-none"
                        />
                        <button
                          className="absolute right-1 top-1/2 -translate-y-1/2 inline-flex items-center justify-center shrink-0 grow-0 rounded-full size-5 hover:bg-[#37352f29]"
                          onClick={() => {}}
                        >
                          <CircleCancelIcon className="fill-[#37352f59] size-4" variant={IconVariant.SOLID}/>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
            <Hint label="Edit layout and more...">
              <Button size="icon" variant="ghost" onClick={onOpenSidebar} className={cn(isOpenSidebar && "bg-accent")}>
                <MoreHorizontalIcon className="h-4 w-4 text-[#9A9A97]" />
              </Button>
            </Hint>
            <Button variant="primary" size="xs">
              New
            </Button>
          </div>
        </div>
      </div>
      {(isSubToolbar && (isFilter || isSort)) && (
        <div className="flex items-center relative grow-0 overflow-hidden min-h-10 h-10 w-full">
          <div className="flex items-center pt-3 pb-2 overflow-x-auto overflow-y-hidden space-x-2 w-full">
            {isSort && (
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
                  <Sort 
                    sortColumns={sortColumns}
                    selectedSortColumns={selectedSortColumns}
                    addSortColumn={addSortColumn}
                    onSortOrder={onSortOrder}
                    onSortReorder={onSortReorder}
                    removeSortColumn={removeSortColumn}
                    removeSortAll={removeSortAll}
                  />
                </PopoverContent>
              </Popover>
            )}
            {(isSort && isFilter) && <Separator orientation="vertical" className="h-6" />}
            {selectedFilterColumns.map((column, index) => (
              <FilterColumns key={index} {...{ ...column, label: column.label as keyof T }} />
            ))}
            <TableFilter 
              align="center"
              columns={filterColumns} 
              addColumn={addFilterColumn}
            >
              <Button 
                size="xs" 
                variant="ghostFlow" 
                className="px-1 gap-1 text-[#37352f80] hover:text-[#37352f80]"
              >
                <PlusIcon className="size-4 text-[#9A9A97]" />
                Add filter
              </Button>
            </TableFilter>
          </div>
        </div>
      )}
      <motion.div
        animate={{ width: isOpenSidebar ? 386 : 0 }}
        transition={{ duration: 0.15, ease: "easeIn" }}
      >
        {isOpenSidebar && <MoreSidebar />}
      </motion.div>
    </div>
  );
}