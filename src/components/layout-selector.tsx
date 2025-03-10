import React from "react";

import { cn } from "@/lib/utils";
import { layouts } from "@/constants/filters";

import { useLayout } from "@/stores/use-layout";
import { useSettings } from "@/stores/use-settings";
import { useMoreSidebar } from "@/stores/use-more-sidebar";

import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

import { MoreButton } from "@/components/more-button";
import { MoreHeader } from "@/components/more-sidebar";
import { PageViewDropdown } from "@/components/page-view-dropdown";

export const LayoutSelector = () => {
  const { 
    showIcon,
    showVerticalLine,
    onSwitchIcon,
    onSwitchVerticalLine
  } = useSettings();
  const { 
    type, 
    isOpenItem, 
    onBack,
    onCloseSidebar
  } = useMoreSidebar();
  const { mode: currentMode, onChange } = useLayout();

  const open = isOpenItem && type === "layout";

  if (!open) return null;

  return (
    <div className="shrink-0 h-full">
      <MoreHeader label="Layout" onClose={onCloseSidebar} onBack={onBack} />
      <ScrollArea className="flex flex-col h-full">
        <div className="flex flex-col py-1">
          <div className="w-full px-2 flex flex-wrap">
            {Object.values(layouts).map(({ icon, label, mode }, index) => (
              <div 
                key={index} 
                className={cn(
                  "transition w-[calc(25%-12px)] flex flex-col items-center justify-center grow-0 shrink-0 font-xs rounded-md m-1.5 p-1.5",
                  mode === currentMode 
                    ? "cursor-default shadow-[0_0_0_2px_rgb(35,131,266)] text-marine font-semibold"
                    : "cursor-pointer text-[#37352fa6] shadow-[0_0_0_1px_rgba(55,53,47,0.09)] hover:bg-[#37352f0f]"
                )}
                onClick={() => onChange(mode)}
              >
                {React.createElement(icon, { className: cn("size-5 my-1", mode === currentMode ? "text-marine" : "text-[#787874] ") })}
                <span className="text-[11px]">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col py-1 h-full">
          <PageViewDropdown />
          <MoreButton 
            label="Show vertical lines"
            action={<Switch checked={showVerticalLine} onCheckedChange={onSwitchVerticalLine} />} 
          />
          <MoreButton 
            label="Show page icon"
            action={<Switch checked={showIcon} onCheckedChange={onSwitchIcon} />} 
          />
        </div>
      </ScrollArea> 
    </div>
  );  
}