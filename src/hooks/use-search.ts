/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";

type SearchableItem = {
  [key: string]: any;
}

export const useSearch = <T extends SearchableItem>(
  items: T[],
  searchKey: (keyof T)[],
) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;

    return items.filter((item) => 
      searchKey.some((key) => item[key].toString().toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [items, searchKey, searchQuery]);
  
  return {
    searchQuery,
    setSearchQuery,
    filteredItems
  };
}