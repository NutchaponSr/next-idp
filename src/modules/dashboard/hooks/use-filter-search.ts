import { parseAsString, useQueryState } from "nuqs";

import { SortSearchOptions } from "@/types/filter";

export const useFilterSearch = () => {
  const [sort, setSort] = useQueryState("sort", parseAsString);
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });

  const sortOptions: SortSearchOptions = {
    DEFAULT: () => setSort(null),
    EDITED_DESC: () => setSort("EDITED_DESC"),
    EDITED_ASC: () => setSort("EDITED_ASC"),
    CREATED_DESC: () => setSort("CREATED_DESC"),
    CREATED_ASC: () => setSort("CREATED_ASC"),
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSearch(e.target.value);
  }

  const isFilter = sort !== null;

  return { sort, search, sortOptions, onChangeSearch, isFilter };
}