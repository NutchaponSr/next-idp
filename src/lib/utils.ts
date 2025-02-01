import React from "react";

import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import { 
  IconBaseProps,
  IconDefinition, 
  IconVariant
} from "@/types/icon";

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