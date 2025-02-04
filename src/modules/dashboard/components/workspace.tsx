import { useRouter } from "next/navigation";
import { VariantProps } from "class-variance-authority";

import { WorkspaceKey } from "@/types/workspace";

import { 
  iconVariant, 
  IconWrapper 
} from "@/modules/dashboard/components/icon-wrapper";
import { Content } from "@/modules/dashboard/components/content";

import { useToggle } from "@/modules/dashboard/stores/use-toggle";
interface WorkspaceProps extends VariantProps<typeof iconVariant> {
  children: React.ReactNode;
  href: string;
  label: string;
  icon: React.ElementType;
  background: "default" | "pink" | "orange";
  workspaceKey: WorkspaceKey;
}

export const Workspace = ({ 
  background,
  children,
  href,
  label,
  icon,
  workspaceKey,
  variant
}: WorkspaceProps) => {
  const router = useRouter();
  const { on, toggle } = useToggle();

  return (
    <div className="flex flex-col gap-[1px] pb-0">
      <button
        onClick={() => router.push(href)}
        className="flex items-center hover:bg-[#00000008] min-h-[30px] h-[30px] p-1 group/workspace"
      >
        <IconWrapper 
          icon={icon}
          background={background}
          onToggle={() => toggle(workspaceKey)}
          isOpen={on[workspaceKey]}
          variant={variant}
        />
        <div className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
          {label}
        </div>
      </button>
      <Content isOpen={on[workspaceKey]}>
        {children}
      </Content>
    </div>
  );
}
