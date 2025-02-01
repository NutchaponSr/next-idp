import { JSX } from "react";

export enum IconVariant {
  BULK = "BULK",
  SOLID = "SOLID",
  STROKE = "STROKE",
}

export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  size?: string | number;
  color?: string;
  fill?: string;
  variant?: IconVariant;
}

export type IconDefinition = Record<IconVariant, JSX.Element>;

export type IconType = (props: IconBaseProps) => JSX.Element;