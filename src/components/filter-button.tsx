import React from "react";

import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { IconVariant } from "@/types/icon";

import { Button } from "@/components/ui/button";

interface FilterButtonProps {
  label: string;
  icon: React.ElementType;
  isFilter: boolean;
}

export const FilterButton = ({ label, icon, isFilter }: FilterButtonProps) => {
  return (
    <Button variant={isFilter ? "filterAct1" : "filter"} size="filter" className="gap-1 text-xs">
      {React.createElement(icon, { className: cn(isFilter ? "text-[#2383e2]" : "text-[#7c7c78]", "size-[14px]"), variant: IconVariant.STROKE })}
      <span className="max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </span>
      <ChevronDownIcon className={cn("size-3", isFilter ? "text-[#2383e2]" : "text-[#b9b9b7]")}/>
    </Button>
  );
}