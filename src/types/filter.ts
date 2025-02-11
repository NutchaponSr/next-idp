import { IconType } from "./icon";

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