import { asc, desc } from "drizzle-orm";

import { IconType } from "@/types/icon";

export enum FilterVariant {
  COMMAND = "COMMAND", 
  DROPDOWN = "DROPDOWN", 
  CALENDAR = "CALENDAR",
  COLUMN = "COLUMN",
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

export enum ColumnVariant {
  TEXT = "TEXT",
}

export enum FilterCondition {
  IS = "is",
  IS_NOT = "isNot",
  CONTAINS = "contains",
  DOES_NOT_CONTAIN = "doesNotContain",
  STARTS_WITH = "startsWith",
  ENDS_WITH = "endsWith",
  IS_EMPTY = "isEmpty",
  IS_NOT_EMPTY = "isNotEmpty"
}

export type SortOrder = "asc" | "desc";

export const sorts: Record<SortOrder, { label: string; value: SortOrder }> = {
  asc: { label: "Ascending", value: "asc" },
  desc: { label: "Descending", value: "desc" },
}

export interface ColumnProps<T extends object> {
  label: keyof T;
  isFilter: boolean;
  icon: React.ElementType;
  variant: ColumnVariant;
  searchQuery?: string;
  condition: FilterCondition;
  sortOrder: (typeof sorts)[keyof typeof sorts] | null;
  order: number;
}


export enum Layout {
  TABLE = "TABLE",
  BOARD = "BOARD",
  LIST = "LIST",
  GALLERY = "GALLERY",
}

export interface LayoutConfig {
  mode: Layout;
  icon: React.ElementType;
  label: string;
};

export enum PageView {
  SIDE = "SIDE",
  CENTER = "CENTER",
  FULL = "FULL",
}

export interface PageViewProps {
  view: PageView;
  icon: React.ElementType;
  label: string;
  description: string;
  default?: boolean;
}