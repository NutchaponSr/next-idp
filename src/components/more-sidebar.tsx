import { motion } from "framer-motion";
import { ArrowLeftIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { IconVariant } from "@/types/icon";

import { layouts } from "@/constants/filters";

import { useTable } from "@/stores/use-table";
import { useLayout } from "@/stores/use-layout";
import { useMoreSidebar } from "@/stores/use-more-sidebar";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  ArrowUpDownIcon,
  FilterIcon,
  InsertRowUpIcon,
  LinkIcon,
  ListIcon,
  ZapIcon
} from "@/components/icons";
import { Grouping } from "@/components/grouping";
import { Properties } from "@/components/properties";
import { MoreButton } from "@/components/more-button";
import { SortSidebar } from "@/components/sort-sidebar";
import { FilterSidebar } from "@/components/filter-sidebar";
import { LayoutSelector } from "@/components/layout-selector";

export const MoreSidebar = () => {
  const { mode } = useLayout();
  const { type, onOpenItem, onCloseSidebar } = useMoreSidebar();
  
  const { 
    columns, 
    groupingSelect,
    selectedFilterColumns,
    selectedSortColumns
  } = useTable();

  return (
    <motion.aside
      initial={{ x: 50, opacity: 0 }}  
      animate={{ x: 0, opacity: 1 }}   
      exit={{ x: 50, opacity: 0 }}      
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute top-10 -right-24 bg-background border-l border-[#e9e9e7] pr-24 z-[90] min-h-screen"
    >
      <div className="flex h-full sticky top-0 left-0">
        <div className="shadow-[inset_0_1px_0_rgb(233,233,231)]">
          <div className="flex flex-col min-w-[290px] max-w-[290px] h-full max-h-full">
            <div className={cn(type === null ? "visible" : "hidden", "shrink-0 min-h-10")}>
              <MoreHeader label="View options" onClose={onCloseSidebar} />
              <ScrollArea>
                <div className="flex flex-col p-1">
                  <MoreButton 
                    label="Layout" 
                    icon={layouts[mode].icon} 
                    description={layouts[mode].label} 
                    onClick={() => onOpenItem("layout")} 
                  />
                </div>
                <div className="flex flex-col p-1 shadow-[0_-1px_0_rgba(55,53,47,0.09)]">
                  <MoreButton 
                    label="Properties" 
                    icon={ListIcon} 
                    description={`${columns.filter((col) => !col.isHide).length} shown`} 
                    onClick={() => onOpenItem("property")} 
                  />
                  <MoreButton 
                    label="Filter" 
                    icon={FilterIcon} 
                    description={
                      selectedFilterColumns.length > 0 
                        ? `${selectedFilterColumns.length} filter${selectedFilterColumns.length > 1 ? 's' : ''}` 
                        : "None"
                    }
                    onClick={() => onOpenItem("filter")} 
                  />
                  <MoreButton 
                    label="Sort" 
                    icon={ArrowUpDownIcon} 
                    description={
                      selectedSortColumns.length > 0 
                        ? `${selectedSortColumns.length} filter${selectedSortColumns.length > 1 ? 's' : ''}` 
                        : "None"
                    } 
                    onClick={() => onOpenItem("sort")} 
                  />
                  <MoreButton 
                    label="Grouping" 
                    icon={InsertRowUpIcon} 
                    description={groupingSelect ? String(groupingSelect.label) : "None"} 
                    onClick={() => onOpenItem("grouping")} 
                  />
                  <MoreButton label="Automations" icon={ZapIcon} variant={IconVariant.SOLID} description="None" onClick={() => onOpenItem("automations")}/>
                </div>
                <div className="flex flex-col p-1 shadow-[0_-1px_0_rgba(55,53,47,0.09)]">
                  <MoreButton label="Copy link" icon={LinkIcon} />
                </div>
              </ScrollArea>
            </div>
            <LayoutSelector />
            <Properties />
            <FilterSidebar />
            <SortSidebar />
            <Grouping />
          </div>
        </div>
        <div className="w-24" />
      </div>
    </motion.aside>
  );
}

interface MoreHeaderProps {
  label: string;
  onBack?: () => void;
  onClose: () => void;
}

export const MoreHeader = ({
  label,
  onBack,
  onClose
}: MoreHeaderProps) => {
  return (
    <div className="flex items-center pt-3.5 pb-1.5 px-4 h-10">
      {onBack && (
        <Button size="icon" variant="ghost" className="mr-2" onClick={onBack}>
          <ArrowLeftIcon className="size-4 text-[#9a9a97]" />
        </Button>
      )}
      <span className="grow font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </span>
      <button onClick={onClose} className="flex items-center justify-center rounded-full bg-[#37352f0f] size-[18px] hover:bg-[#37352f29]">
        <XIcon className="size-3.5 text-[#787874]" />
      </button>
    </div> 
  );
}