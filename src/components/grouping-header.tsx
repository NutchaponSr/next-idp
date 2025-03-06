import { 
  EyeIcon, 
  EyeOffIcon, 
  MoreVerticalIcon, 
  PlusIcon 
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { IconVariant } from "@/types/icon";

import { useTable } from "@/stores/use-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button"; 

import { 
  ChevronRightIcon, 
  TrashIcon 
} from "@/components/icons";
import { Hint } from "@/components/hint";

interface GroupingHeaderProps {
  count: number;
  header: string;
  showAggregation: boolean;
  toggleAggregation: () => void;
}

export const GroupingHeader = ({ 
  count,
  header, 
  showAggregation,
  toggleAggregation,
}: GroupingHeaderProps) => {
  const { 
    groupingHeaders, 
    toggleGroup,
    toggleGroupVisible
  } = useTable();

  const [isOpen, setIsOpen] = useState(false);

  const isShow = groupingHeaders[header]?.isShow;

  return (
    <div className="w-full text-sm">
      <div className="flex items-center h-11">
        <div className="flex items-center h-full overflow-hidden space-x-1">
          <Button size="icon" variant="ghost" onClick={() => toggleGroup(header)}>
            <motion.div
              animate={{ rotate: groupingHeaders[header]?.isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRightIcon className="size-4 fill-primary" variant={IconVariant.SOLID} />
            </motion.div>
          </Button>
          <h1 className="font-medium text-primary text-ellipsis whitespace-nowrap overflow-hidden mx-1">
            {header}
          </h1>
          {showAggregation && (
            <p className="text-[#9A9A97] flex items-center justify-center h-7 w-5 font-medium">
              {count}
            </p>
          )}
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger>
              <Button 
                size="icon" 
                variant="ghost" 
                className={cn(
                  "group-hover/grouping:opacity-100 opacity-0 transition-opacity",
                  isOpen && "opacity-100",
                )}
                onClick={() => {
                  setTimeout(() => {
                    setIsOpen(true)
                  }, 10)
                }}
              >
                <MoreVerticalIcon className="size-4 text-[#9A9A97] rotate-90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={toggleAggregation}>
                {showAggregation 
                  ? <EyeOffIcon className="size-4 text-primary" />
                  : <EyeIcon className="size-4 text-primary" />
                }
                {showAggregation ? "Hide " : "Show "}
                aggregation
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleGroupVisible(header)}>
                {isShow 
                  ? <EyeOffIcon className="size-4 text-primary" />
                  : <EyeIcon className="size-4 text-primary" />
                }
                {isShow ? "Hide " : "Show "}
                group
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TrashIcon className="size-4 text-primary" />
                Hide group
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Hint label="Create new" side="top">
            <Button size="icon" variant="ghost" className="group-hover/grouping:opacity-100 opacity-0 transition-opacity">
              <PlusIcon className="size-4 text-[#9A9A97] rotate-90" />
            </Button>
          </Hint>
        </div>
      </div>
    </div>
  );
}