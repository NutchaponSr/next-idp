import { 
  MoreVerticalIcon, 
  PlusIcon, 
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { IconVariant } from "@/types/icon";
import { ColumnProps } from "@/types/filter";

import { Button } from "@/components/ui/button";

import { ChevronRightIcon } from "@/components/icons";

import { TableHeader } from "@/components/layouts/table/table-header";
import { TableRows } from "./layouts/table/table-row";

interface GroupingLayoutProps<T extends { id: string }> {
  data: T[];
  groupedData: Record<string, T[]>
  searchQuery: string;
  columns: ColumnProps<T>[];
  isOpenToolbar: boolean;
  selectedRows: Record<string, boolean>;
  selectAll: (header: string) => void;
  selectRow: (key: string) => void;
  renderCell: (cell: T, column: ColumnProps<T>, searchQuery: string) => JSX.Element | undefined;
}

export const GroupingLayout = <T extends { id: string }>({
  columns,
  groupedData,
  searchQuery,
  selectedRows,
  isOpenToolbar,
  selectRow,
  selectAll,
  renderCell
}: GroupingLayoutProps<T>) => {
  const [open, setOpen] = useState<Record<number, boolean>>({});

  const toggleSection = (index: number) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [index]: !prevOpen[index], 
    }));
  };

  return (
    <div className="grow shrink-0 flex flex-col relative">
      <div className="h-full relative float-left min-w-full select-none lining-nums pb-[180px] px-24">
        {Object.keys(groupedData).map((header, index) => (
          <div key={header} className="w-full border-t border-[#e9e9e7] group/grouping">
            <div className="w-full text-sm">
              <div className="flex items-center h-11">
                <div className="flex items-center h-full overflow-hidden">
                  <Button size="icon" variant="ghost" onClick={() => toggleSection(index)}>
                    <motion.div
                      animate={{ rotate: open[index] ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRightIcon className="size-4 fill-primary" variant={IconVariant.SOLID} />
                    </motion.div>
                  </Button>
                  <h1 className="font-medium text-primary text-ellipsis whitespace-nowrap overflow-hidden mx-1">{header}</h1>
                  <Button size="icon" variant="ghost" className="group-hover/grouping:opacity-100 opacity-0 transition-opacity">
                    <MoreVerticalIcon className="size-4 text-[#9A9A97] rotate-90" />
                  </Button>
                  <Button size="icon" variant="ghost" className="group-hover/grouping:opacity-100 opacity-0 transition-opacity">
                    <PlusIcon className="size-4 text-[#9A9A97] rotate-90" />
                  </Button>
                </div>
              </div>
            </div>
            <AnimatePresence initial={false}>
              {open[index] && (
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
                    <TableHeader 
                      columns={columns}
                      data={groupedData[header]}
                      isOpenToolbar={isOpenToolbar}
                      selectedRows={selectedRows}
                      selectAll={() => {
                        setTimeout(() => {
                          selectAll(header);
                        }, 10);
                      }}
                    />
                    <TableRows 
                      data={groupedData[header]}
                      columns={columns}
                      searchQuery={searchQuery}
                      selectedRows={selectedRows}
                      selectRow={selectRow}
                      renderCell={renderCell}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>  
        ))}
      </div>
    </div>
  );
}