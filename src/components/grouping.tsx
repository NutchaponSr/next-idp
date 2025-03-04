import { useSearch } from "@/hooks/use-search";

import { useTable } from "@/stores/use-table";
import { useMoreSidebar } from "@/stores/use-more-sidebar";

import { MoreHeader } from "@/components/more-sidebar";
import { ClearableInput } from "@/components/clearable-input";
import { MoreButton } from "./more-button";
import { GroupingOptions } from "./grouping-options";
import { HelpCircleIcon, TrashIcon } from "./icons";
import { useLayout } from "@/stores/use-layout";
import { Layout } from "@/types/filter";
import { useRef } from "react";

export const Grouping = () => {
  const {  
    type,
    isOpenItem,
    onCloseSidebar,
    onBack
  } = useMoreSidebar();
  const { 
    columns,
    groupingSelect,
    groupingHeaders,
    onSelectGrouping,
    removeGrouping
  } = useTable();
  const { onChange } = useLayout();

  const {
    searchQuery,
    filteredItems,
    setSearchQuery
  } = useSearch(columns, ["label"]);

  const containerRef = useRef<HTMLDivElement>(null);

  const open = isOpenItem && type === "grouping";

  if (!open) return null;

  if (!groupingSelect) {
    return (
      <div className="shrink-0 h-full">
        <MoreHeader label="Group by" onClose={onCloseSidebar} onBack={onBack} />
        <div className="p-1 flex flex-col">
          <div className="flex items-center gap-2 leading-[120%] min-h-7 text-sm py-1 px-2">
            <ClearableInput 
              area="sm" 
              value={searchQuery}
              variant="search" 
              placeholder="Search for a property..."
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery("")}
            />
          </div>
        </div>
        <div className="flex flex-col p-1">
          {filteredItems.map((item ,index) => (
            <MoreButton 
              key={index}
              icon={item.icon}
              label={String(item.label)}
              onClick={() => {
                onChange(Layout.GROUPING);
                onSelectGrouping(item);
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="shrink-0 h-full">
      <MoreHeader label="Group" onClose={onCloseSidebar} onBack={onBack} />
      <div className="flex flex-col p-1">
        <MoreButton 
          label="Group by"
          description={String(groupingSelect.label)}
        />
        <GroupingOptions column={groupingSelect} />
      </div>
      <div className="flex flex-col p-1 shadow-[0_-1px_0_rgba(55,53,47,0.09)]">
        <div className="flex px-2 my-2 text-[#37352fa6] text-xs h-5 w-full items-center">
          <h2 className="flex self-center font-medium">Visible groups</h2>
          <div className="ml-auto">
            <button className="text-marine text-xs transition hover:bg-[#ebf5fe] py-0.5 px-1.5 inline-flex items-center rounded-md whitespace-nowrap font-medium" onClick={() => {}}> 
              Hide all
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-1 shadow-[0_-1px_0_rgba(55,53,47,0.09)]">
        <div className="flex px-2 my-2 text-[#37352fa6] text-xs h-5 w-full items-center">
          <h2 className="flex self-center font-medium">hidden groups</h2>
          <div className="ml-auto">
            <button className="text-marine text-xs transition hover:bg-[#ebf5fe] py-0.5 px-1.5 inline-flex items-center rounded-md whitespace-nowrap font-medium" onClick={() => {}}> 
              Show all
            </button>
          </div>
        </div> 
        <pre>
          {JSON.stringify(groupingHeaders, null, 2)}
        </pre>
      </div>
      <div className="flex flex-col p-1 shadow-[0_-1px_0_rgba(55,53,47,0.09)]">
        <button 
          onClick={() => {
            removeGrouping();
            onChange(Layout.TABLE);
          }} 
          className="w-[calc(100%-8px)] rounded-md text-[#9a9a97] hover:bg-[#37352f0f] group transition-colors"
        >
          <div className="flex items-center w-full min-h-7 text-sm">
            <div className="flex items-center justify-center ml-2.5 mr-1">
              <TrashIcon className="size-4 text-[#9a9a97] group-hover:text-destructive" />
            </div>
            <span className="mx-2 min-w-0 flex-auto whitespace-nowrap overflow-hidden text-ellipsis text-start group-hover:text-destructive">
              Remove grouping
            </span>
          </div>
        </button>
        <MoreButton 
          icon={HelpCircleIcon}
          label="Learn about grouping"
          className="text-[#9a9a97]"
        />
      </div>
    </div> 
  )
}
