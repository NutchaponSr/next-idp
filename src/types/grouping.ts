import { ColumnVariant } from "@/types/filter";

import { 
  NumberBy,
  NumberSort,
  TextBy, 
  TextSort
} from "@/enums/grouping";

export const TEXT_BY_KEY = "Text by";
export const SORT_KEY = "Sort";


type TextByMethod = Record<TextBy, { label: string, value: TextBy }>;
type TextSortMethod = Record<TextSort, { label: string, value: TextSort }>;
type NumberByMethod = Record<NumberBy, { label: string, value: NumberBy }>;
type NumberSortMethod = Record<NumberSort, { label: string, value: NumberSort }>;

interface BaseGrouping {
  type: ColumnVariant;
}

interface Text extends BaseGrouping {
  type: ColumnVariant.TEXT,
  content: [
    {
      label: string;
      method: TextByMethod;
    },
    {
      label: string;
      method: TextSortMethod;
    },
  ];
}

interface Number extends BaseGrouping {
  type: ColumnVariant.NUMBER,
  content: [
    {
      label: string;
      method: NumberByMethod;
    },
    {
      label: string;
      method: NumberSortMethod;
    },
  ];
}

type Grouping = Text | Number;

export type GroupingCatalog = {
  [P in Grouping as P["type"]]: P;
}