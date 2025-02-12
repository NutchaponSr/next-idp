"use client";

import { FilterData, FilterVariant } from "@/types/filter";
import { FilterCommand } from "./filter-command";
import { FilterDropdownMenu } from "./filter-dropdown-menu";

interface FilterProps {
  data: FilterData;
  label: string;
  icon: React.ElementType;
  variant: FilterVariant;
  onSelect?: (value: string[]) => void;
}

export const Filter = ({ 
  data,
  label,
  icon, 
  variant,
  onSelect
}: FilterProps) => {
  switch (variant) {
    case FilterVariant.COMMAND: {
      return (
        <FilterCommand 
          data={data} 
          icon={icon} 
          label={label} 
          onSelect={onSelect}
        />
      );
    }
    case FilterVariant.DROPDOWN: {
      return (
        <FilterDropdownMenu 
          label={label}
          icon={icon}
        />
      );
    }
  }
}