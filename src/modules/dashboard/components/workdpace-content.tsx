import { WorkspaceKey } from "@/types/workspace";
import { AnimatePresence, motion } from "framer-motion";
import { useToggle } from "../stores/use-toggle";

interface WorkspaceComponentProps {
  children: React.ReactNode;
  workspaceKey: WorkspaceKey;
}

export const  WorkspaceContent = ({ 
  children,
  workspaceKey 
}: WorkspaceComponentProps) => {
  const { isOpen } = useToggle();

  return (
    <AnimatePresence initial={false}>
      {isOpen(workspaceKey) && (
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
  );
}