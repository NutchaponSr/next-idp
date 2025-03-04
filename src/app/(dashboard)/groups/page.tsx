"use client";

import { Group } from "@/constants/workspaces";

import { Banner } from "@/components/banner";

import { Content } from "@/modules/groups/components/content";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const GroupsPage = () => {
  const [scrolled, setScrolled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      setScrolled(container.scrollTop > 0)
    }

    container.addEventListener("scroll", handleScroll)
    return () => {
      container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <main className="grow-0 shrink flex flex-col h-[calc(100vh-44px)] max-h-full relative w-auto transition-all pt-11">
      <div ref={containerRef} className={cn("flex flex-col grow relative overflow-auto", scrolled && "border-t border-[#e9e9e7]")}>
        <Banner workspace={Group} />
        <Content />
      </div>
    </main>
  );
}

export default GroupsPage;