import React from "react";

import { ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { IconVariant } from "@/types/icon";

interface MoreButtonProps {
  icon?: React.ElementType;
  label: string;
  isColumn?: boolean;
  className?: string;
  description?: string;
  variant?: IconVariant;
  onClick?: () => void;
  action?: JSX.Element;
}

export const MoreButton = ({
  icon,
  label,
  isColumn,
  description,
  className,
  variant,
  onClick,
  action
}: MoreButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      className={cn("w-[calc(100%-8px)] rounded-md text-primary hover:bg-[#37352f0f]", className)}
    >
      <div className="flex items-center w-full min-h-7 text-sm">
        {icon && (
          <div className="flex items-center justify-center ml-2.5 mr-1">
            {React.createElement(icon, { className: cn("size-4 text-primary", className), variant })}
          </div>
        )}
        <span className={cn("mx-2 min-w-0 flex-auto whitespace-nowrap overflow-hidden text-ellipsis text-start", isColumn && "capitalize")}>
          {label}
        </span>
        <div className="ml-auto mr-2 shrink-0 flex items-center text-[#37352f80]">
        {description && (
          <>
            <span className="flex whitespace-nowrap overflow-hidden text-ellipsis text-xs capitalize">{description}</span>
            <ChevronRightIcon className="size-4 ml-1.5 text-[#9a9a97]" />
          </>
        )}
        {action && action}
        </div>
      </div>
    </button>
  );
}