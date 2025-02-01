import { ChevronRightIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import React from "react";
import { IconVariant } from "@/types/icon";

export const iconVariant = cva("size-[18px]", {
  variants: {
    variant: {
      pink: "fill-[#c14c8a]",
      orange: "fill-[#d9730d]",
    },
    size: {
      md: "size-[18px]",
    },
  },
  defaultVariants: {
    variant: "pink",
    size: "md",
  }
});

interface WorkpaceIconProps extends VariantProps<typeof iconVariant> {
  className?: string;
  icon: React.ElementType; 
  onToggle: () => void;
}

export const WorkspaceIcon = ({
  className,
  icon: Icon,
  onToggle,
  variant,
  size
}: WorkpaceIconProps) => {
  const iconMerged = React.createElement(Icon, {
    className: cn(iconVariant({ variant, size }), className),
    variant: IconVariant.BULK,
  });

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
              {iconMerged}
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