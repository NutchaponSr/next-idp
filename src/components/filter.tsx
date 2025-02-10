import { FilterData, FilterVariant } from "@/types/filter";
import { FilterCommand } from "./filter-command";

interface FilterProps {
  data: FilterData;
  label: string;
  icon: React.ElementType;
  variant: FilterVariant;
}

export const Filter = ({ 
  data,
  label,
  icon, 
  variant 
}: FilterProps) => {
  switch (variant) {
    case FilterVariant.COMMAND: {
      return <FilterCommand label={label} icon={icon} data={data} />
    }
  }
}