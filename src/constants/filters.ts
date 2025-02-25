import { 
  ColumnVariant, 
  ColumnProps, 
  FilterCondition, 
  FilterData, 
  Layout,
  LayoutConfig,
  PageView,
  PageViewProps
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