import { useTable } from "@/stores/use-table";
import { useMoreSidebar } from "@/stores/use-more-sidebar";

import { useSearch } from "@/hooks/use-search";

import { MoreHeader } from "@/components/more-sidebar";
import { ClearableInput } from "@/components/clearable-input";
import { MoreButton } from "./more-button";
import { Sort } from "./sort";

export const SortSidebar = () => {
  const { 
    sortColumns, 
    selectedSortColumns,
    addSortColumn,
    onSortOrder,
    onSortReorder,
    removeSortColumn,
    removeSortAll
  } = useTable();
  const {
    type,
    isOpenItem,
    onBack,
    onCloseSidebar
  } = useMoreSidebar();

  const {
    searchQuery,
    filteredItems,
    setSearchQuery
  } = useSearch(sortColumns, ["label"]);

  const open = isOpenItem && type === "sort";

  if (!open) return null;

  if (selectedSortColumns.length === 0) {
    return (
      <div className="shrink-0 h-full">
        <MoreHeader label="New sort" onClose={onCloseSidebar} onBack={onBack} />
        <div className="p-1 flex flex-col">
          <div className="flex items-center gap-2 leading-[120%] min-h-7 text-sm py-1 px-2">
            <ClearableInput 
              area="sm" 
              value={searchQuery}
              variant="search" 
              placeholder="Sort by..."
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
              onClick={() => addSortColumn(item)}
              isColumn
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="shrink-0 h-full">
      <MoreHeader label="Sort" onClose={onCloseSidebar} onBack={onBack} />
      <Sort 
        sortColumns={sortColumns}
        selectedSortColumns={selectedSortColumns}
        addSortColumn={addSortColumn}
        onSortOrder={onSortOrder}
        onSortReorder={onSortReorder}
        removeSortColumn={removeSortColumn}
        removeSortAll={removeSortAll}
      />
    </div>
  );
}