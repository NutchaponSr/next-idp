import { FilterData } from "@/types/filter";
import { TrashCategory } from "@/types/trash";

import { 
  FolderLibraryIcon, 
  Notebook1Icon 
} from "@/components/icons";

export const trashCategoryies: FilterData = [
  {
    id: TrashCategory.GROUP,
    label: "Group",
    icon: FolderLibraryIcon
  },
  { 
    id: TrashCategory.COMPETENCY, 
    label: "Competency", 
    icon: Notebook1Icon,
  },
]