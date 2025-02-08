import emojis from "@/constants/emojis.json";

import { EmojiData, EmojiItem } from "@/types/emoji";

export const EmojiGrid = () => {
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
    <div className="flex flex-col items-stretch">
      <div className="flex p-2 text-[#37352fa6] text-xs">
        <p className="self-center whitespace-nowrap overflow-hidden text-ellipsis">
          Recent
        </p>
      </div>
      <div className="flex flex-wrap justify-around px-2">
        <div className="flex flex-wrap">
          {Object.entries(categorizedEmojis).map(([category, emoji]) => (
            <div key={category}>
              <h2>{category}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}