import { asc, desc } from "drizzle-orm";

import { IconType } from "@/types/icon";

export enum FilterVariant {
  COMMAND = "COMMAND", 
  DROPDOWN = "DROPDOWN", 
}

export type FilterData = {
  id: string;
  label: string;
  header?: string | null;
  icon?: IconType;
}[]

export const sortMap = {
  EDITED_ASC: [asc, "updatedAt"],
  EDITED_DESC: [desc, "updatedAt"],
  CREATED_ASC: [asc, "createdAt"],
  CREATED_DESC: [desc, "createdAt"],
  DEFAULT: [desc, "id"],
} as const;

export const sortSearchs: FilterData = [
  { id: "DEFAULT", label: "Best match" },
  { id: "EDITED_DESC", label: "Last edited: Newest first" },
  { id: "EDITED_ASC", label: "Last edited: Oldest first" },
  { id: "CREATED_DESC", label: "Created: Newest first" },
  { id: "CREATED_ASC", label: "Created: Oldest first" },
]