import { ColumnProps } from "@/types/filter";
import { MoreButton } from "./more-button";
import { grouping } from "@/constants/filters";

interface GroupingTextProps<T extends object> {
  column: ColumnProps<T>;
}

export const GroupingText = <T extends object>({ column }: GroupingTextProps<T>) => {
  return (
    <>
      {Object.values(grouping["TEXT"].content).map((item) => (
        <MoreButton 
          label={item.label}
          description="None"
        />
      ))}
    </>
  );
}