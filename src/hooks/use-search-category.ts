import { useMemo, useState } from "react";

type NestedKey<T> = {
  [K in keyof T]: T[K] extends object ? K : never;
}[keyof T]

type NestedValue<T, K extends NestedKey<T>> = T[K] extends (infer U)[] ? U : never;

export const useSearchCategory = <T, K extends NestedKey<T>>(
  items: T[],
  searchKeys: (keyof NestedValue<T, K>)[],
  nestedKey: K,
) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItem = useMemo(() => {
    if (!searchQuery) return items;

    return items
      .map((item) => ({
        ...item,
        [nestedKey]: (item[nestedKey] as string[]).filter((nestedItem) => 
          searchKeys.some((key) => 
            nestedItem[key as keyof typeof nestedItem].toString().toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      }))
  }, [items, nestedKey, searchKeys, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredItem,
  };
}