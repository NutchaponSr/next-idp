import { useRouter } from "next/navigation";

import { WorkspaceIcon } from "./workspace-icon";

interface WorkspaceItemProps {
  className?: string;
  children: React.ReactNode;
  href: string;
  label: string;
  onToggle: () => void;
}

export const WorkspaceTrigger = ({
  className,
  children,
  href,
  label,
  onToggle
}: WorkspaceItemProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      className="flex items-center hover:bg-[#00000008] min-h-[30px] h-[30px] p-1 group/workspace"
    >
      <WorkspaceIcon className={className} onToggle={onToggle}>
        {children}
      </WorkspaceIcon>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
        {label}
      </div>
    </button>
  );
}