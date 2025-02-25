import React from "react";

import { ChevronRightIcon } from "lucide-react";

import { IconVariant } from "@/types/icon";

interface MoreButtonProps {
  icon?: React.ElementType;
  label: string;
  description?: string;
  variant?: IconVariant;
  onClick: () => void;
  action?: JSX.Element;
}

export const MoreButton = ({
  icon,
  label,
  description,
  variant,
  onClick,
  action
}: MoreButtonProps) => {
  return (
    <button onClick={onClick} className="w-[calc(100%-8px)] mx-1 rounded-md text-primary hover:bg-[#37352f0f]">
      <div className="flex items-center w-full min-h-7 text-sm">
        {icon && (
          <div className="flex items-center justify-center ml-2.5 mr-1">
            {React.createElement(icon, { className: "size-4 text-primary", variant })}
          </div>
        )}
        <span className="mx-2 min-w-0 flex-auto whitespace-nowrap overflow-hidden text-ellipsis text-start">
          {label}
        </span>
        <div className="ml-auto mr-2 shrink-0 flex items-center text-[#37352f80]">
        {description && (
          <>
            <span className="flex whitespace-nowrap overflow-hidden text-ellipsis text-xs">{description}</span>
            <ChevronRightIcon className="size-4 ml-1.5 text-[#9a9a97]" />
          </>
        )}
        {action && action}
        </div>
      </div>
    </button>
  );
}