import { format, isWithinInterval, parse, startOfToday, subDays } from "date-fns";
import { parseAsString, useQueryState } from "nuqs";

import { RangeBy, SortSearchOptions } from "@/types/filter";

const serializeDate = (date: Date | null) => date ? format(date, "yyyy-MM-dd") : "";
const deserializeDate = (date: string | null) => date ? parse(date, "yyyy-MM-dd", new Date()) : null;

export const useFilterSearch = () => {
  const [sort, setSort] = useQueryState("sort", parseAsString);
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
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
  const [rangeBy, setRangeBy] = useQueryState<RangeBy>("rangeBy", {
    parse: (value) => value as RangeBy,
    defaultValue: RangeBy.CREATE,
    history: "push",
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

  const isSort = sort !== null;
  const isRangeDate = from !== null;

  const setToday = () => {
    setTo(startOfToday());
    setFrom(startOfToday());
  }
  const setWeek = () => {
    setTo(startOfToday());
    setFrom(subDays(startOfToday(), 7));
  }
  const setMonth = () => {
    setTo(startOfToday());
    setFrom(subDays(startOfToday(), 30));
  }

  const onEdit = () => setRangeBy(RangeBy.EDIT);
  const onCreate = () => setRangeBy(RangeBy.CREATE);

  const formatDateRange = () => {
    if (!from || !to) return "Date";
    return `Date: ${format(from, "MMM d, y")} - ${format(to, "MMM d, y")}`
  }

  const formatRangeBy = () => {
    switch (rangeBy) {
      case RangeBy.CREATE: return "Created";
      case RangeBy.EDIT: return "Last edited";
    }
  }

  return {
    to,
    from, 
    rangeBy,
    sort, 
    search, 
    isSort,
    sortOptions, 
    isRangeDate,
    onEdit,
    onCreate,
    onChangeSearch, 
    onClearDate,
    onRange,
    isInRange,
    setToday,
    setWeek,
    setMonth,
    formatDateRange,
    formatRangeBy
  };
}