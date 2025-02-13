import { create } from "zustand";

import { TrashCategory } from "@/types/trash";

type SearchCommandStore = {
  isOpen: boolean;
  peoples: string[];
  categories: TrashCategory[]
  isSelectPeople: boolean;
  isSelectCategory: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelectPeople: (ids: string[]) => void;
  onSelectCategory: (ids: string[]) => void; 
}

export const useSearchCommand = create<SearchCommandStore>((set) => ({
  isOpen: false,
  peoples: [],
  categories: [],
  isSelectPeople: false,
  isSelectCategory: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onSelectPeople: (ids) => set(() => ({
    peoples: ids,
    isSelectPeople: ids.length > 0,
  })),
  onSelectCategory: (ids) => set(() => ({
    categories: ids as TrashCategory[],
    isSelectCategory: ids.length > 0,
  }))
}));