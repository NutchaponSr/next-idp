import { CornerDownRightIcon, PlusIcon } from "lucide-react";

import { useTable } from "@/stores/use-table";
import { useMoreSidebar } from "@/stores/use-more-sidebar";

import { useSearch } from "@/hooks/use-search"
;
import { MoreButton } from "@/components/more-button";
import { MoreHeader } from "@/components/more-sidebar";
import { ClearableInput } from "@/components/clearable-input";
import { FilterColumns } from "./filter-columns";

export const FilterSidebar = () => {
  const { 
    type, 
    isOpenItem, 
    onBack,
    onCloseSidebar
  } = useMoreSidebar();

  const { 
    filterColumns,
    selectedFilterColumns,
    addFilterColumn,
  } = useTable();

  const {
    searchQuery,
    filteredItems,
    setSearchQuery
  } = useSearch(filterColumns, ["label"]);

  const open = isOpenItem && type === "filter";

  if (!open) return null;

  if (selectedFilterColumns.length === 0) {
    return (
      <div className="shrink-0 h-full">
        <MoreHeader label="Add filters" onClose={onCloseSidebar} onBack={onBack} />
        <div className="p-1 flex flex-col">
          <div className="flex items-center gap-2 leading-[120%] min-h-7 text-sm py-1 px-2">
            <ClearableInput 
              area="sm" 
              value={searchQuery}
              variant="search" 
              placeholder="Filter by..."
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery("")}
            />
          </div>
        </div>
        <div className="flex flex-col p-1">
          {filteredItems.map((item, index) => (
            <MoreButton 
              key={index}
              icon={item.icon}
              label={String(item.label)}
              onClick={() => addFilterColumn(item)}
              isColumn
            />
          ))}
        </div>
        <div className="flex flex-col p-1 shadow-[0_-1px_0_rgba(55,53,47,0.09)]">
          <MoreButton icon={PlusIcon} label="Add advanced filter" className="text-[#9a9a97]" />
        </div>
      </div>
    );
  }

  return (
    <div className="shrink-0 h-full">
      <MoreHeader label="Filters" onClose={onCloseSidebar} onBack={onBack} />
      <div className="flex flex-col p-1 justify-start items-start">
        {selectedFilterColumns.map((column, index) => (
          <div key={index} className="flex items-center p-1 px-2.5 w-full space-x-1">
            <div className="flex items-center justify-center size-6 shrink-0">
              <CornerDownRightIcon className="size-4 stroke-[1.5] text-[#9a9a97]" />
            </div>
            <FilterColumns {...{ ...column, label: String(column.label) }} />
          </div>
        ))}
        <MoreButton icon={PlusIcon} label="Add filter" className="text-[#9a9a97]" />
      </div>
    </div>
  );
}