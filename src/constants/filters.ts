import { FilterData } from "@/types/filter";

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