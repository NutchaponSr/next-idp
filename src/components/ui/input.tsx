import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const inputVariants = cva(
  "flex w-full rounded-md text-primary transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] focus-within:shadow-[inset_0_0_0_1px_rgba(35,131,226,0.57),0_0_0_2px_rgba(35,131,226,0.35)]",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground",
        secondary: "rounded-sm shadow-[inset_0_0_0_1px_rgba(55,53,47,0.16)] text-sm bg-[#f2f1ee99]",
        search: "whitespace-pre-wrap break-words grow shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1)] bg-[#f2f1ee99] focus-visible:outline-none text-[#37352f] placeholder:text-[#91918e] font-light focus-within:shadow-[inset_0_0_0_1px_rgba(35,131,226,0.57),0_0_0_2px_rgba(35,131,226,0.35)]",
        none: "border-none shadow-none"
      },
      area: {
        default: "h-9 px-3 py-1 text-sm",
        sm: "h-7 px-2 py-1 px-2.5 text-sm rounded-sm",
        md: "h-8 px-4",
        none: "px-1 h-6 text-xs"
      },
    },
    defaultVariants: {
      variant: "default",
      area: "default",
    }
  }
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, area, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, area, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
