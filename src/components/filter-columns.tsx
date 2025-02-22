import { ColumnVariant, FilterColumnProps } from "@/types/filter";
import { ColumnText } from "./column-text";


export const FilterColumns = <T extends object>({ ...props }: FilterColumnProps<T>) => {
  switch (props.variant) {
    case ColumnVariant.TEXT: {
      return (
        <ColumnText 
          {...props} 
          isFilter={props.isFilter} 
          searchQuery={props.searchQuery!} 
          label={props.label as string} 
        />
      );
    }
  }
}