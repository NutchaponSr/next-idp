"use client";

import React from "react";
import Link from "next/link";

import { usePathname } from "next/navigation"; 

import { Button } from "@/components/ui/button";

import { HomeIcon } from "@/components/icons";

export const Breadcrumb = () => {
  const pathname = usePathname();

  const paths: string[] = pathname
    .split("/") 
    .filter((path) => path && path.toLowerCase() !== "home") || [];

  const isMainPage = pathname === "/home";

  return (
    <div className="flex items-center text-sm h-full space-x-2">
      {!isMainPage && (
        <Button 
          asChild
          size="sm"
          variant="ghostFlow"
          className="text-[#37352f] text-sm font-normal"
        >
          <Link href="/home">
            <HomeIcon className="size-4 text-[#37352f]" />
            Home
          </Link>
        </Button>
      )}
      { paths.length > 0 && <span className="mx-[2px] text-[#37352f80]">/</span> }
      {paths.map((path, _i) => {
        const href = `/${paths.slice(0, _i + 1).join("/")}`;

        return (
          <React.Fragment key={_i}>
            <Button 
              asChild
              size="sm"
              variant="ghostFlow"
              className="text-[#37352f] text-sm font-normal capitalize"
            >
              <Link href={href}>
                { path }
              </Link>
            </Button>
            { paths.length !== _i + 1 && <span className="mx-[2px] text-[#37352f80]">/</span> }
          </React.Fragment>
        );
      })}
    </div>
  );
}