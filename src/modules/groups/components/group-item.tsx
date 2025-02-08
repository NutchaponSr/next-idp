import { DotIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { HashIcon } from "@/components/icons";

import { GroupRename } from "@/modules/groups/components/group-rename";
import { GroupActions } from "@/modules/groups/components/group-actions";
import { SidebarItem } from "@/modules/dashboard/components/sidebar-item";

import { ResponseType } from "@/modules/groups/api/use-get-groups";
import { useSidebarToggle } from "@/modules/dashboard/stores/use-sidebar-toggle";

interface GroupItemProps {
  group: ResponseType;
}

export const GroupItem = ({ group }: GroupItemProps) => {
  const { on, toggle } = useSidebarToggle();

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
        background="none"
        indent="pl-5"
        label={group.name}
        isOpen={on[group.id]}
        href={`/groups/${group.id}`}
        onToggle={() => toggle(group.id)}
        trigger={group.icon ? group.icon : <HashIcon className="size-5 text-[#91918e]" />}
        actions={<GroupActions group={group} onRename={onRename} />}
      >
        <SidebarItem
          notChild
          indent="pl-7"
          label="Competency"
          background="none"
          href={`/groups/${group.id}/competencies`}
          trigger={<DotIcon className="size-6" />}
        />
        <SidebarItem
          notChild
          indent="pl-7"
          label="Employee"
          background="none"
          href={`/groups/${group.id}/employees`}
          trigger={<DotIcon className="size-6" />}
        />
      </SidebarItem>
      <GroupRename isOpen={isRename} height={height} onClose={() => setIsRename(false)} />
    </>
  );
}