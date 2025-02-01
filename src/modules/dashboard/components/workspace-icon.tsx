import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkpaceIconProps {
  className?: string;
  children: React.ReactNode;
  onToggle: () => void;
}

export const WorkspaceIcon = ({
  className,
  children,
  onToggle
}: WorkpaceIconProps) => {
  return (
    <div className={cn("shrink-0 grow-0 rounded-sm flex justify-center items-center mr-2 ml-1 transition-all")}>
      <div className="flex items-center justify-center shrink-0 grow-0 size-[22px] relative">
        <div className="grid">
          <div className="row-start-1 col-start-1 row-auto col-auto">
            <div 
              role="button"
              className={cn(
                "absolute inset-0 flex items-center justify-center rounded-sm transition-opacity duration-100 group-hover/workspace:opacity-0",
                className
              )}
            >
              {children}
            </div>
            <div
              role="button"
              className="absolute inset-0 flex items-center justify-center rounded-sm bg-[#37352f0f] opacity-0 transition-opacity duration-100 group-hover/workspace:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            >
              <ChevronRightIcon className="h-[18px] w-[18px] text-[#91918e]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}