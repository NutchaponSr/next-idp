import { 
  ColumnVariant, 
  ColumnProps, 
  FilterCondition, 
  FilterData 
} from "@/types/filter";

import { TextFontIcon } from "@/components/icons";
import { ResponseType } from "@/modules/groups/api/use-get-groups-by-year";

export const sortSearchs: FilterData = [
  { 
    id: "DEFAULT", 
    label: "Best match",
  },
  { 
    id: "EDITED_DESC", 
    label: "Last edited: Newest first" ,
  },
  { 
    id: "EDITED_ASC", 
    label: "Last edited: Oldest first",
  },
  { 
    id: "CREATED_DESC", 
    label: "Created: Newest first",
  },
  { 
    id: "CREATED_ASC", 
    label: "Created: Oldest first",
  },
]

export const groupColumns: ColumnProps<ResponseType>[] = [
  {
    label: "name",
    isFilter: false,
    icon: TextFontIcon,
    variant: ColumnVariant.TEXT,
    condition: FilterCondition.CONTAINS,
    searchQuery: "",
    sortOrder: null,
    order: 0,
  },
];

export const filterConditions: Record<FilterCondition, { label: string; value: FilterCondition }> = {
  [FilterCondition.IS]: { label: "Is", value: FilterCondition.IS },
  [FilterCondition.IS_NOT]: { label: "Is not", value: FilterCondition.IS_NOT },
  [FilterCondition.CONTAINS]: { label: "Contains", value: FilterCondition.CONTAINS },
  [FilterCondition.DOES_NOT_CONTAIN]: { label: "Does not contain", value: FilterCondition.DOES_NOT_CONTAIN },
  [FilterCondition.STARTS_WITH]: { label: "Starts with", value: FilterCondition.STARTS_WITH },
  [FilterCondition.ENDS_WITH]: { label: "Ends with", value: FilterCondition.ENDS_WITH },
  [FilterCondition.IS_EMPTY]: { label: "Is empty", value: FilterCondition.IS_EMPTY },
  [FilterCondition.IS_NOT_EMPTY]: { label: "Is not empty", value: FilterCondition.IS_NOT_EMPTY }
}