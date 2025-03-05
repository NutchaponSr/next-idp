import { create } from "zustand";

import { TableStore } from "@/types/table";
import { ColumnProps, FilterCondition, GroupingProps, sorts } from "@/types/filter";

const calIsAnySortActive = <T extends object>(columns: ColumnProps<T>[]) => 
  columns.some((col) => col);
const calIsAnyFilterActive = <T extends object>(columns: ColumnProps<T>[]) => 
  columns.some((col) => col.isFiltered);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useTable = create<TableStore<any>>((set) => ({
  // Base state
  columns: [],
  sortColumns: [],
  filterColumns: [],
  selectedSortColumns: [],
  selectedFilterColumns: [],

  // UI state
  isOpenSort: false,
  isOpenFilter: false,

  // Computed properties
  isSort: false,
  isFilter: false,
  isAnySortActive: false,
  isAnyFilterActive: false,

  // Initialize columns
  setColumns: (columns) => set({
    columns,
    sortColumns: columns.filter((col) => !col.isSorted),
    filterColumns: columns.filter((col) => !col.isFiltered),
  }),

  // Sort actions
  onOpenSort: () => set({ isOpenSort: true }),
  onCloseSort: () => set({ isOpenSort: false }),
  onSortOrder: (label, key) => set((state) => {
    const selectedSortColumns = state.selectedSortColumns.map((item) => 
      item.label === label ? { ...item, sortOrder: sorts[key] } : item
    );
    
    return {
      selectedSortColumns,
      isAnySortActive: calIsAnySortActive(selectedSortColumns),
    };
  }),
  addSortColumn: (column) => set((state) => {
    const maxOrder = state.selectedSortColumns.length > 0
      ? Math.max(...state.selectedSortColumns.map((col) => col.order))
      : 0;

    const updatedSort = { ...column, sortOrder: sorts.asc, order: maxOrder + 100 };
    const newSelectedColumns = [...state.selectedSortColumns, updatedSort];
    
    return {
      isSort: newSelectedColumns.length > 0,
      isAnySortActive: calIsAnySortActive(newSelectedColumns),
      selectedSortColumns: newSelectedColumns,
      sortColumns: state.sortColumns.filter((item) => item.label !== column.label),
    };
  }),
  removeSortColumn: (label) => set((state) => {
    const newSelectedColumns = state.selectedSortColumns.filter((item) => item.label !== label);
    const removedColumn = state.selectedSortColumns.find((item) => item.label === label);

    return {
      isSort: newSelectedColumns.length > 0,
      isAnySortActive: calIsAnySortActive(newSelectedColumns),
      selectedSortColumns: newSelectedColumns,
      sortColumns: removedColumn ? [...state.sortColumns, { ...removedColumn, sortOrder: null }] : state.sortColumns,
    };
  }),
  removeSortAll: () => set((state) => ({
    isSort: false,
    isAnySortActive: false,
    selectedSortColumns: [],
    sortColumns: state.sortColumns.map((col) => ({ ...col, sortOrder: null })),
  })),
  onSortReorder: (newOrder) => set((state) => ({
    selectedSortColumns: newOrder.map((col, index) => ({ ...col, order: ((index + 1) * 100) })),
    isAnySortActive: calIsAnySortActive(state.selectedSortColumns),
  })),

  // Filter actions
  onOpenFilter: () => set({ isOpenFilter: true }),
  onCloseFilter: () => set({ isOpenFilter: false }),
  addFilterColumn: (column) => set((state) => {
    const updatedFilter = { ...column, searchQuery: "", isFiltered: false };
    const newSelectedColumns = [...state.selectedFilterColumns, updatedFilter];

    return {
      selectedFilterColumns: newSelectedColumns,
      filterColumns: state.filterColumns.filter((item) => item.label !== column.label),
      isFilter: newSelectedColumns.length > 0,
      isAnyFilterActive: newSelectedColumns.some((item) => item.isFiltered),
    };
  }),
  removeFilterColumn: (label) => set((state) => {
    const newColumns = state.selectedFilterColumns.filter((item) => item.label !== label);
    const removedColumn = state.selectedFilterColumns.find((item) => item.label === label);

    return {
      selectedFilterColumns: newColumns,
      isFilter: newColumns.length > 0,
      isAnyFilterActive: calIsAnyFilterActive(newColumns),
      filterColumns: removedColumn ? [...state.filterColumns, { ...removedColumn, searchQuery: "", condition: FilterCondition.CONTAINS }] : state.filterColumns,
    };
  }),
  onSearchQuery: (label, query) => set((state) => {
    const newSelectedColumns = state.selectedFilterColumns.map((item) =>
      item.label === label ? { ...item, searchQuery: query, isFiltered: query.length > 0 } : item
    );

    return {
      selectedFilterColumns: newSelectedColumns,
      isAnyFilterActive: calIsAnyFilterActive(newSelectedColumns), 
    };
  }),
  onCondition: (label, condition) => set((state) => ({
    selectedFilterColumns: state.selectedFilterColumns.map((item) =>
      item.label === label ? { ...item, condition } : item),
    isAnyFilterActive: calIsAnyFilterActive(state.selectedFilterColumns),
  })),

  // Properties  
  selectRows: new Set<string>(),
  toggleAllSelection: (ids: string[]) => set((state) => {
    const newSelectedRows = new Set(state.selectRows);
    const allSelected = ids.every((id) => newSelectedRows.has(id));
    
    if (allSelected) {
      ids.forEach((id) => newSelectedRows.delete(id))
    } else {
      ids.forEach((id) => newSelectedRows.add(id))
    }

    return { selectRows: newSelectedRows }
  }),
  toggleRowSelection: (id: string) => set((state) => {
    const newSelectedRow = new Set(state.selectRows);

    if (newSelectedRow.has(id)) {
      newSelectedRow.delete(id);
    } else {
      newSelectedRow.add(id);
    }

    return { selectRows: newSelectedRow };
  }),
  toggleColumnVisible: (label) => set((state) => ({
    columns: state.columns.map((col) =>
      col.label === label ? { ...col, isHide: !col.isHide } : col
    ),
  })),
  showAllColumns: () => set((state) => ({
    columns: state.columns.map((col) => ({ ...col, isHide: false })),
  })),
  hideAllColumns: () => set((state) => ({
    columns: state.columns.map((col) => ({ ...col, isHide: col.isLock ? col.isHide : true })),
  })),
  reorderColumn: (columns) => set(() => {
    return {
      columns: columns.map((col, index) => ({
        ...col,
        id: index + 1,
      }))
    }
  }),

  // Grouping
  groupingHeaders: {},
  groupingSelect: null,
  onSelectGrouping: (column) => set({ groupingSelect: column }),
  removeGrouping: () => set({ groupingSelect: null, groupingHeaders: {} }),
  reorderGrouping: (newOrder) => set((state) => {
    const visibleHeaders = newOrder.filter((key) => state.groupingHeaders[key]?.isShow); // กรองเฉพาะ isShow: true
  
    const updatedHeaders = Object.keys(state.groupingHeaders).reduce(
      (acc, key) => {
        acc[key] = {
          ...state.groupingHeaders[key],
          order: visibleHeaders.includes(key) ? visibleHeaders.indexOf(key) : state.groupingHeaders[key].order,
        };
        return acc;
      },
      {} as Record<string, GroupingProps>,
    );
  
    return { groupingHeaders: updatedHeaders };
  }),
  setGroupingHeaders: (headers) => set({ groupingHeaders: headers }),
  toggleGroup: (header) => set((state) => ({
    groupingHeaders: {
      ...state.groupingHeaders,
      [header]: {
        ...state.groupingHeaders[header],
        isOpen: !state.groupingHeaders[header]?.isOpen,
      },
    },
  })),
  toggleGroupVisible: (header) => set((state) => ({
    groupingHeaders: {
      ...state.groupingHeaders,
      [header]: {
        ...state.groupingHeaders[header],
        isShow: !state.groupingHeaders[header]?.isShow,
      },
    },
  })),
  showAllGroup: () => set((state) => ({
    groupingHeaders: Object.keys(state.groupingHeaders).reduce((acc, key) => ({
      ...acc,
      [key]: { ...state.groupingHeaders[key], isShow: true },
    }), {} as Record<string, GroupingProps>)
  })),
  hideAllGroup: () => set((state) => ({
    groupingHeaders: Object.keys(state.groupingHeaders).reduce((acc, key) => ({
      ...acc,
      [key]: { ...state.groupingHeaders[key], isShow: false },
    }), {} as Record<string, GroupingProps>)
  })),
}))