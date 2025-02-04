import { ChevronRightIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import React from "react";
import { IconVariant } from "@/types/icon";
import { motion } from "framer-motion";
import { WorkspaceKey } from "@/types/workspace";
import { Skeleton } from "@/components/ui/skeleton";

export const iconVariant = cva("size-[18px]", {
  variants: {
    variant: {
      default: "fill-[#91918e]",
      pink: "fill-[#c14c8a]",
      orange: "fill-[#d9730d]",
    },
    size: {
      md: "size-[18px]",
      sm: "size-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  }
});

export const backgroundVariant = cva("", {
  variants: {
    background: {
      none: "",
      default: "bg-[#37352f0f]",
      pink: "bg-[#f5e0e9]",
      orange: "bg-[#fadec9]",
    },
  },
  defaultVariants: {
    background: "none",
  },
});

interface WorkpaceIconProps extends VariantProps<typeof iconVariant> {
  children?: React.ReactNode;
  icon?: React.ElementType; 
  notChild?: boolean;
  workspaceKey?: WorkspaceKey;
  onToggle?: () => void;
  isOpen: boolean;
  background?: "default" | "pink" | "orange" | "none";
}

export const IconWrapper = ({
  children,
  icon,
  isOpen,
  background,
  notChild,
  variant,
  size,
  onToggle
}: WorkpaceIconProps) => {
  const iconMerged = React.createElement(icon!, {
    className: cn(iconVariant({ variant, size })),
    variant: IconVariant.BULK,
  });

  return (
    <div className="shrink-0 grow-0 rounded-sm flex justify-center items-center mr-2 ml-1 transition-all">
      <div className="flex items-center justify-center shrink-0 grow-0 size-[22px] relative">
        <div className="grid">
          <div className="row-start-1 col-start-1 row-auto col-auto">
            <div 
              role="button"
              className={cn(
                "absolute inset-0 flex items-center justify-center rounded-sm transition-opacity duration-100 group-hover/workspace:opacity-0",
                backgroundVariant({ background }),
              )}
            >
              {children ? children : iconMerged}
            </div>
            {!notChild && (
              <motion.div
                role="button"
                className="absolute inset-0 flex items-center justify-center rounded-sm bg-[#37352f0f] opacity-0 transition-opacity duration-100 group-hover/workspace:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onToggle) onToggle();
                }}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRightIcon className="h-[18px] w-[18px] text-[#91918e]" />
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

IconWrapper.Skeleton = function IconWrapperSkeleton() {
  return (
    <div className="shrink-0 grow-0 rounded-sm flex justify-center items-center mr-2 ml-1 transition-all">
      <div className="flex items-center justify-center shrink-0 grow-0 size-[22px] relative">
        <div className="grid">
          <div className="row-start-1 col-start-1 row-auto col-auto">
            <div className="absolute inset-0 flex items-center justify-center rounded-sm transition-opacity duration-100 group-hover/workspace:opacity-0">
              <Skeleton className="size-[22px] rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}