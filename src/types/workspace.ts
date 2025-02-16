import { iconVariant } from "@/modules/dashboard/components/trigger";
import { VariantProps } from "class-variance-authority";

export enum WorkspaceKey {
  GROUP = "GROUP",
  COMPETENCY = "COMPETENCY",
  YEAR = "YEAR"
} 

export interface Workspace extends VariantProps<typeof iconVariant> {
  href: string
  label: string;
  description: string;
  icon: React.ElementType;
  className: string;
}