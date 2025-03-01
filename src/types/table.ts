import { 
  ColumnProps, 
  FilterCondition, 
  SortOrder 
} from "@/types/filter"

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
  onCondition: (label:  keyof T, condition: FilterCondition) => void;
}

type FilterComputed = {
  isFilter: boolean; // Open popover
  isAnyFilterActive: boolean;
}

type PropertiesActions<T extends object> = {
  toggleColumnVisible: (label: keyof T) => void;
}

export type TableStore<T extends object> = 
  BaseStore<T> &
  SortState<T> &
  SortActions<T> &
  SortComputed &
  FilterState<T> &
  FilterActions<T> &
  FilterComputed &
  PropertiesActions<T>;