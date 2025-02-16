"use client";

import { useEffect, useState } from "react";

import { formatGreeting } from "@/lib/utils";

import { useCurrentUser } from "@/modules/auth/hooks/use-current-user";

export const WelcomeMessage = () => {
  const user = useCurrentUser();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []); 

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative transition col-span-3">
      <div className="w-full h-full mt-16 px-[52px] transition">
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="flex items-center gap-3 text-[30px] leading-[1.2] font-medium text-[#37352f] dark:text-[#ffffffcf]">
            <span>{formatGreeting(currentTime)},</span>
            {user?.name}
          </h1>
        </div>
      </div>
    </div>
  );
}