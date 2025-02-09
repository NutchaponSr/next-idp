import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { SearchIcon, ShuffleIcon, TrashIcon } from "./icons";
import { Hint } from "./hint";
import { emojiCategories } from "@/constants/emojis";
import { cn, getEmojis } from "@/lib/utils";
import { useEffect, useMemo, useRef, useState } from "react";
interface EmojiPickerProps {
  children: React.ReactNode;
  onRemove: () => void;
  onSelect: (emoji: string) => void;
}

export const EmojiPicker = ({ 
  children,
  onRemove,
  onSelect
}: EmojiPickerProps) => {
  const emojis = getEmojis();
  const flattedEmojis = emojis.flatMap(({ emojis }) => emojis);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filteredItems = useMemo(() => {
    if (!searchQuery) return emojis;

    return emojis
      .map((category) => ({
        ...category,
        emojis: category.emojis.filter((emoji) => 
          emoji.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      }))
      .filter((category) => category.emojis.length > 0);
  }, [searchQuery, emojis]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const scrollContainerRect = scrollContainerRef.current.getBoundingClientRect();
    const middlePoint = scrollContainerRect.top + scrollContainerRect.height / 4;

    let currentCategory: string | null = null;

    Object.entries(categoryRefs.current).forEach(([category, ref]) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();

        if (rect.top <= middlePoint && rect.bottom >= middlePoint) {
          currentCategory = category;
        }
      }
    });

    setCurrentCategory(currentCategory);
  }

  const scrollToCategory = (category: string) => {
    categoryRefs.current[category]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrentCategory(category); 
  };

  const onRandom = () => {
    const randonIndex = Math.floor(Math.random() * flattedEmojis.length);
    onSelect(flattedEmojis[randonIndex].emoji);
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="absolute -left-1 top-2 w-[343px] p-0" align="start">
        <div className="flex flex-col h-[300px] max-h-[70vh]"> 
          <div className="p-2 flex items-center gap-x-1">
            <div className="relative w-full">
              <SearchIcon className="size-4 absolute top-1.5 left-2 text-primary" />
              <input 
                type="text"
                value={searchQuery}
                placeholder="filter..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#f2f1ee99] rounded-sm shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] relative flex w-full h-7 focus:outline-none px-2 py-1 pl-8 text-sm font-light text-primary placeholder:text-[#37352f80]"
              />
            </div>
            <Hint label="Random">
              <button onClick={onRandom} className="transition flex items-center justify-center size-7 rounded-sm shadow-[inset_0_0_0_1px_rgba(55,53,47,0.16)] hover:bg-[#37352f0f] shrink-0">
                <ShuffleIcon className="size-[18px] text-[#A5A29A]" />
              </button>
            </Hint>
            <Hint label="Remove">
              <button onClick={onRemove} className="transition flex items-center justify-center size-7 rounded-sm shadow-[inset_0_0_0_1px_rgba(55,53,47,0.16)] hover:bg-[#37352f0f] shrink-0">
                <TrashIcon className="size-[18px] text-[#A5A29A]" />
              </button>
            </Hint>
          </div>
          <div 
            ref={scrollContainerRef} 
            onScroll={handleScroll}
            className="overflow-y-scroll custom-scrollbar h-full"
          >
            {filteredItems.map(({ category, emojis }) => (
              <div 
                key={category} 
                ref={(el) => { categoryRefs.current[category] = el; }}
                className="flex flex-col items-stretch"
              >
                <div className="flex p-2 text-[#37352fa6] text-xs">
                  <p className="self-center whitespace-nowrap overflow-hidden text-ellipsis">
                    {category}
                  </p>
                </div>
                <div className="flex flex-wrap px-2">
                  <div className="flex flex-wrap justify-start">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => onSelect(emoji.emoji)}
                        className="transition flex items-center justify-center size-8 rounded-sm hover:bg-[#37352f0f] shrink-0 text-2xl"
                      >
                        {emoji.emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t flex px-2 py-1 justify-between">
            {emojiCategories.map((emojiCat, index) => (
              <Hint key={index} label={emojiCat.hint}>
                <button
                  onClick={() => scrollToCategory(emojiCat.hint)}
                  className={cn(
                    "h-7 w-7 flex items-center justify-center rounded-sm hover:bg-gray-100",
                    currentCategory === emojiCat.hint && "bg-[#37352f0f]",
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