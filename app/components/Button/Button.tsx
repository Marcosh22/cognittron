import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "~/utils/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl border shadow-elevation1 min-w-[120px] px-4 py-2 h-12 text-base font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary-300 text-white border-primary-300 hover:bg-primary-300/90",
        secondary:
          "bg-primary-100 text-primary-300 border-primary-200 hover:bg-primary-100/80",
      },
    },
    defaultVariants: {
      variant: "default"
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
