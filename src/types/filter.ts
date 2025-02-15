import { asc, desc } from "drizzle-orm";

import { IconType } from "@/types/icon";

export enum FilterVariant {
  COMMAND = "COMMAND", 
  DROPDOWN = "DROPDOWN", 
  CALENDAR = "CALENDAR",
}

export enum RangeBy {
  CREATE = "CREATE",
  EDIT = "EDIT",
}

export type FilterData = {
  id: string;
  label: string;
  header?: string | null;
  icon?: IconType;
  onClick?: (id: string) => void;
  onSelect?: (id: string[]) => void;
}[]

export const sortMap = {
  EDITED_ASC: [asc, "updatedAt"],
  EDITED_DESC: [desc, "updatedAt"],
  CREATED_ASC: [asc, "createdAt"],
  CREATED_DESC: [desc, "createdAt"],
  DEFAULT: [desc, "id"],
} as const;

export type SortSearchOptions = {
  DEFAULT: () => void;
  EDITED_DESC: () => void;
  EDITED_ASC: () => void;
  CREATED_DESC: () => void;
  CREATED_ASC: () => void;
};

interface BaseFilterProps {
  label: string;
  icon: React.ElementType;
  variant: FilterVariant;
  isFilter: boolean;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface Range {
  label: string;
  ranges: {
    label: string;
    onClick: () => Promise<URLSearchParams>;
  }[];
}

interface CommonFilterProps extends BaseFilterProps {
  variant: FilterVariant.COMMAND | FilterVariant.DROPDOWN;
  data: FilterData;
}

interface CalendarFilterProps extends BaseFilterProps {
  variant: FilterVariant.CALENDAR;
  date: DateRange;
  onClearDate: () => void;
  onRange: (date: Date) => void;
  isInRange: (date: Date) => boolean;
  presets: {
    label: string;
    onClick: () => void;
  }[];
  ranges: Range;
}

export type FilterProps = CommonFilterProps | CalendarFilterProps;