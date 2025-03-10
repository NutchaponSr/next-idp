import { 
  ColumnProps, 
  FilterCondition, 
  GroupingProps, 
  SortOrder 
} from "@/types/filter";

type BaseStore<T extends object> = {
  columns: ColumnProps<T>[];
  setColumns: (columns: ColumnProps<T>[]) => void;
}

type SortState<T extends object> = {
  isOpenSort: boolean;
  selectedSortColumns: ColumnProps<T>[];
  sortColumns: ColumnProps<T>[];
}

type SortActions<T extends object> = {
  onOpenSort: () => void;
  onCloseSort: () => void;
  onSortOrder: (label: keyof T, key: SortOrder) => void;
  addSortColumn: (column: ColumnProps<T>) => void;
  removeSortColumn: (label: keyof T) => void;
  removeSortAll: () => void;
  onSortReorder: (newOrder: ColumnProps<T>[]) => void;
}

type SortComputed = {
  isSort: boolean; // Open popover
  isAnySortActive: boolean;
}

type FilterState<T extends object> = {
  isOpenFilter: boolean;
  selectedFilterColumns: ColumnProps<T>[];
  filterColumns: ColumnProps<T>[];
}

type FilterActions<T extends object> = {
  onOpenFilter: () => void;
  onCloseFilter: () => void;
  addFilterColumn: (column: ColumnProps<T>) => void;
  removeFilterColumn: (label: keyof T) => void;
  onSearchQuery: (label: keyof T, query: string) => void;
  onCondition: (label: keyof T, condition: FilterCondition) => void;
}

type FilterComputed = {
  isFilter: boolean; // Open popover
  isAnyFilterActive: boolean;
}

type PropertiesActions<T extends object> = {
  selectRows: Set<string>;
  showAllColumns: () => void;
  hideAllColumns: () => void;
  toggleColumnVisible: (label: keyof T) => void;
  toggleRowSelection: (id: string) => void;
  toggleAllSelection: (ids: string[]) => void;
  reorderColumn: (columns: ColumnProps<T>[]) => void;
}

type GroupingState<T extends object> = {
  groupingHeaders: Record<string, GroupingProps>;
  groupingSelect: ColumnProps<T> | null;
  showAggregation: boolean;
  groupOption: Record<string, { label: string; value: string }>;
  setGroupOption: (option: Record<string, { label: string; value: string }>) => void;
  onSelectGrouping: (column: ColumnProps<T>) => void;
  removeGrouping: () => void;
  reorderGrouping: (newOrder: string[]) => void;
  setGroupingHeaders: (headers: Record<string, GroupingProps>) => void;
  toggleAggregation: () => void;
  toggleGroup: (header: string) => void;
  toggleGroupVisible: (header: string) => void;
  showAllGroup: () => void;
  hideAllGroup: () => void;
}

export type TableStore<T extends object> = 
  BaseStore<T> &
  SortState<T> &
  SortActions<T> &
  SortComputed &
  FilterState<T> &
  FilterActions<T> &
  FilterComputed &
  PropertiesActions<T> & 
  GroupingState<T>;

export interface BaseComponents<T extends { id: string }> {
  data: T[];
  columns: ColumnProps<T>[];
  isOpenToolbar: boolean;
  searchQuery: string;
  renderCell: (cell: T, column: ColumnProps<T>, searchQuery: string) => JSX.Element | undefined;
}