import { ArrowLeftIcon, XIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
  ArrowUpDownIcon,
  FilterIcon,
  InsertRowUpIcon,
  LinkIcon,
  ListIcon,
  ZapIcon
} from "@/components/icons";
import { MoreButton } from "@/components/more-button";
import { IconVariant } from "@/types/icon";
import { useMore } from "@/stores/use-more";
import { LayoutSelector } from "./layout-selector";
import { cn } from "@/lib/utils";
import { useLayout } from "@/stores/use-layout";
import { layouts } from "@/constants/filters";
import { Button } from "./ui/button";

interface MoreSidebarProps {
  onClose: () => void;
  toggleRef: React.RefObject<HTMLDivElement>;
}

export const MoreSidebar = ({ onClose, toggleRef }: MoreSidebarProps) => {
  const { mode } = useLayout();
  const { type, onOpen, onBack } = useMore();

  const [height, setHeight] = useState(0);

  const moreRef = useRef<HTMLElement>(null);

  const updateHeight = () => {
    if (moreRef.current) {
      const rect = moreRef.current.getBoundingClientRect();

      setHeight(window.innerHeight - rect.top);
    }
  }

  const handleClose = useCallback(() => {
    onClose();
    onBack();
  }, [onBack, onClose])

  useEffect(() => {
    updateHeight();

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreRef.current && 
        !moreRef.current.contains(event.target as Node) && 
        toggleRef.current !== event.target &&
        !toggleRef.current?.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClose, toggleRef]);

  return (
    <motion.aside
      ref={moreRef}
      initial={{ x: 50, opacity: 0 }}  
      animate={{ x: 0, opacity: 1 }}   
      exit={{ x: 50, opacity: 0 }}      
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ height: `${height}px` }}
      className="absolute top-10 -right-24 bg-background border-l border-[#e9e9e7] pr-24 z-[90]"
    >
      <div className="flex h-full">
        <div className="shadow-[inset_0_1px_0_rgb(233,233,231)]">
          <div className="flex flex-col min-w-[290px] max-w-[290px] h-full max-h-full">
            <div className={cn(type === null ? "visible" : "hidden", "shrink-0 min-h-10")}>
              <MoreHeader label="View options" onClose={handleClose} />
              <ScrollArea>
                <div className="py-1 flex flex-col">
                  <MoreButton 
                    label="Layout" 
                    icon={layouts[mode].icon} 
                    description={layouts[mode].label} 
                    onClick={() => onOpen("layout")} 
                  />
                </div>
                <div className="py-1 flex flex-col shadow-[0_-1px_0_rgba(55,53,47,0.09)]">
                  <MoreButton label="Properties" icon={ListIcon} description="1 Shown" onClick={() => onOpen("property")} />
                  <MoreButton label="Filter" icon={FilterIcon} description="None" onClick={() => onOpen("filter")} />
                  <MoreButton label="Sort" icon={ArrowUpDownIcon} description="None" onClick={() => onOpen("sort")} />
                  <MoreButton label="Grouping" icon={InsertRowUpIcon} description="None" onClick={() => onOpen("grouping")} />
                  <MoreButton label="Automations" icon={ZapIcon} variant={IconVariant.SOLID} description="None" onClick={() => onOpen("automations")}/>
                </div>
                <div className="py-1 flex flex-col shadow-[0_-1px_0_rgba(55,53,47,0.09)]">
                  <MoreButton label="Copy link" icon={LinkIcon} onClick={() => {}} />
                </div>
              </ScrollArea>
            </div>
            <LayoutSelector onClose={onClose} />
          </div>
        </div>
        <div className="w-24" />
      </div>
    </motion.aside>
  );
}

interface MoreHeaderProps {
  label: string;
  onBack?: () => void;
  onClose: () => void;
}

export const MoreHeader = ({
  label,
  onBack,
  onClose
}: MoreHeaderProps) => {
  return (
    <div className="flex items-center pt-3.5 pb-1.5 px-4 h-10">
      {onBack && (
        <Button size="icon" variant="ghost" className="mr-2" onClick={onBack}>
          <ArrowLeftIcon className="size-4 text-[#9a9a97]" />
        </Button>
      )}
      <span className="grow font-semibold text-sm whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </span>
      <button onClick={onClose} className="flex items-center justify-center rounded-full bg-[#37352f0f] size-[18px] hover:bg-[#37352f29]">
        <XIcon className="size-3.5 text-[#787874]" />
      </button>
    </div> 
  );
}