import { useMore } from "@/stores/use-more";

import { ScrollArea } from "./ui/scroll-area";

import { MoreHeader } from "./more-sidebar";
import { ClearableInput } from "./clearable-input";
import { Button } from "./ui/button";

interface PropertiesProps {
  onClose: () => void;
}

export const Properties = ({ onClose}: PropertiesProps) => {
  const { type, isOpen, onBack } = useMore();

  const open = isOpen && type === "property";

  if (!open) return null;

  const handleClose = () => {
    onClose();
    onBack();
  }

  return (
    <div className="shrink-0 h-full">
      <MoreHeader label="Property" onClose={handleClose} onBack={onBack} />
      <div className="p-1 flex flex-col">
        <div className="flex items-center gap-2 leading-[120%] min-h-7 text-sm py-1 px-2">
          <ClearableInput variant="search" area="sm" />
        </div>
      </div>
      <div className="flex flxe-col p-1">
        <div className="flex px-2 my-2 text-[#37352fa6] text-xs h-5 w-full items-center">
          <h2 className="flex self-center">Shown in table</h2>
          <div className="ml-auto">
            <button className="text-marine text-xs transition hover:bg-[#ebf5fe] py-0.5 px-1.5 inline-flex items-center rounded-md whitespace-nowrap font-medium">
              Hide all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}