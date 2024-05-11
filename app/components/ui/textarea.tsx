import * as React from "react"

import { cn } from "app/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-xl border border-secondary-200 bg-secondary-150 px-4 py-3 text-secondary-400 text-base font-semibold file:border-0 file:bg-secondary-150 file:text-base file:font-semibold placeholder:text-muted-foreground focus-visible:outline-none focus-visible:shadow-input-focus focus-visible:border-primary-300 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
