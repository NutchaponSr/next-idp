"use client";

import React from "react";
import Link from "next/link";

import { SquareDashedKanbanIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { IconVariant } from "@/types/icon";
import { iconVariant } from "@/modules/dashboard/components/trigger";
import { Competency, Employee, Group } from "@/constants/workspaces";

export const Workspaces = () => {
  return (
    <div className="col-start-2">
      <div className="w-full flex flex-row items-center h-11 ml-2">
        <div className="flex items-center flex-shrink-0 w-full">
          <div className="flex justify-center items-center">
            <SquareDashedKanbanIcon className="text-[#787774] dark:text-[#7f7f7f] size-4 mr-2" />
          </div>
          <span className="text-xs font-medium text-[#787774] dark:text-[#7f7f7f]">Workspace</span>
        </div>
      </div>
      <div className="relative min-h-36">
        <div className="-ml-6 mr-0 -mb-8 overflow-x-auto overflow-hidden">
          <div className="grid grid-cols-3 gap-4 px-8 pt-0.5 pb-6">
            {[Group, Competency, Employee].map(({ variant, size, ...workspace }) => {
              const icon = React.createElement(workspace.icon, {
                className: cn(iconVariant({ variant, size })),
                variant: IconVariant.SOLID,
              })
              return (
                <div key={workspace.label} className="relative">
                  <Link 
                    href={workspace.href} 
                    className="flex flex-col transition cursor-pointer overflow-hidden rounded-2xl bg-background relative h-36 justify-stretch shadow-[unset] z-10"
                  >
                    <div className="relative mb-3.5">
                      <div className={cn("h-11", workspace.className)} />
                      <div className="flex items-center justify-center rounded-e-sm absolute -bottom-3.5 left-4">
                        {icon}
                      </div>
                    </div>
                    <div className="w-full min-h-[72px] py-2.5 px-4 relative flex flex-col justify-start gap-2 grow">
                      <h1 className="whitespace-pre-wrap overflow-hidden text-ellipsis font-medium text-sm w-auto text-[#37352f]">
                        {workspace.label}
                      </h1>
                      <p className="text-xs text-[#37352f80] line-clamp-2">
                        {workspace.description}
                      </p>
                    </div>
                  </Link>
                  <div className="absolute rounded-2xl inset-0 shadow-[0px_12px_32px_rgba(0,0,0,0.02),0_0_0_1px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.03),_0_0_0_1px_rgba(0,0,0,0.086)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}