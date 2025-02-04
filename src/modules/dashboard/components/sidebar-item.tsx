import { cn } from "@/lib/utils";
import { IconWrapper } from "./icon-wrapper";

interface SiderbarItemProps {
  actions?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ElementType;
  indent?: string;
  isOpen: boolean;
  label: string;
  onToggle: () => void;
  background: "default" | "pink" | "orange" | "none";
}

export const SiderbarItem = ({
  actions,
  background,
  children,
  icon,
  indent,
  isOpen,
  label,
  onToggle
}: SiderbarItemProps) => {
  return (
    <button className={cn("group/workspace flex items-center min-h-[30px] p-1 hover:bg-[#00000008] w-full", indent)}>
      <div className="flex items-center w-full">
        <IconWrapper 
          icon={icon}
          isOpen={isOpen} 
          onToggle={onToggle} 
          background={background}
        >
          {children}
        </IconWrapper>
        <div className="whitespace-nowrap overflow-hidden text-ellipsis text-start text-sm w-full">
          {label}
        </div>
        {actions && (
          <div className="flex items-center justify-center grow-0 shrink-0 h-full">
            <div className="group-hover/workspace:opacity-100 opacity-0 transition-opacity">
              {actions}
            </div>
          </div>
        )}
      </div>
    </button>
  );
}