import { useKey } from "react-use";
import { useEffect, useRef, useState } from "react";

import { cn, formatTimeElapsed } from "@/lib/utils";

import { HashIcon } from "@/components/icons";

import { ResponseType } from "@/modules/dashboard/api/use-get-search";

interface SearchListProps {
  searchs: ResponseType;
}

export const SearchList = ({ searchs }: SearchListProps) => {
  const [index, setIndex] = useState<number | null>(null);
  const [isActiveKeyBoard, setIsActiveKeyboard] = useState(false);

  const itemsRef = useRef<HTMLDivElement[]>([]);
  const keyboardTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const mappedData = searchs.flatMap((item) => item.data);

  const activeKeyboardMode = () => {
    setIsActiveKeyboard(true);
    if (keyboardTimeoutRef.current) {
      clearTimeout(keyboardTimeoutRef.current);
    }

    keyboardTimeoutRef.current = setTimeout(() => {
      setIsActiveKeyboard(false);
    }, 50);
  }

  useKey("ArrowUp", () => {
    setIndex((prev) => {
      if (mappedData.length === 0) return null; 
      if (prev === null) return mappedData.length - 1; 
      return prev > 0 ? prev - 1 : mappedData.length - 1;
    });
    activeKeyboardMode();
  });

  useKey("ArrowDown", () => {
    setIndex((prev) => {
      if (mappedData.length === 0) return null;
      if (prev === null) return 0; 
      return prev < mappedData.length - 1 ? prev + 1 : 0;
    });
    activeKeyboardMode();
  });

  useEffect(() => {
    if (isActiveKeyBoard && index !== null && itemsRef.current[index]) {
      itemsRef.current[index].scrollIntoView({ behavior: "instant", block: "center" });
    }
  }, [index, isActiveKeyBoard]);

  useEffect(() => {
    return () => {
      if (keyboardTimeoutRef.current) {
        clearTimeout(keyboardTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full space-y-1 mx-1"
      onMouseLeave={() => setIndex(null)}
    >
      {searchs.map(({ label, data }) => (
        <div key={label} className="mb-[18px]">
          <div className="flex px-3 my-2 text-[#37352fa6] dark:text-[#ffffff71] text-xs font-semibold">
            {label}
          </div>
          {data.map((item) => {
            const globalIndex = mappedData.findIndex(data => data.id === item.id);
            return (
              <div 
                key={item.id} 
                className={cn(
                  "cursor-pointer w-[calc(100%-8px)] mx-1 rounded-[6px] group",
                  globalIndex === index && "bg-[#37352f0f]"
                )}
                ref={(el) => {
                  if (el) itemsRef.current[globalIndex] = el;
                }}
                onMouseEnter={() => {
                  if (!isActiveKeyBoard) setIndex(globalIndex);
                }}
              >
                <div className="flex items-center w-full min-h-11 text-sm py-2">
                  {/* 😀 Icon */}
                  <div className="flex items-center justify-center ml-2.5 mr-1 self-center">
                    <div className={cn(
                      "flex items-center justify-center size-6 rounded-[0.25em] shrink-0 text-lg",
                      !item.icon && "border rounded-md group-hover:bg-background"
                    )}>
                      {item.icon ? item.icon : <HashIcon className="size-4 text-[#a5a29a]" />}
                    </div>
                  </div>
                  {/* 💬 Title */}
                  <div className="ml-2 flex-auto inline-flex items-center w-full">
                    <h1 className="whitespace-nowrap overflow-hidden text-ellipsis shrink-0 max-w-full text-primary">
                      {item.name}
                    </h1>
                    <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis text-[#51493c52] mx-[0.5em]">—</span>
                    <p className="text-[#51493c52] text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.description}
                    </p>
                  </div>
                  {/* 📅 time elapsed */}
                  <div className="mr-3 self-start text-xs text-[#51493c52] font-light grow-0 shrink-0 basis-auto mt-1.5">
                    {formatTimeElapsed(item.createdAt)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}