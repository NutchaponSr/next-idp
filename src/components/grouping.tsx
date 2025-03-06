import { useRef } from "react";
import { Reorder } from "framer-motion";
import { GripVerticalIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { IconVariant } from "@/types/icon";

import { useSearch } from "@/hooks/use-search";

import { useTable } from "@/stores/use-table";
import { useMoreSidebar } from "@/stores/use-more-sidebar";

import { 
  EyeIcon,
  EyeOffIcon,
  HelpCircleIcon, 
  TrashIcon 
} from "@/components/icons";
import { MoreButton } from "@/components/more-button";
import { MoreHeader } from "@/components/more-sidebar";
import { ClearableInput } from "@/components/clearable-input";
import { GroupingOptions } from "@/components/grouping-options";

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
    removeGrouping,
    reorderGrouping,
    toggleGroupVisible,
    showAllGroup,
    hideAllGroup,
  } = useTable();

  const {
    searchQuery,
    filteredItems,
    setSearchQuery
  } = useSearch(columns, ["label"]);

  const containerRef = useRef<HTMLDivElement>(null);

  const open = isOpenItem && type === "grouping";

  if (!open) return null;

  const headerItems = Object.entries(groupingHeaders)
    .filter(([, value]) => value.isShow)
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([key]) => key);

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
          {filteredItems.map((item ,index) => {
            return (
              <MoreButton 
                key={index}
                icon={item.icon}
                label={String(item.label)}
                onClick={() => {
                  onSelectGrouping(item);
                }}
              />
            );
          })}
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
            <button className="text-marine text-xs transition hover:bg-[#ebf5fe] py-0.5 px-1.5 inline-flex items-center rounded-md whitespace-nowrap font-medium" onClick={hideAllGroup}> 
              Hide all
            </button>
          </div>
        </div>
        <div ref={containerRef}>
          <Reorder.Group
            axis="y"
            values={headerItems}
            onReorder={reorderGrouping}
          > 
            {headerItems.map((item) => (
              <Reorder.Item
                key={item}
                value={item}
                dragConstraints={containerRef}
                dragElastic={0}
              >
                <div className="transition cursor-pointer w-full flex hover:bg-[#37352f0f] rounded-md">
                  <div className="flex items-center gap-2 leading-[120%] w-full min-h-7 px-2">
                    <div className="whitespace-nowrap overflow-hidden text-ellipsis flex-auto">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center w-[18px] h-6 shrink-0 cursor-grab">
                          <GripVerticalIcon className="size-4 shrink-0 text-[#9a9a97]" />
                        </div>
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis capitalize text-sm">
                          {item} 
                        </span>
                      </div>
                    </div>
                    <div className="ml-auto shrink-0 flex items-center space-x-1">
                      <button 
                        onClick={() => toggleGroupVisible(item)}
                        className="transition inline-flex items-center justify-center shrink-0 rounded-md size-6 hover:bg-[#37352f0f]"
                      >
                        <EyeIcon className="size-4 text-primary" variant={IconVariant.SOLID} />
                      </button>
                    </div>
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </div>
      <div className="flex flex-col p-1 shadow-[0_-1px_0_rgba(55,53,47,0.09)]">
        <div className="flex px-2 my-2 text-[#37352fa6] text-xs h-5 w-full items-center">
          <h2 className="flex self-center font-medium">hidden groups</h2>
          <div className="ml-auto">
            <button className="text-marine text-xs transition hover:bg-[#ebf5fe] py-0.5 px-1.5 inline-flex items-center rounded-md whitespace-nowrap font-medium" onClick={showAllGroup}> 
              Show all
            </button>
          </div>
        </div>
        <div>
          {Object.entries(groupingHeaders).filter(([, value]) => !value.isShow).map(([header]) => (
            <div key={header}>
              <div className="transition cursor-pointer w-full flex hover:bg-[#37352f0f] rounded-md">
                <div className="flex items-center gap-2 leading-[120%] w-full min-h-7 px-2">
                  <div className="whitespace-nowrap overflow-hidden text-ellipsis flex-auto">
                    <div className="flex items-center space-x-2">
                      <div className={cn(
                        "flex items-center justify-center w-[18px] h-6 shrink-0",
                        !groupingHeaders[header].isShow ? "opacity-50 cursor-not-allowed" : " cursor-grab",
                      )}>
                        <GripVerticalIcon className="size-4 shrink-0 text-[#9a9a97]" />
                      </div>
                      <span className="whitespace-nowrap overflow-hidden text-ellipsis capitalize text-sm">
                        {header} 
                      </span>
                    </div>
                  </div>
                  <div className="ml-auto shrink-0 flex items-center space-x-1">
                    <button className="transition hover:bg-[#37352f0f] inline-flex items-center justify-center shrink-0 rounded-md size-6" onClick={() => toggleGroupVisible(header)}>
                      <EyeOffIcon className="size-4 text-[#9a9a97]" variant={IconVariant.SOLID} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col p-1 shadow-[0_-1px_0_rgba(55,53,47,0.09)]">
        <button 
          onClick={() => {
            removeGrouping();
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
