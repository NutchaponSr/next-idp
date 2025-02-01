import { useToggle } from "react-use";

import { iconVariant, WorkspaceIcon } from "./workspace-icon";
import { WorkspaceTrigger } from "./workspace-trigger";
import { WorkspaceContent } from "./workdpace-content";
import { VariantProps } from "class-variance-authority";

interface WorkspaceProps extends VariantProps<typeof iconVariant> {
  className?: string;
  href: string;
  label: string;
  icon: React.ElementType;
}

export const Workspace = ({ className, ...props }: WorkspaceProps) => {
  const [on, toggle] = useToggle(false);

  return (
    <WorkspaceComponent>
      <WorkspaceTrigger {...props}>
        <WorkspaceIcon className={className} onToggle={toggle} {...props} />
      </WorkspaceTrigger>
      {on && <WorkspaceContent />}
    </WorkspaceComponent>
  );
}

const WorkspaceComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-[1px] pb-0">{children}</div>
  );
}