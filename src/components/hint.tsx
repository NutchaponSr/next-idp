import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HintProps {
  align?: "start" | "center" | "end";
  children: React.ReactNode;
  label: string;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
}

export const Hint = ({
  align,
  children,
  label,
  side,
  sideOffset
}: HintProps) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent
          align={align}
          side={side}
          sideOffset={sideOffset}
          className="py-1 px-1.5"
        >
          <p className="text-xs font-medium">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}