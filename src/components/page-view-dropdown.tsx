import { useEffect, useRef, useState } from "react";

import { pageViews } from "@/constants/filters";
import { MoreButton } from "@/components/more-button";
import { Button } from "./ui/button";

export const PageViewDropdown = () => {
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

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <MoreButton label="One pages in" description="Side peek" onClick={handleToggle} />
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 z-[100] rounded-md shadow-lg bg-background ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {Object.values(pageViews).map((page) => (
              <Button variant="ghost" size="sm">
                {page.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}