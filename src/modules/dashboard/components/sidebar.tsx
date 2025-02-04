"use client";

import { useMedia } from "react-use";
import { ChevronsLeftIcon } from "lucide-react";
import { ElementRef, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { IconVariant } from "@/types/icon";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { 
  AiChatIcon, 
  FolderLibraryIcon, 
  HomeIcon, 
  InboxIcon, 
  Notebook1Icon, 
  SearchIcon, 
  Settings1Icon,
  TrashIcon
} from "@/components/icons";

import { Menu } from "@/modules/dashboard/components/menu";
import { Navbar } from "@/modules/dashboard/components/navbar";
import { UserButton } from "@/modules/auth/components/user-button";
import { Workspace } from "./workspace";
import { WorkspaceKey } from "@/types/workspace";
import { GroupSpace } from "@/modules/groups/components/group-space";

const iconProps = {
  variant: IconVariant.BULK,
  className: "size-[18px]",
  fill: "#91918e",
}

export const Sidebar = () => {
  const isMobile = useMedia("(max-width: 768px)");

  const [isDragging, setIsDragging] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(240);

  const isResizingRef = useRef(false);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const sidebarRef = useRef<ElementRef<"aside">>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  
    setIsDragging(true);
    isResizingRef.current = true;
  
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
  };

  const handleMouseMove = (event: globalThis.MouseEvent) => {
    if (!isResizingRef.current) return;
  
    let newWidth = event.clientX;
  
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 360) newWidth = 360;
  
    setSidebarWidth(newWidth);
  
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    setIsDragging(false);
  
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("mousemove", handleMouseMove);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      const defaultWidth = isMobile ? window.innerWidth : 240;
      setSidebarWidth(defaultWidth);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );

      navbarRef.current.style.setProperty(
        "left",
        isMobile ? "100%" : "240px"
      );

      setTimeout(() => setIsResetting(false), 300);
    }
  }

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");

      setTimeout(() => setIsResetting(false), 300);
    } 
  }

  return (
    <>
      <aside 
        ref={sidebarRef}
        className={cn(
          "h-full w-60 overflow-hidden select-none relative flex flex-col z-[100] bg-[#f7f7f5] group [&:has(>.resize-handle:hover)]:shadow-[inset_-2px_0_0_0_rgba(0,0,0,0.1)]",
          isResetting && "transition-all ease-in-out duration-300",
          isDragging 
          ? "shadow-[inset_-2px_0_0_0_rgba(0,0,0,0.1)]"
          : "shadow-[inset_-1px_0_0_0_rgba(0,0,0,0.024)]"
        )}
      >
        <Button 
          size="icon" 
          variant="ghost" 
          onClick={collapse}
          className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#00000008] absolute top-0.5 right-1 z-[100]"
        >
          <ChevronsLeftIcon className="size-4 text-[#A4A4A2]" />
        </Button>
        <div className="text-[#5f5e5b] flex flex-col max-h-full justify-between overflow-hidden relative">
          <UserButton side="left" />
          <Menu icon={<SearchIcon {...iconProps} />} label="Search" onClick={() => {}} showBadge />
          <Menu icon={<AiChatIcon {...iconProps} />} label="Jotion AI" onClick={() => {}} />
          <Menu icon={<HomeIcon {...iconProps} />} label="Home" onClick={() => {}} />
          <Menu icon={<InboxIcon {...iconProps} />} label="Inbox" onClick={() => {}} />
          <Menu icon={<Settings1Icon {...iconProps} />} label="Settings" onClick={() => {}} />
          <ScrollArea className="z-[1] pt-1.5 grow overflow-x-hidden overflow-y-auto">
            <div className="flex flex-col space-y-3 pb-5 shadow-[0_-1px_0_rgba(0,0,0,0.024)]">
              <div className="flex flex-col gap-1">
                {/* Favorite */}
                <div className="flex flex-col w-full mb-3">
                  <div className="flex items-center px-3 py-1.5 text-xs text-[#91918e]">
                    Workspace
                  </div>
                  <Workspace 
                    label="Group" 
                    href="/groups" 
                    background="pink"
                    icon={FolderLibraryIcon} 
                    variant="pink"
                    workspaceKey={WorkspaceKey.GROUP}
                  >
                    <GroupSpace />
                  </Workspace>
                  <Workspace 
                    label="Competency" 
                    href="/competencies" 
                    background="orange"
                    icon={Notebook1Icon} 
                    variant="orange"
                    workspaceKey={WorkspaceKey.COMPETENCY}
                  >
                    Competency
                  </Workspace>
                </div>
              </div>
              {/* Trash */}
              <Menu icon={<TrashIcon {...iconProps} />} label="Trash" onClick={() => {}} />
            </div>
          </ScrollArea>
        </div>
        <div className="resize-handle absolute right-0 w-0 grow-0 z-[1] top-0 bottom-0">
          <div
            onMouseDown={handleMouseDown}
            className={cn(
              "cursor-e-resize h-full w-3 -ml-1.5",
              isDragging ? "opacity-100" : "opacity-0 hover:opacity-100"
            )}
          />
        </div>
      </aside>
      <div 
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[80] left-60 w-[calc(100%-15rem)]",
          isResetting && "transition-all ease-in-out duration-300"
        )}
      >
        <div className="order-3 flex flex-col w-full overflow-hidden isolation-auto">
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        </div>
      </div>
    </>
  );
}