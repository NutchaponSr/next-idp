/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";

type NestedKey<T> = {
  [K in keyof T]: T[K] extends object ? K : never
}[keyof T]

type NestedValue<T, K extends NestedKey<T>> = T[K] extends (infer U)[] ? U : never

export const useSearch = <T, K extends NestedKey<T>>(
  items: T[],
  searchKeys: (keyof NestedValue<T, K>)[],
  nestedKey: K,
) => {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items

    return items
      .map((item) => ({
        ...item,
        [nestedKey]: (item[nestedKey] as any[]).filter((nestedItem) =>
          searchKeys.some((key) =>
            nestedItem[key as keyof typeof nestedItem].toString().toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        ),
      }))
      .filter((item) => (item[nestedKey] as any[]).length > 0)
  }, [items, searchKeys, searchQuery, nestedKey])

  return { searchQuery, setSearchQuery, filteredItems }
}
