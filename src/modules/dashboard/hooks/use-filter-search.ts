import { format, isWithinInterval, parse } from "date-fns";
import { parseAsString, useQueryState } from "nuqs";

import { SortSearchOptions } from "@/types/filter";

const serializeDate = (date: Date | null) => date ? format(date, "yyyy-MM-dd") : "";
const deserializeDate = (date: string | null) => date ? parse(date, "yyyy-MM-dd", new Date()) : null;

export const useFilterSearch = () => {
  const [sort, setSort] = useQueryState("sort", parseAsString);
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [type, setType] = useQueryState("type", { defaultValue: "create" });
  const [from, setFrom] = useQueryState("from", {
    parse: deserializeDate,
    serialize: serializeDate,
    defaultValue: null,
  });
  const [to, setTo] = useQueryState("to", {
    parse: deserializeDate,
    serialize: serializeDate,
    defaultValue: null,
  });

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

  const onClearDate = () => {
    setFrom(null);
    setTo(null);
  }

  const onEdit = () => setType("edit");
  const onCreate = () => setType("create");

  const onRange = (date: Date) => {
    if (!from || (from && to)) {
      setFrom(date);
      setTo(null);
    } else {
      if (date < from) {
        setTo(from);
        setFrom(null);
      } else {
        setTo(date);
      }
    }
  }

  const isInRange = (date: Date) => {
      if (!from || !to) return false;
      return isWithinInterval(date, { start: from, end: to });
    }

  const isFilter = sort !== null;

  return {
    to,
    from, 
    type,
    sort, 
    search, 
    sortOptions, 
    onEdit,
    onCreate,
    onChangeSearch, 
    onClearDate,
    onRange,
    isInRange,
    isFilter 
  };
}