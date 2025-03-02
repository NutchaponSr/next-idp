import { useMore } from "@/stores/use-more";

import { MoreHeader } from "@/components/more-sidebar";
import { useTable } from "@/stores/use-table";
import { useSearch } from "@/hooks/use-search";
import { ClearableInput } from "./clearable-input";
import { MoreButton } from "./more-button";
import { PlusIcon } from "lucide-react";

interface FilterSidebarProps {
  onClose: () => void;
}

export const FilterSidebar = ({ onClose }: FilterSidebarProps) => {
  const { type, isOpen, onBack } = useMore();

  const { 
    filterColumns,
    selectedFilterColumns
  } = useTable();

  const {
    searchQuery,
    filteredItems,
    setSearchQuery
  } = useSearch(filterColumns, ["label"]);

  const open = isOpen && type === "filter";

  const handleClose = () => {
    onClose();
    onBack();
  }

  if (!open) return null;

  if (selectedFilterColumns.length === 0) {
    return (
      <div className="shrink-0 h-full">
        <MoreHeader label="Add filters" onClose={handleClose} onBack={onBack} />
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
      <MoreHeader label="Add filters" onClose={handleClose} onBack={onBack} />
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
    </div>
  );
}