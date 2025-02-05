import { Notebook2Icon } from "@/components/icons";
import { headers } from "@/constants/competencies";

import { SidebarItem } from "@/modules/dashboard/components/sidebar-item";

export const CompetencySpace = () => {
  return (
    headers.map((header) => (
      <SidebarItem 
        key={header.type}
        label={header.title}
        indent="pl-3"
        href={`/competencies?type=${header.type}`}
        icon={Notebook2Icon}
        variant={header.variant}
        background={header.background}
      />
    ))
  );
}