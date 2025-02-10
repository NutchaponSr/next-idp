import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "bg-background shadow-[0_0_0_1px_rgba(15,15,15,0.1)] hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        primary: "bg-[#2383e2] hover:bg-[#0077d4] shadow-[inset_0_0_0_1px_rgba(15,15,15,0.1),0_1px_2px_rgba(15,15,15,0.1)] text-white",
        primaryOutline: "bg-[#ebf5fe] text-[#087fe7] hover:bg-[#d6e1f5]",
        filterAct: "bg-[#2383e208] text-[#2383e2] hover:bg-[#2383e212] border border-[#2383e259]",
        filter: "text-[#7c7c78] hover:bg-[#37352f0f] dark:hover:bg-[#ffffff0e] border border-[#37352f29] dark:border-[#ffffff21]",
        gray: "border text-primary border-[#37352f29] hover:bg-[#37352f0f]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-7 rounded-sm px-[10px] text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-6 w-6 rounded-sm",
        filter: "h-6 rounded-full px-2"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
