import { 
  ArrowUpDownIcon, 
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

import { useSort } from "@/stores/use-sort";
import { useFilter } from "@/stores/use-filter";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Hint } from "@/components/hint";
import { TableSort } from "@/components/table-sort";
import { CircleCancelIcon } from "@/components/icons";
import { MoreSidebar } from "@/components/more-sidebar";
import { TableFilter } from "@/components/table-filter";
import { SortColumns } from "@/components/sort-columns";
import { FilterColumns } from "@/components/filter-columns";

interface ToolbarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Toolbar = ({
  value,
  onChange
}: ToolbarProps) => {
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
    isAnySortActive,
    isOpen: isOpenSort,
    columns: sortColumns,
    addColumn: addSort,
    onOpen: onOpenSort,
    onClose: onCloseSort,
  } = useSort();

  const [isMoreSide, onMoreSide] = useToggle(false);
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
          <div className="flex items-center space-x-0.5">
            <TableFilter 
              showTooltip
              columns={filterColumns} 
              isOpen={isOpenFilter} 
              tooltipOpen={tooltipOpen}
              addColumn={addFilter} 
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
              addColumn={addSort}
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
              <Button size="icon" variant="ghost" onClick={onMoreSide} className={cn(isMoreSide && "bg-accent")}>
                <MoreHorizontalIcon className="h-4 w-4 text-[#9A9A97]" />
              </Button>
            </Hint>
          </div>
        </div>
      </div>
      {(isSubToolbar && (isFilter || isSort)) && (
        <div className="flex items-center relative grow-0 overflow-hidden min-h-10 h-10 w-full">
          <div className="flex items-center pt-3 pb-2 overflow-x-auto overflow-y-hidden space-x-2 w-full">
            {isSort && <SortColumns />}
            {(isSort && isFilter) && <Separator orientation="vertical" className="h-6" />}
            {selectedColumns.map((column, index) => (
              <FilterColumns key={index} {...{ ...column, label: column.label.toString() }} />
            ))}
            <TableFilter 
              align="center"
              columns={filterColumns} 
              addColumn={addFilter}
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
        animate={{ width: isMoreSide ? 386 : 0 }}
        transition={{ duration: 0.3, ease: "easeIn" }}
      >
        <AnimatePresence>
          {isMoreSide && <MoreSidebar onClose={() => onMoreSide(false)} />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}