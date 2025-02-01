"use client";

import { UserAvatar } from "./user-avatar";
import { UserWrapper } from "./user-wrapper";
import { ChevronDownIcon, ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

interface UserButtonProps {
  side: "left" | "right";
}

export const UserButton = ({ side }: UserButtonProps) => {
  const session = useSession();

  const name = session.data?.user.name ?? "";
  const imageUrl = session.data?.user.image ?? "";
  
  const components = {
    left: (
      <div className="block shrink-0 grow-0">
        <UserWrapper align="center" alignOffset={16}>
          <button className="flex items-center h-8 w-full hover:bg-[#00000008] dark:hover:bg-[#ffffff0e] focus-visible:ring-0 focus-visible:outline-none p-1">
            <div className="flex items-center w-auto min-h-[27px] h-8 overflow-hidden space-x-2">
              <UserAvatar
                name={name}
                imageUrl={imageUrl}
                className="rounded-md size-7 justify-center items-center"
                fallbackClassName="rounded-md size-7 bg-[#008AF2] text-accent font-medium"
              />
              <div className="flex-1 whitespace-nowrap min-w-0 overflow-hidden text-ellipsis">
                <div className="flex items-center justify-start">
                  <div className="flex items-center whitespace-nowrap overflow-hidden text-ellipsis">
                    <div className="text-[#37352f] dark:text-[#ffffffcf] text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis mr-1 max-w-[140px]">
                      {name}&apos;s Jotion
                    </div>
                    <div className="flex justify-center items-center grow-0 shrink-0 size-4 ml-0.5">
                      <ChevronDownIcon className="size-4 text-[#A4A4A2]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </UserWrapper>
        <div className="h-1.5" />
      </div>
    ),
    right: (
      <UserWrapper align="end" sideOffset={16}>
        <Button 
          variant="outline" 
          className="flex justify-center items-center gap-x-2 max-h-8 pl-2 pr-1 h-8 rounded-md dark:text-white"
        >
          <div className="flex items-center gap-x-1">
            <ChevronsUpDownIcon className="size-4 text-[#999]" />
            <div className="text-sm font-medium text-primary">
              {name}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <UserAvatar 
              name={name}
              imageUrl={imageUrl}
              className="rounded-md size-7 justify-center items-center"
              fallbackClassName="rounded-md size-7 bg-[#008AF2] text-accent font-medium"
            />
          </div>
        </Button>
      </UserWrapper>
    ),
  };

  return components[side];
}