import { useToggle } from "react-use";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { ColumnProps } from "@/types/filter";

import { useTable } from "@/stores/use-table";

import { Button } from "@/components/ui/button";

import { GroupingHeader } from "@/components/grouping-header";

import { TableRows } from "@/components/layouts/table/table-row";
import { TableFooter } from "@/components/layouts/table/table-footer";
import { TableHeader } from "@/components/layouts/table/table-header";

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
  const { groupingHeaders } = useTable();

  const [hiddenGroup, toggleHiddenGroup] = useToggle(false);
  const [showAggregation, toggleAggregation] = useToggle(false);

  const hiddenCount = Object.entries(groupingHeaders).filter(([, header]) => !header.isShow).length;
  const count = Object.fromEntries(
    Object.entries(groupedData).map(([key, value]) => [key, value.length])
  );

  return (
    <div className="grow shrink-0 flex flex-col relative">
      <div className="h-full relative float-left min-w-full select-none lining-nums pb-[180px] px-24">
        <div className="flex flex-col space-y-2.5">
          {Object.keys(groupedData).filter((header) => groupingHeaders[header]?.isShow).map((header) => (
            <div key={header} className="w-full border-t border-[#e9e9e7] group/grouping">
              <GroupingHeader 
                header={header} 
                count={count[header]} 
                showAggregation={showAggregation}
                toggleAggregation={toggleAggregation}
              />
              <AnimatePresence initial={false}>
                {groupingHeaders[header]?.isOpen && (
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
                      <TableFooter 
                        columns={columns}
                        data={groupedData[header]}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>  
          ))}
          {/* Hidden group */}
          {hiddenCount > 0 && (
            <>
              <div className="flex">
                <Button onClick={toggleHiddenGroup} variant="ghost" className="text-[#9a9a97] hover:text-[#9a9a97] gap-1 px-1.5 font-normal">
                  {hiddenGroup
                    ? <ChevronUpIcon className="size-4" />
                    : <ChevronDownIcon className="size-4" />
                  }
                  {hiddenCount} Hidden groups
                </Button>
              </div>
              {hiddenGroup && (
                <div>
                  {Object.keys(groupedData).filter((header) => !groupingHeaders[header]?.isShow).map((header) => (
                    <div key={header} className="w-full border-t border-[#e9e9e7] group/grouping">
                      <GroupingHeader 
                        header={header} 
                        count={count[header]} 
                        showAggregation={showAggregation}
                        toggleAggregation={toggleAggregation}
                      />
                      <AnimatePresence initial={false}>
                        {groupingHeaders[header]?.isOpen && (
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
                              <TableFooter 
                                columns={columns}
                                data={groupedData[header]}
                              />
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>  
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}