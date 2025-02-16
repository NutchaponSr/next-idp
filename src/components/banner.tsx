"use client";

import React from "react";

import { useLocalStorage } from "react-use";

import { cn } from "@/lib/utils";
import { IconVariant } from "@/types/icon";
import { Workspace } from "@/types/workspace";

import { Button } from "@/components/ui/button";

import { InfoIcon } from "@/components/icons"; 

import { iconVariant } from "@/modules/dashboard/components/trigger";

interface BannerProps {
  workspace: Workspace;
}

export const Banner = ({ workspace }: BannerProps) => {
  const [hide, setHide] = useLocalStorage("banner", false);

  return (
    <div className="w-full flex flex-col items-center shrink-0 grow-0 sticky left-0 group">
      <div className="w-full px-24 max-w-full">
        <div className="flex opacity-0 group-hover:opacity-100 justify-start flex-wrap transition-opacity duration-100 py-1">
          <Button variant="ghostFlow" size="md" onClick={() => setHide(!hide)}>
            <InfoIcon className="size-4" variant={IconVariant.SOLID} />
            Hide description
          </Button>
        </div>
        <div className="mb-2 w-full mt-1">
          <div className="flex justify-start space-x-2">
            {React.createElement(workspace.icon, {
              className: cn(iconVariant({ variant: workspace.variant }), "size-9"),
              variant: IconVariant.BULK,
            })}
            <h1 className="text-3xl text-primary font-bold flex items-center whitespace-pre-wrap">
              {workspace.label}
            </h1>
          </div>
          {hide && (
            <p className="max-w-full w-full whitespace-pre-wrap text-[#37352f] font-semibold text-sm p-1"> 
              {workspace.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}