import {
  Popover,
  PopoverContent,
} from "@/components/ui/popover";

import { HashIcon } from "@/components/icons";
import { EmojiPicker } from "@/components/emoji-picker";

interface GroupRenameProps {
  height: number;
  isOpen: boolean;
  onClose: () => void;
}

export const GroupRename = ({ 
  height,
  isOpen,
  onClose 
}: GroupRenameProps) => {
  return (
    <Popover open={isOpen} onOpenChange={onClose}>
      <PopoverContent className="fixed left-5 w-[336px] p-0" style={{ top: `${height + 35}px` }}>
        <div className="flex items-center p-1 gap-1">
          <EmojiPicker>
            <button className="transition flex items-center justify-center size-7 rounded-sm shadow-[inset_0_0_0_1px_rgba(55,53,47,0.16)] hover:bg-[#37352f0f] shrink-0">
              <HashIcon className="size-[18px] text-[#A5A29A]" />
            </button>
          </EmojiPicker>
          <input 
            className="w-full max-w-full focus:outline-none break-words whitespace-pre-wrap py-1 px-2.5 grow rounded-sm shadow-[inset_0_0_0_1px_rgba(55,53,47,0.16)] text-sm bg-[#f2f1ee99] text-primary"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}