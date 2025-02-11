import { FilterData, FilterVariant } from "@/types/filter";
import { FilterCommand } from "./filter-command";

interface FilterProps {
  data: FilterData;
  label: string;
  icon: React.ElementType;
  variant: FilterVariant;
  onSelect: (value: string[]) => void;
}

export const Filter = ({ 
  data,
  label,
  icon, 
  variant,
  onSelect
}: FilterProps) => {
  switch (variant) {
    case FilterVariant.COMMAND: {
      return (
        <FilterCommand 
          data={data} 
          icon={icon} 
          label={label} 
          onSelect={onSelect}
        />
      );
    }
  }
}