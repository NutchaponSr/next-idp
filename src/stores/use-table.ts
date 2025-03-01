import { create } from "zustand";

import { TableStore } from "@/types/table";
import { ColumnProps, sorts } from "@/types/filter";

const calIsAnySortActive = <T extends object>(columns: ColumnProps<T>[]) => 
  columns.some((col) => col.sortOrder !== null);
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
      
      return {
        selectedSortColumns: [...state.selectedSortColumns, updatedSort],
        isSort: state.selectedSortColumns.length > 0,
        isAnySortActive: calIsAnySortActive([...state.selectedSortColumns, updatedSort]),
      };
    }),
    removeSortColumn: (label) => set((state) => ({
      selectedSortColumns: state.selectedSortColumns.filter((item) => item.label !== label),
      isSort: state.selectedSortColumns.length > 0,
      isAnySortActive: calIsAnySortActive(state.selectedSortColumns),
    })),
    removeSortAll: () => set((state) => ({
      isSort: false,
      isAnySortActive: false,
      selectedSortColumns: [],
      columns: state.columns.map((col) => ({ ...col, sortOrder: null })),
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

      return {
        selectedFilterColumns: [...state.selectedFilterColumns, updatedFilter],
        filterColumns: state.filterColumns.filter((item) => item.label !== column.label),
        isFilter: state.selectedFilterColumns.length > 0,
        isAnyFilterActive: calIsAnyFilterActive(state.selectedFilterColumns),
      };
    }),
    removeFilterColumn: (label) => set((state) => ({
      selectedFilterColumns: state.selectedFilterColumns.filter((item) => item.label !== label),
      isFilter: state.selectedFilterColumns.length > 0,
      isAnyFilterActive: calIsAnyFilterActive(state.selectedFilterColumns),
    })),
    onSearchQuery: (label, query) => set((state) => ({
      selectedFilterColumns: state.selectedFilterColumns.map((item) =>
        item.label === label 
          ? { ...item, searchQuery: query, isFiltered: query.length > 0 } 
          : item),
      isAnyFilterActive: calIsAnyFilterActive(state.selectedFilterColumns),
    })),
    onCondition: (label, condition) => set((state) => ({
      selectedFilterColumns: state.selectedFilterColumns.map((item) =>
        item.label === label ? { ...item, condition } : item),
      isAnyFilterActive: calIsAnyFilterActive(state.selectedFilterColumns),
    })),
    toggleColumnVisible: (label) => set((state) => ({
      columns: state.columns.map((col) =>
        col.label === label ? { ...col, isHide: !col.isHide } : col
      ),
    })),
  })
)