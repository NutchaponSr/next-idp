import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { SearchIcon, ShuffleIcon } from "./icons";
import { Hint } from "./hint";
import { ScrollArea } from "./ui/scroll-area";
import { CarrotIcon, CircleCheckIcon, ClockIcon, FlagIcon, LeafIcon, LightbulbIcon, PlaneIcon, SmileIcon, VolleyballIcon } from "lucide-react";

interface EmojiPickerProps {
  children: React.ReactNode;
}

export const EmojiPicker = ({ children }: EmojiPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="absolute -left-1 top-2 w-[380px] p-0" align="start">
        <div className="flex flex-col h-[300px] max-h-[70vh]"> 
          {/* Header */}
          <div className="p-2 flex items-center space-x-1">
            <div className="relative w-full">
              <SearchIcon className="size-4 absolute top-1.5 left-2 text-primary" />
              <input 
                type="text"
                className="bg-[#f2f1ee99] rounded-sm shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] relative flex w-full h-7 focus:outline-none px-2 py-1 pl-8 text-sm font-light text-primary placeholder:text-[#37352f80]"
                placeholder="filter..."
              />
            </div>
            <Hint label="Random">
              <button className="transition flex items-center justify-center size-7 rounded-sm shadow-[inset_0_0_0_1px_rgba(55,53,47,0.16)] hover:bg-[#37352f0f] shrink-0">
                <ShuffleIcon className="size-[18px] text-[#A5A29A]" />
              </button>
            </Hint>
            <Hint label="Select skin tone">
              <button className="transition flex items-center justify-center size-7 rounded-sm hover:bg-[#37352f0f] shrink-0 text-lg">
                👨🏻
              </button>
            </Hint>
          </div>
          <ScrollArea className="flex-grow">
            
          </ScrollArea>
          <div className="border-t flex p-2 justify-between">
            <button className="transition flex items-center justify-center size-7 rounded-sm hover:bg-[#37352f0f] shrink-0 text-lg">
              <ClockIcon className="size-4 text-[#8B8B8A]" />
            </button>
            <button className="transition flex items-center justify-center size-7 rounded-sm hover:bg-[#37352f0f] shrink-0 text-lg">
              <SmileIcon className="size-4 text-[#8B8B8A]" />
            </button>
            <button className="transition flex items-center justify-center size-7 rounded-sm hover:bg-[#37352f0f] shrink-0 text-lg">
              <LeafIcon className="size-4 text-[#8B8B8A]" />
            </button>
            <button className="transition flex items-center justify-center size-7 rounded-sm hover:bg-[#37352f0f] shrink-0 text-lg">
              <CarrotIcon className="size-4 text-[#8B8B8A]" />
            </button>
            <button className="transition flex items-center justify-center size-7 rounded-sm hover:bg-[#37352f0f] shrink-0 text-lg">
              <VolleyballIcon className="size-4 text-[#8B8B8A]" />
            </button>
            <button className="transition flex items-center justify-center size-7 rounded-sm hover:bg-[#37352f0f] shrink-0 text-lg">
              <PlaneIcon className="size-4 text-[#8B8B8A]" />
            </button>
            <button className="transition flex items-center justify-center size-7 rounded-sm hover:bg-[#37352f0f] shrink-0 text-lg">
              <LightbulbIcon className="size-4 text-[#8B8B8A]" />
            </button>
            <button className="transition flex items-center justify-center size-7 rounded-sm hover:bg-[#37352f0f] shrink-0 text-lg">
              <CircleCheckIcon className="size-4 text-[#8B8B8A]" />
            </button>
            <button className="transition flex items-center justify-center size-7 rounded-sm hover:bg-[#37352f0f] shrink-0 text-lg">
              <FlagIcon className="size-4 text-[#8B8B8A]" />
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}