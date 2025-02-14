"use client";

import { FilterProps, FilterVariant } from "@/types/filter";

import { FilterCommand } from "@/components/filter-command";
import { FilterCalendar } from "@/components/filter-calendar";
import { FilterDropdownMenu } from "@/components/filter-dropdown-menu";

export const Filter = (props: FilterProps) => {
  switch (props.variant) {
    case FilterVariant.COMMAND: {
      return <FilterCommand {...props} />
    }
    case FilterVariant.DROPDOWN: {
      return <FilterDropdownMenu {...props} />
    }
    case FilterVariant.CALENDAR: {
      return <FilterCalendar {...props} />
    }
  }
}