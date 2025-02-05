import React from "react";

import { cn } from "@/lib/utils";
import { IconVariant } from "@/types/icon";
import { cva, VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";

export const iconVariant = cva("size-[18px]", {
  variants: {
    variant: {
      default: "fill-[#91918e]",
      pink: "fill-[#c14c8a]",
      orange: "fill-[#d9730d]",
      red: "fill-[#bc554d]",
      blue: "fill-[#527da5]",
      green: "fill-[#598164]",
    },
    size: {
      sm: "size-5",
      icon: "size-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  }
});

export const backgroundVariant = cva("", {
  variants: {
    background: {
      none: "",
      default: "bg-[#37352f0f]",
      pink: "bg-[#f5e0e9]",
      orange: "bg-[#fadec9]",
      red: "bg-[#f7e3de]",
      blue: "bg-[#d8e5ee]",
      green: "bg-[#dfecdd]",
    },
  },
  defaultVariants: {
    background: "none",
  },
});

interface TriggerProps extends VariantProps<typeof iconVariant> {
  actions?: React.ReactNode;
  href: string;
  indent?: string;
  icon?: React.ElementType;
  isOpen?: boolean;
  label: string;
  notChild?: boolean;
  trigger?: React.ReactNode;
  background: "none" | "default" | "orange" | "pink" | "red" | "blue" | "green";
  onToggle?: () => void;
}

export const Trigger = ({
  actions,
  trigger,
  href,
  icon,
  indent,
  isOpen,
  label,
  notChild,
  size,
  variant,
  background,
  onToggle,
}: TriggerProps) => {
  const router = useRouter();

  const iconMerged = React.createElement(icon!, {
    className: cn(iconVariant({ variant, size })),
    variant: IconVariant.BULK,
  });

  return (
    <button 
      onClick={() => router.push(href)}
      className={cn("group/workspace flex items-center min-h-[30px] p-1 hover:bg-[#00000008] w-full", indent)}
    >
      <div className="flex items-center w-full">
        <div className="shrink-0 grow-0 rounded-sm flex justify-center items-center mr-2 ml-1 transition-all">
          <div className="flex items-center justify-center shrink-0 grow-0 size-6 relative">
            <div className="grid">
              <div className="row-start-1 col-start-1 row-auto col-auto">
                <div 
                  role="button"
                  className={cn(
                    "absolute inset-0 flex items-center justify-center rounded-sm transition-opacity duration-100 group-hover/workspace:opacity-0",
                    backgroundVariant({ background }),
                    notChild && "group-hover/workspace:opacity-100"
                  )}
                >
                  {trigger ? trigger : iconMerged}
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