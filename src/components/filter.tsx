"use client";

import { FilterData, FilterVariant } from "@/types/filter";
import { FilterCommand } from "./filter-command";
import { FilterDropdownMenu } from "./filter-dropdown-menu";

interface FilterProps {
  data: FilterData;
  label: string;
  icon: React.ElementType;
  variant: FilterVariant;
  isFilter: boolean;
}

export const Filter = ({ 
  data,
  label,
  icon, 
  variant,
  isFilter
}: FilterProps) => {
  switch (variant) {
    case FilterVariant.COMMAND: {
      return (
        <FilterCommand 
          data={data} 
          icon={icon} 
          label={label} 
          isFilter={isFilter}
        />
      );
    }
    case FilterVariant.DROPDOWN: {
      return (
        <FilterDropdownMenu
          isFilter={isFilter} 
          label={label}
          icon={icon}
          data={data}
        />
      );
    }
  }
}