import React, { useRef, useState } from "react";
import { 
  ChevronRightIcon, 
  GripVerticalIcon 
} from "lucide-react";
import { 
  Reorder,
} from "framer-motion";

import { IconVariant } from "@/types/icon";
import { ColumnProps } from "@/types/filter";
import { useMore } from "@/stores/use-more";

import { EyeIcon } from "@/components/icons";
import { MoreHeader } from "@/components/more-sidebar";
import { ClearableInput } from "@/components/clearable-input";

interface PropertiesProps<T extends object> {
  onClose: () => void;
  columns: ColumnProps<T>[];
}

export const Properties = <T extends object>({ onClose, columns }: PropertiesProps<T>) => {
  const { type, isOpen, onBack } = useMore();
  
  const [items, setItems] = useState<ColumnProps<T>[]>(columns);

  const containerRef = useRef<HTMLDivElement>(null);

  const open = isOpen && type === "property";

  const handleClose = () => {
    onClose();
    onBack();
  };

  if (!open) return null;

  return (
    <div className="shrink-0 h-full">
      <MoreHeader label="Property" onClose={handleClose} onBack={onBack} />
      <div className="p-1 flex flex-col">
        <div className="flex items-center gap-2 leading-[120%] min-h-7 text-sm py-1 px-2">
          <ClearableInput variant="search" area="sm" />
        </div>
      </div>
        <div className="flex flex-col p-1">
          {/* Shown in table */}
          <div className="flex px-2 my-2 text-[#37352fa6] text-xs h-5 w-full items-center">
            <h2 className="flex self-center">Shown in table</h2>
            <div className="ml-auto">
              <button className="text-marine text-xs transition hover:bg-[#ebf5fe] py-0.5 px-1.5 inline-flex items-center rounded-md whitespace-nowrap font-medium">
                Hide all
              </button>
            </div>
          </div>
          <div ref={containerRef}>
            <Reorder.Group axis="y" values={items} onReorder={setItems}>
              {items.map((item) => (
                <Reorder.Item
                  key={String(item.label)}
                  value={item}
                  dragConstraints={containerRef}
                  dragElastic={0} 
                >
                  <div className="transition cursor-pointer w-full flex hover:bg-[#37352f0f] rounded-md">
                    <div className="flex items-center gap-2 leading-[120%] w-full min-h-7 px-2">
                      <div className="whitespace-nowrap overflow-hidden text-ellipsis flex-auto">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center justify-center w-[18px] h-6 shrink-0 cursor-grab">
                            <GripVerticalIcon className="size-4 shrink-0 text-[#9a9a97]" />
                          </div>
                          {item.icon && <item.icon className="size-4 shrink-0 text-primary" />}
                          <span className="whitespace-nowrap overflow-hidden text-ellipsis capitalize text-sm">
                            {String(item.label)} 
                          </span>
                        </div>
                      </div>
                      <div className="ml-auto shrink-0 flex items-center space-x-1">
                        <button className="transition hover:bg-[#37352f0f] inline-flex items-center justify-center shrink-0 rounded-md size-6">
                          <EyeIcon className="size-4 text-primary" variant={IconVariant.SOLID} />
                        </button>
                        <ChevronRightIcon className="size-3 text-[#9a9a97] shrink-0" />
                      </div>
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
          {/* Hidden in table */}
          <div className="flex px-2 my-2 text-[#37352fa6] text-xs h-5 w-full items-center">
            <h2 className="flex self-center">Hidden in table</h2>
            <div className="ml-auto">
              <button className="text-marine text-xs transition hover:bg-[#ebf5fe] py-0.5 px-1.5 inline-flex items-center rounded-md whitespace-nowrap font-medium">
                Show all
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};
