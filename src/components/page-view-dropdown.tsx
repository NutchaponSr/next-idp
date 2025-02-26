import React, { useEffect, useRef, useState } from "react";

import { PageView } from "@/types/filter";
import { pageViews } from "@/constants/filters";

import { useView } from "@/stores/use-view";

import { Check1Icon } from "@/components/icons";
import { MoreButton } from "@/components/more-button";

export const PageViewDropdown = () => {
  const { view, onChangeView } = useView();

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (view: PageView) => {
    setIsOpen(false);
    onChangeView(view);
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <MoreButton label="One pages in" description={pageViews[view!].label} onClick={handleToggle} />
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-1.5 mt-2 w-[250px] z-[100] rounded-md bg-background shadow-[0_0_0_1px_rgba(15,15,15,0.05),0_3px_6px_rgba(15,15,15,0.1)]">
          <div className="flex flex-col p-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {Object.values(pageViews).map((page, index) => (
              <div 
                key={index} 
                role="menuitem"
                onClick={() => handleSelect(page.view)}
                className="cursor-pointer transition rounded-sm hover:bg-[#37352f0f]"
              >
                <div className="flex items-center w-full select-none min-h-7 py-2 leading-[120%]">
                  <div className="flex items-center justify-center ml-2.5 mr-1 self-start">
                    {React.createElement(page.icon, { className: "size-5 shrink-0 text-primary" })}
                  </div>
                  <div className="ml-1.5 mr-3 flex-auto">
                    <div className="whitespace-nowrap overflow-hidden text-ellipsis text-primary text-sm">
                      {page.label}
                    </div>
                    <div className="mt-1 text-xs text-[#37352fa6] break-words">
                      {page.description}
                      {page.default && (
                        <div className="mt-0.5 font-medium text-marine">
                          Default for Table
                        </div>
                      )}
                    </div>
                  </div>
                  {view === page.view && (
                    <div className="ml-auto mr-3 min-w-0 shrink-0 w-5">
                      <Check1Icon className="w-full h-full" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}