import { iconVariant, WorkspaceIcon } from "./workspace-icon";
import { WorkspaceTrigger } from "./workspace-trigger";
import { WorkspaceContent } from "./workdpace-content";
import { VariantProps } from "class-variance-authority";
import { WorkspaceKey } from "@/types/workspace";

interface WorkspaceProps extends VariantProps<typeof iconVariant> {
  className?: string;
  children: React.ReactNode;
  href: string;
  label: string;
  icon: React.ElementType;
  workspaceKey: WorkspaceKey;
}

export const Workspace = ({ className, children, ...props }: WorkspaceProps) => {
  return (
    <div className="flex flex-col gap-[1px] pb-0">
      <WorkspaceTrigger {...props}>
        <WorkspaceIcon className={className} {...props} />
      </WorkspaceTrigger>
      <WorkspaceContent workspaceKey={props.workspaceKey}>
        {children}
      </WorkspaceContent>
    </div>
  );
}
