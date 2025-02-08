import emojis from "@/constants/emojis.json";
import { EmojiData, EmojiItem } from "@/types/emoji";

const HomePage = () => {
  const emojiObject = emojis as EmojiData;
  const allEmojis = Object.entries(emojiObject.emojis).flatMap(
    ([category, subCategories]) =>
      Object.entries(subCategories).flatMap(
        ([subCategory, emojiList]) =>
          emojiList.map((emoji: EmojiItem) => ({
            category,
            subCategory,
            emoji: emoji.emoji,
            name: emoji.name,
          }))
      )
  );

  const categories = Object.keys(emojiObject.emojis);

  return (
    <pre>
      {JSON.stringify(categories, null, 2)}
    </pre> 
  );
}

export default HomePage;