import { Skeleton } from "@/components/ui/skeleton";
import { VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { iconVariant, Trigger } from "./trigger";

interface SidebarItemProps extends VariantProps<typeof iconVariant> {
  actions?: React.ReactNode;
  children?: React.ReactNode;
  href: string;
  icon?: React.ElementType;
  indent?: string;
  isOpen?: boolean;
  label: string;
  notChild?: boolean;
  onToggle?: () => void;
  trigger?: React.ReactNode;
  background: "default" | "pink" | "orange" | "none" | "red" | "blue" | "green";
}

export const SidebarItem = ({ children, ...props }: SidebarItemProps) => {
  
  return (
    <>
      <Trigger {...props} />
      <AnimatePresence initial={false}>
        {props.isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              variants={{
                collapsed: { opacity: 0, y: 0 },
                open: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

SidebarItem.Skeleton = function IconWrapperSkeleton() {
  return (
    <div className="shrink-0 grow-0 rounded-sm flex justify-center items-center mr-2 ml-1 transition-all">
      <div className="flex items-center justify-center shrink-0 grow-0 size-6 relative">
        <div className="grid">
          <div className="row-start-1 col-start-1 row-auto col-auto">
            <div className="absolute inset-0 flex items-center justify-center rounded-sm transition-opacity duration-100 group-hover/workspace:opacity-0">
              <Skeleton className="size-6 rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}