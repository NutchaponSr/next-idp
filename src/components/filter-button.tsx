import React from "react";

import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { IconVariant } from "@/types/icon";


interface FilterButtonProps {
  label: string;
  icon: React.ElementType;
}

export const FilterButton = ({ label, icon }: FilterButtonProps) => {

  return (
    <Button variant="filter" size="filter" className="gap-1 text-xs">
      {React.createElement(icon, { className: "text-[#7c7c78] size-[14px]", variant: IconVariant.STROKE })}
      <span className="max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </span>
      <ChevronDownIcon className="size-3 text-[#b9b9b7]"/>
    </Button>
  );
}