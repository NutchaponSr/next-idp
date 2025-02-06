import emojis from "@/constants/categories.json";
import { EmojiData } from "@/types/emoji";

const HomePage = () => {
  const emojiObject = emojis as EmojiData;
  const emojiList = emojiObject.emojis["Smileys & Emotion"]["face-smiling"].map((emoji) => ({
    name: emoji.name,
    emoji: emoji.emoji,
  }));

  return (
    <pre>
      {JSON.stringify(emojiList, null, 2)}
    </pre> 
  );
}

export default HomePage;