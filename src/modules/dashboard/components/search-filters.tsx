import { FilterVariant, sortSearchs } from "@/types/filter";

import { Filter } from "@/components/filter";
import { ArrowUpDownIcon } from "@/components/icons";

export const SearchFilters = () => {
  return (
    <div className="flex items-center relative grow-0 overflow-hidden">
      <div className="flex items-center py-2.5 px-3 overflow-x-auto overflow-y-hidden space-x-1.5">
        <Filter 
          label="Sort"
          icon={ArrowUpDownIcon}
          variant={FilterVariant.DROPDOWN}
          onSelect={() => {}}
          data={sortSearchs}
        />
      </div>
    </div>
  );
}