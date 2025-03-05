import {
  AnimatePresence,
  motion
} from "framer-motion";

interface AccordionProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export const Accordion = ({
  isOpen,
  children
}: AccordionProps) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
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