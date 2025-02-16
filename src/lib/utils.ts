import React from "react";
import emojisData from "@/constants/emojis.json";

import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNowStrict, getHours } from "date-fns";

import { 
  IconBaseProps,
  IconDefinition, 
  IconVariant
} from "@/types/icon";
import { CompetencyType } from "@/types/competency";
import { EmojiData, EmojiItem } from "@/types/emoji";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createIcon(iconDefinition: IconDefinition) {
  return ({ variant = IconVariant.STROKE, fill = "currentColor", className, ...svgProps }: IconBaseProps) => {
    const icons: Record<IconVariant, JSX.Element> = iconDefinition;
    const baseIcon = icons[variant];
    
    const originalProps = baseIcon.props || {};
    
    const mergedProps = {
      ...originalProps,
      ...svgProps,
      className: className || originalProps.className,
      ...(variant === "STROKE" 
        ? { stroke: fill, fill: "none" } 
        : { fill: fill }
      )
    };

    return React.cloneElement(baseIcon, mergedProps);
  };
};

export function getEmojiForType(type: CompetencyType) {
  let emoji;
  switch (type) {
    case CompetencyType.CC:
      emoji = "📕";
      break;
    case CompetencyType.FC:
      emoji = "📘";
      break;
    case CompetencyType.TC:
      emoji = "📗";
      break;
  }
  return emoji;
}

export function getEmojis() {
  const emojiObject = emojisData as EmojiData;

  const emojis = Object.entries(emojiObject.emojis).reduce((acc, [category, subCategory]) => {
    acc[category] = Object.values(subCategory).flatMap((emojiList) =>
      emojiList.map((emoji: EmojiItem) => ({
        name: emoji.name,
        emoji: emoji.emoji,
      }))
    );

    return acc;
  }, {} as Record<string, { emoji: string; name: string }[]>);

  return Object.entries(emojis).map(([category, emojis]) => ({
    category,
    emojis
  }));
}

export function formatTimeElapsed(date: string) {
  let timeElapsed = formatDistanceToNowStrict(new Date(date));

  timeElapsed = timeElapsed
    .replace(" second", "s")
    .replace(" seconds", "s")
    .replace(" minute", "m")
    .replace(" minutes", "m")
    .replace(" hour", "hr")
    .replace(" hours", "hr")
    .replace(" days", "d")
    .replace(" day", "d")

  return `${timeElapsed} ago`;
}

export function formatGreeting(date: Date) {
  const hour = getHours(date);

  if (hour >= 5 && hour < 12) {
    return "Good morning"
  } else if (hour >= 12 && hour < 18) {
    return "Good afternoon"
  } else if (hour >= 18 && hour < 22) {
    return "Good evening"
  } else {
    return "Good night"
  }
}