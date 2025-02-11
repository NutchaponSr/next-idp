import { SidebarItem } from "@/modules/dashboard/components/sidebar-item";
import { CompetencyActions } from "@/modules/competencies/components/competency-actions";

import { ResponseType } from "../api/use-get-competencies";
import { CompetencyRename } from "./competency-rename";
import { useEffect, useRef, useState } from "react";

interface CompetencyItemProps {
  competency: ResponseType;
}

export const CompetencyItem = ({
  competency
}: CompetencyItemProps) => {
  const [height, setHeight] = useState(0);
  const [isRename, setIsRename] = useState(false);

  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRename && itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setHeight(rect.top);
    }
  }, [isRename]);

  const onRename = () => {
    setTimeout(() => {
      setIsRename(true);
    }, 200);
  }

  return (
    <>
      <div ref={itemRef} />
      <SidebarItem 
        key={competency.id}
        label={competency.name}
        indent="pl-5"
        href={`/competencies/${competency.id}`}
        trigger={competency.icon}
        background="none"
        actions={<CompetencyActions competency={competency} onRename={onRename} />}
      />
      <CompetencyRename 
        height={height}
        isOpen={isRename}
        id={competency.id}
        name={competency.name}
        onClose={() => setIsRename(false)}
      />
    </>
  );
}