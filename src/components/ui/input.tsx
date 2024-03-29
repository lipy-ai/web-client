import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: { size: 'sm' | 'lg' }
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, variant, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary/60 disabled:cursor-not-allowed disabled:opacity-50',
                    variant?.size === 'sm'
                        ? 'h-8'
                        : variant?.size === 'lg'
                          ? 'h-12'
                          : 'h-10',
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = 'Input'

export { Input }
