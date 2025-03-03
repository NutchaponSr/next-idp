import React, { useRef } from "react";

import { 
  ChevronRightIcon, 
  GripVerticalIcon 
} from "lucide-react";
import { Reorder } from "framer-motion";

import { cn } from "@/lib/utils";
import { IconVariant } from "@/types/icon";

import { useMoreSidebar } from "@/stores/use-more-sidebar";
import { useTable } from "@/stores/use-table";

import { useSearch } from "@/hooks/use-search";

import { 
  EyeIcon, 
  EyeOffIcon, 
  HelpCircleIcon
} from "@/components/icons";
import { MoreButton } from "@/components/more-button";
import { MoreHeader } from "@/components/more-sidebar";
import { ClearableInput } from "@/components/clearable-input";

export const Properties = () => {
  const {
    type, 
    isOpenItem, 
    onBack,
    onCloseSidebar
  } = useMoreSidebar();

  const { 
    columns,
    showAll,
    hideAll,
    reorderColumn, 
    toggleColumnVisible 
  } = useTable();
  
  const { 
    filteredItems,
    searchQuery, 
    setSearchQuery
  } = useSearch(columns, ["label"]);

  const containerRef = useRef<HTMLDivElement>(null);

  const open = isOpenItem && type === "property";

  if (!open) return null;

  return (
    <div className="shrink-0 h-full">
      <MoreHeader label="Property" onClose={onCloseSidebar} onBack={onBack} />
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
          {/* Shown in table */}
          <div className="flex px-2 my-2 text-[#37352fa6] text-xs h-5 w-full items-center">
            <h2 className="flex self-center">Shown in table</h2>
            <div className="ml-auto">
              <button className="text-marine text-xs transition hover:bg-[#ebf5fe] py-0.5 px-1.5 inline-flex items-center rounded-md whitespace-nowrap font-medium" onClick={hideAll}>
                Hide all
              </button>
            </div>
          </div>
          <div ref={containerRef}>
            <Reorder.Group 
              axis="y" 
              values={filteredItems} 
              onReorder={(newOrder) => {
                const updatedColumns = newOrder.map((col, index) => ({
                  ...col,
                  id: index + 1,
                }));
          
                reorderColumn(updatedColumns);
              }}
            >
              {filteredItems.filter((item) => !item.isHide).map((item) => (
                <Reorder.Item
                  key={String(item.label)}
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
                          {item.icon && <item.icon className="size-4 shrink-0 text-primary" />}
                          <span className="whitespace-nowrap overflow-hidden text-ellipsis capitalize text-sm">
                            {String(item.label)} 
                          </span>
                        </div>
                      </div>
                      <div className="ml-auto shrink-0 flex items-center space-x-1">
                        <button 
                          onClick={() => toggleColumnVisible(item.label)}
                          className={cn(
                            "transition inline-flex items-center justify-center shrink-0 rounded-md size-6",
                            item.isLock ? "cursor-default" : "hover:bg-[#37352f0f]"
                          )} 
                          disabled={item.isLock}
                        >
                          <EyeIcon className={cn("size-4", item.isLock ? "text-[#9a9a97]" : "text-primary")} variant={IconVariant.SOLID} />
                        </button>
                        <ChevronRightIcon className="size-3 text-[#9a9a97] shrink-0" />
                      </div>
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
          {/* Hidden in table */}
          {filteredItems.filter((item) => item.isHide).length > 0 && (
            <div className="flex px-2 my-2 text-[#37352fa6] text-xs h-5 w-full items-center">
              <h2 className="flex self-center">Hidden in table</h2>
              <div className="ml-auto">
                <button className="text-marine text-xs transition hover:bg-[#ebf5fe] py-0.5 px-1.5 inline-flex items-center rounded-md whitespace-nowrap font-medium" onClick={showAll}>
                  Show all
                </button>
              </div>
            </div>
          )}
          {filteredItems.filter((item) => item.isHide).map((item) => (
          <div key={String(item.label)}>
            <div className="transition cursor-pointer w-full flex hover:bg-[#37352f0f] rounded-md">
              <div className="flex items-center gap-2 leading-[120%] w-full min-h-7 px-2">
                <div className="whitespace-nowrap overflow-hidden text-ellipsis flex-auto">
                  <div className="flex items-center space-x-2">
                    <div className={cn(
                      "flex items-center justify-center w-[18px] h-6 shrink-0",
                      item.isHide ? "opacity-50 cursor-not-allowed" : " cursor-grab",
                    )}>
                      <GripVerticalIcon className="size-4 shrink-0 text-[#9a9a97]" />
                    </div>
                    {item.icon && <item.icon className="size-4 shrink-0 text-primary" />}
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis capitalize text-sm">
                      {String(item.label)} 
                    </span>
                  </div>
                </div>
                <div className="ml-auto shrink-0 flex items-center space-x-1">
                  <button className="transition hover:bg-[#37352f0f] inline-flex items-center justify-center shrink-0 rounded-md size-6" onClick={() => toggleColumnVisible(item.label)}>
                    <EyeOffIcon className="size-4 text-[#9a9a97]" variant={IconVariant.SOLID} />
                  </button>
                  <ChevronRightIcon className="size-3 text-[#9a9a97] shrink-0" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-1 flex flex-col shadow-[0_-1px_0_rgba(55,53,47,0.09)]">
        <MoreButton 
          icon={HelpCircleIcon}
          label="Learn about properties"
          className="text-[#9a9a97]"
        />
      </div>
    </div>
  );
};
