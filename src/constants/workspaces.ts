import { FolderLibraryIcon, Notebook1Icon, UsersIcon } from "@/components/icons";
import { Workspace } from "@/types/workspace";

export const Group: Workspace = {
    label: "Group",
    href: "/groups",
    description: "Combining diverse skills to achieve shared goals.",
    icon: FolderLibraryIcon,
    className: "bg-[#f5e0e9] dark:bg-[#4e2c3c]",
    variant: "pink",
    size: "lg"
};

export const Competency: Workspace = {
  label: "Competency",
  href: "/competencies",
  description: "Diverse skills and competencies to achieve shared goals.",
  icon: Notebook1Icon,
  className: "bg-[#fadec9] dark:bg-[#5c3b23]",
  variant: "orange",
  size: "lg"
}

export const Employee: Workspace = {
  label: "Employee",
  href: "/employees",
  description: "Manage employees with diverse competencies to achieve goals.",
  icon: UsersIcon,
  className: "bg-[#d8e5ee] dark:bg-[#143a4e]",
  variant: "blue",
  size: "lg"
}