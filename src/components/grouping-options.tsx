import { ColumnProps, ColumnVariant } from "@/types/filter"
import { GroupingText } from "./grouping-text";

interface GroupingOptionsProps<T extends object> {
  column: ColumnProps<T>;
}

export const GroupingOptions = <T extends object>({ column }: GroupingOptionsProps<T>) => {
  switch (column.variant) {
    case ColumnVariant.TEXT: 
      return <GroupingText column={column} />
  }
}