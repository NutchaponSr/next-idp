export type EmojiItem = {
  code: string[];
  emoji: string;
  name: string;
}

export type EmojiSubCategory = {
  [subCategory: string]: EmojiItem[];
};

export type EmojiCategory = {
  [category: string]: EmojiSubCategory;
};

export type EmojiData = {
  emojis: EmojiCategory;
}