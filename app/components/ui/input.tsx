import * as React from "react"

import { cn } from "app/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-secondary-200 bg-secondary-150 px-4 py-3 text-secondary-400 text-base font-semibold file:border-0 file:bg-secondary-150 file:text-base file:font-semibold placeholder:text-muted-foreground focus-visible:outline-none focus-visible:shadow-input-focus focus-visible:border-primary-300 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
