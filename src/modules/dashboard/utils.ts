import { addDays, isSameDay } from "date-fns";
import { gte, lte, SQLWrapper } from "drizzle-orm";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function formatDateCondition(
  from: Date | null,
  to: Date | null,
  field: any
): SQLWrapper[] {
  if (!from && !to) return [];

  if (from && to && isSameDay(from, to)) {
    return [gte(field, from)];
  }

  return [
    from && gte(field, from),
    to && lte(field, addDays(to, 1))
  ].filter(Boolean) as SQLWrapper[];
}