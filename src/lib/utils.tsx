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
import { CalculationType, ColumnProps, FilterCondition } from "@/types/filter";
import { TextBy } from "@/enums/grouping";
import { TEXT_BY_KEY } from "@/types/grouping";

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

export function applyCondition(
  condition: FilterCondition, 
  value: string,
  searchQuery: string
): boolean {
  if (value == null) return false;

  const stringValue = value.toString().toLowerCase();
  const query = searchQuery != null ? String(searchQuery).toLowerCase() : "";

  switch (condition) {
    case FilterCondition.IS:
      return stringValue === query;
    case FilterCondition.IS_NOT: 
      return stringValue !== query;
    case FilterCondition.CONTAINS:
      return stringValue.includes(query);
    case FilterCondition.DOES_NOT_CONTAIN:
      return !stringValue.includes(query);
    case FilterCondition.STARTS_WITH:
      return stringValue.startsWith(query);
    case FilterCondition.ENDS_WITH:
      return stringValue.endsWith(query);
    case FilterCondition.IS_EMPTY:
      return stringValue === "";
    case FilterCondition.IS_NOT_EMPTY:
      return stringValue !== "";
    default:
      return false;
  }
}

export function filterDataByConditions<T extends object>(
  data: T[],
  filters: ColumnProps<T>[],
): T[] {
  if (!data || !filters || filters.length === 0) return data;

  return data.filter((item) => {
    return filters.every((filter) => {
      const value = item[filter.label];
      return applyCondition(filter.condition, String(value), String(filter.searchQuery));
    });
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sortDataByColumns<T extends object>(
  data: T[],
  sorts: ColumnProps<T>[]
): T[] {
  if (!data || sorts.length === 0) return data;

  return [...data].sort((a, b) => {
    for (const sort of sorts) {
      const { label, sortOrder } = sort;

      if (!sortOrder || sortOrder.value === null) continue;

      const valueA = a[label] ?? "";
      const valueB = b[label] ?? "";

      const comparison = String(valueA).localeCompare(String(valueB), undefined, { numeric: true });

      if (comparison !== 0) {
        return sortOrder.value === "asc" ? comparison : -comparison;
      }
    }

    return 0;
  });
}

export function highlightText(text: string, highlight: string) {
  if (!highlight.trim()) {
    return (
      <span className="leading-2.5">
        {text}
      </span>
    );
  }

  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedHighlight})`, "gi");
  const parts = text.split(regex);

  return (
    <span className="leading-[1.5] whitespace-pre-wrap break-words inline font-medium bg-[linear-gradient(to_right,rgba(55,53,47,0.16)_0%,rgba(55,53,47,0.16)_100%)] bg-repeat-x bg-[length:100%_1px] bg-bottom mr-1.5">
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? ( 
          <span key={i} className="bg-[#ffcd3866] text-[#1d1b16] outline outline-[#ffcd3866] outline-2 outline-offset-[-0.5px] rounded border-b-0">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

export function calculateColumnValues<T extends object>(
  values: T[],
  type: CalculationType | null,
) {
  if (type === null) return null;

  switch (type) {
    case CalculationType.COUNT_ALL:
      return values.length.toString();
    case  CalculationType.COUNT_EMPTY:
      return values.filter((val) => val === null || val === undefined).length.toString();
    case  CalculationType.COUNT_NOT_EMPTY:
      return values.filter((val) => val !== null && val !== undefined).length.toString();
    case CalculationType.COUNT_UNIQUE:
      return new Set(values).size.toString();
    case CalculationType.COUNT_VALUES:
      return values.filter((val) => val !== null && val !== undefined).length.toString();
    case CalculationType.PERCENT_EMPTY:
      return ((values.filter((val) => val === null || val === undefined).length / values.length) * 100).toFixed(2) + "%";
    case CalculationType.PERCENT_NOT_EMPTY:
      return ((values.filter((val) => val !== null && val !== undefined).length / values.length) * 100).toFixed(2) + "%";
  }
}

export function groupByColumn<T>(
  array: T[], 
  key: keyof T,
  groupOption: Record<string, { label: string; value: string }>
): Record<string, T[]> {
  const textBy = groupOption[TEXT_BY_KEY]?.value as TextBy;

  const groupedData = array.reduce((result, value) => {
    let groupKey = String(value[key]);

    if (textBy === TextBy.ALPHABETICAL) {
      groupKey = groupKey.charAt(0).toUpperCase();
    }

    (result[groupKey] = result[groupKey] || []).push(value);
    return result
  }, {} as Record<string, T[]>);

  if (textBy === TextBy.ALPHABETICAL) {
    return Object.fromEntries(Object.entries(groupedData).sort(([a], [b]) => a.localeCompare(b)))
  }

  return groupedData;
}
