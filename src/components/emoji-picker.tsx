import emojis from "@/constants/emojis.json";

import { EmojiData, EmojiItem } from "@/types/emoji";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { SearchIcon, ShuffleIcon } from "./icons";
import { Hint } from "./hint";
import { ScrollArea } from "./ui/scroll-area";
import { emojiCategories } from "@/constants/emojis";
import { cn } from "@/lib/utils";
interface EmojiPickerProps {
  children: React.ReactNode;
}

export const EmojiPicker = ({ children }: EmojiPickerProps) => {
  const emojiObject = emojis as EmojiData;
  const categorizedEmojis = Object.entries(emojiObject.emojis).reduce(
    (acc, [category, subCategories]) => {
      acc[category] = Object.values(subCategories).flatMap((emojiList) =>
        emojiList.map((emoji: EmojiItem) => ({
          emoji: emoji.emoji,
          name: emoji.name,
        }))
      );
      return acc;
    },
    {} as Record<string, { emoji: string; name: string }[]>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="absolute -left-1 top-2 w-[336px] p-0" align="start">
        <div className="flex flex-col h-[300px] max-h-[70vh]"> 
          <div className="p-2 flex items-center gap-x-1">
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
            {Object.entries(categorizedEmojis).map(([category, emojis]) => (
              <div 
                key={category} 
                className="flex flex-col items-stretch"
              >
                <div className="flex p-2 text-[#37352fa6] text-xs">
                  <p className="self-center whitespace-nowrap overflow-hidden text-ellipsis">
                    {category}
                  </p>
                </div>
                <div className="flex flex-wrap justify-around px-2">
                  <div className="flex flex-wrap">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        className="transition flex items-center justify-center size-8 rounded-sm hover:bg-[#37352f0f] shrink-0 text-2xl"
                      >
                        {emoji.emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="border-t flex px-2 py-1 justify-between">
            {emojiCategories.map((emojiCat, index) => (
              <Hint key={index} label={emojiCat.hint}>
                <button
                  // onClick={() => scrollToCategory(emojiCat.hint)}
                  className={cn(
                    "h-7 w-7 flex items-center justify-center rounded-sm hover:bg-gray-100",
                  )}
                >
                  <emojiCat.icon className="h-4 w-4 text-gray-500" />
                </button>
              </Hint>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}