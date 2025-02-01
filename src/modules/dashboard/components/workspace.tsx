import { useToggle } from "react-use";

import { IconVariant } from "@/types/icon";

import { FolderLibraryIcon } from "@/components/icons";

import { WorkspaceTrigger } from "./workspace-trigger";
import { WorkspaceContent } from "./workdpace-content";

interface WorkspaceProps {
  className?: string;
  href: string;
  label: string;
  icon: JSX.Element;
}

export const Workspace = (workspaceProps: WorkspaceProps) => {
  const [on, toggle] = useToggle(false);

  return (
    <WorkspaceComponent>
      <WorkspaceTrigger 
        {...workspaceProps}
        onToggle={toggle}
      >
        {workspaceProps.icon}
        {/* <FolderLibraryIcon className="size-[18px] fill-[#ac5488]" variant={IconVariant.BULK} /> */}
      </WorkspaceTrigger>
      {on && (
        <WorkspaceContent />
      )}
    </WorkspaceComponent>
  );
}

const WorkspaceComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-[1px] pb-0">{children}</div>
  );
}