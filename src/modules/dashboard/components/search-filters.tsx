import { 
  FilterVariant, 
  SortSearchOptions, 
} from "@/types/filter";

import { Filter } from "@/components/filter";
import { ArrowUpDownIcon, CalendarDaysIcon, File1Icon, UserIcon } from "@/components/icons";
import { useFilterSearch } from "../hooks/use-filter-search";
import { useSearchCommand } from "../stores/use-search-command";
import { trashCategoryies } from "@/constants/trashs";
import { sortSearchs } from "@/constants/filters";

interface SearchFiltersProps {
  peoples: {
    id: string;
    label: string;
    header: string | null;
  }[];
}

export const SearchFilters = ({ peoples }: SearchFiltersProps) => {
  const { 
    to,
    from,
    sortOptions, 
    isSort,
    isRangeDate,
    isInRange,
    onCreate,
    onClearDate,
    onEdit,
    onRange,
    setMonth,
    setToday,
    setWeek,
    formatDateRange,
    formatRangeBy
  } = useFilterSearch();

  const { 
    isSelectPeople,
    isSelectCategory,
    onSelectPeople, 
    onSelectCategory 
  } = useSearchCommand();

  return (
    <div className="flex items-center relative grow-0 overflow-hidden">
      <div className="flex items-center py-2.5 px-3 overflow-x-auto overflow-y-hidden space-x-1.5">
        <Filter 
          label="Sort"
          isFilter={isSort}
          icon={ArrowUpDownIcon}
          variant={FilterVariant.DROPDOWN}
          data={sortSearchs.map((item) => ({ 
            ...item, 
            onClick: sortOptions[item.id as keyof SortSearchOptions],
          }))}
        />
        <Filter 
          label="Created By"
          isFilter={isSelectPeople}
          icon={UserIcon}
          variant={FilterVariant.COMMAND}
          data={peoples.map((item) => ({ 
            ...item, 
            onSelect: onSelectPeople,
          }))}
        />
        <Filter 
          label="In"
          isFilter={isSelectCategory}
          icon={File1Icon}
          variant={FilterVariant.COMMAND}
          data={trashCategoryies.map((item) => ({ 
            ...item, 
            onSelect: onSelectCategory,
          }))}
        />
        <Filter 
          label={formatDateRange()}
          isFilter={isRangeDate}
          icon={CalendarDaysIcon}
          variant={FilterVariant.CALENDAR}
          onRange={onRange}
          date={{
            start: from,
            end: to, 
          }}
          isInRange={isInRange}
          onClearDate={onClearDate}
          presets={[
            { label: "Today", onClick: setToday },
            { label: "Last 7 days", onClick: setWeek },
            { label: "Last 30 days", onClick: setMonth },
          ]}
          ranges={{
            label: formatRangeBy(),
            ranges: [
              { label: "Created", onClick: onCreate },
              { label: "Last edited", onClick: onEdit },
            ]
          }}
        />
      </div>
    </div>
  );
}