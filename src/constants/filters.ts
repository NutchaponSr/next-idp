import { 
  ColumnVariant, 
  ColumnProps, 
  FilterCondition, 
  FilterData, 
  Layout,
  LayoutConfig,
  PageView,
  PageViewProps,
  CalculationType,
  CalculationCategory
} from "@/types/filter";

import { 
  CenterIcon, 
  FullScreenIcon, 
  Layout3ColumnsIcon, 
  ListIcon, 
  SidebarRightIcon, 
  Square1Icon, 
  TableIcon, 
  TextFontIcon 
} from "@/components/icons";

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
    isSorted: false,
    isFiltered: false,
    icon: TextFontIcon,
    variant: ColumnVariant.TEXT,
    condition: FilterCondition.CONTAINS,
    searchQuery: "",
    sortOrder: null,
    order: 0,
    width: 248,
    calculation: null,
    isHide: false,
  },
  {
    label: "year",
    isSorted: false,
    isFiltered: false,
    icon: TextFontIcon,
    variant: ColumnVariant.TEXT,
    condition: FilterCondition.CONTAINS,
    searchQuery: "",
    sortOrder: null,
    order: 0,
    width: 248,
    calculation: null,
    isHide: false,
  },
];

export const calculationPrefixes: Record<CalculationType, string> = {
  [CalculationType.COUNT_ALL]: "COUNT",
  [CalculationType.COUNT_VALUES]: "VALUES",
  [CalculationType.COUNT_UNIQUE]: "UNIQUE",
  [CalculationType.COUNT_EMPTY]: "EMPTY",
  [CalculationType.COUNT_NOT_EMPTY]: "NOT EMPTY",
  [CalculationType.PERCENT_EMPTY]: "EMPTY",
  [CalculationType.PERCENT_NOT_EMPTY]: "NOT EMPTY",
};

export const calculations: CalculationCategory[] = [
  {
    label: "Count",
    options: [
      { 
        type: CalculationType.COUNT_ALL, 
        label: "Count all",  
        image: "/count.png",
        description: "Counts the total page number of pages, including blank pages.",
      },
      { 
        type: CalculationType.COUNT_VALUES, 
        label: "Count values",  
        image: "/countValues.png",
        description: "Counts the number of non-empty values for this property. For a type that can contain multiple values like multi-select or person, this will count the number of selected values for each page.",
      },
      { 
        type: CalculationType.COUNT_UNIQUE, 
        label: "Count unique",  
        image: "/unique.png",
        description: "Counts the number of unique values for this property. For a type that can contain multiple values like multi-select or person, this will count the unique values across all pages.",
      },
      { 
        type: CalculationType.COUNT_EMPTY, 
        label: "Count empty",  
        image: "/empty.png",
        description: "Counts the number of pages with an empty value for this property.",
      },
      { 
        type: CalculationType.COUNT_NOT_EMPTY, 
        label: "Count not empty",  
        image: "/notEmpty.png",
        description: "Counts the number of pages with a non-empty value for this property.",
      },
    ],
  },
  {
    label: "Percent",
    options: [
      { 
        type: CalculationType.PERCENT_EMPTY, 
        label: "Percent empty",  
        image: "/empty.png",
        description: "Displays the percentage of pages that have an empty value for this property.",
      },
      { 
        type: CalculationType.PERCENT_NOT_EMPTY, 
        label: "Percent not empty",  
        image: "/notEmpty.png",
        description: "Displays the percentage of pages that have a non-empty value for this property.",
      },
    ],
  },
]

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

export const layouts: Record<Layout, LayoutConfig> = {
  [Layout.TABLE]: {
    mode: Layout.TABLE,
    icon: TableIcon,
    label: "Table",
  },
  [Layout.BOARD]: {
    mode: Layout.BOARD,
    icon: Layout3ColumnsIcon,
    label: "Board",
  },
  [Layout.LIST]: {
    mode: Layout.LIST,
    icon: ListIcon,
    label: "List",
  },
  [Layout.GALLERY]: {
    mode: Layout.GALLERY,
    icon: Square1Icon,
    label: "Gallery",
  },
};

export const pageViews: Record<PageView, PageViewProps> = {
  [PageView.SIDE]: {
    view: PageView.SIDE,
    icon: SidebarRightIcon,
    label: "Side peek",
    description: "Open pages on this side. Keeps the view behind interactive.",
    default: true,
  },
  [PageView.CENTER]: {
    view: PageView.CENTER,
    icon: CenterIcon,
    label: "Center peek",
    description: "Open pages in a focused, centered modal.",
  },
  [PageView.FULL]: {
    view: PageView.FULL,
    icon: FullScreenIcon,
    label: "Full page",
    description: "Open page in full page.",
  },
}