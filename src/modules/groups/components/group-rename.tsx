import {
  Popover,
  PopoverContent,
} from "@/components/ui/popover";

import { HashIcon } from "@/components/icons";
import { EmojiPicker } from "@/components/emoji-picker";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRenameGroup } from "../api/use-rename-group";
import { Input } from "@/components/ui/input";

interface GroupRenameProps {
  height: number;
  isOpen: boolean;
  id: string;
  name: string;
  emoji: string | null;
  onClose: () => void;
}

export const GroupRename = ({ 
  height,
  isOpen,
  id,
  name,
  emoji,
  onClose 
}: GroupRenameProps) => {
  const { mutate: rename } = useRenameGroup();

  const [nameForm, setNameForm] = useState<string>(name);
  const [emojiForm, setEmojiForm] = useState<string | null>(emoji);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    rename({
      param: { id },
      json: {
        name: nameForm, 
        icon: emojiForm,
      }
    });
  }
  
  return (
    <Popover 
      open={isOpen} 
      onOpenChange={() => {
        setNameForm(name);
        setEmojiForm(emoji);

        onClose();
      }}
    >
      <PopoverContent className="fixed left-5 w-[343px] p-0" style={{ top: `${height + 35}px` }}>
        <form className="flex items-center p-1 gap-1" onSubmit={onSubmit}>
          <EmojiPicker 
            onSelect={(emoji: string) => setEmojiForm(emoji)}
            onRemove={() => setEmojiForm(null)}
          >
            <button className="transition flex items-center justify-center size-7 rounded-sm shadow-[inset_0_0_0_1px_rgba(55,53,47,0.16)] hover:bg-[#37352f0f] shrink-0">
              {emojiForm ? emojiForm : <HashIcon className="size-[18px] text-[#A5A29A]" />}
            </button>
          </EmojiPicker>
          <Input 
            value={nameForm}
            area="sm"
            variant="secondary"
            onChange={(e) => setNameForm(e.target.value)}
          />
          <Button size="sm" variant="primary">
            Save
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}