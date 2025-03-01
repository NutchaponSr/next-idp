import { ColumnText } from "@/components/column-text";

import { ColumnVariant, ColumnProps } from "@/types/filter";

export const FilterColumns = <T extends object>({ ...props }: ColumnProps<T>) => {
  switch (props.variant) {
    case ColumnVariant.TEXT: {
      return (
        <ColumnText 
          {...props} 
          isFilter={props.isFiltered} 
          searchQuery={props.searchQuery!} 
          label={props.label as string} 
        />
      );
    }
  }
}