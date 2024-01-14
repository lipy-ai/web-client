import React, { ReactNode } from 'react'
import { XSquare } from 'lucide-react'

import { cn } from '@/lib/utils'

export const FullPageError = ({
    title,
    message,
    children,
    icon,
    className,
}: {
    title?: string
    message: string
    children?: ReactNode
    icon?: ReactNode
    className?: string
}) => {
    return (
        <div className="flex h-full flex-1 items-center justify-center p-2">
            <div
                className={cn(
                    'w-full max-w-[400px] rounded-md  p-8 text-center border',
                    className
                )}
            >
                {icon ? (
                    icon
                ) : (
                    <XSquare className="mx-auto mb-5 h-14 w-14 text-destructive/80" />
                )}
                <h1 className="mb-1 text-xl font-medium">
                    {title || 'Oh no, Error'}
                </h1>
                <p className="mb-6 text-sm text-muted-foreground">{message}</p>
                {children}
                <p className="mt-4 text-xs font-light text-muted-foreground">
                    Feel free to contact us on{' '}
                    <a
                        href="mailto:team@lipy.ai"
                        className="underline hover:text-primary"
                    >
                        team@lipy.ai
                    </a>
                    , If this issue presists.
                </p>
            </div>
        </div>
    )
}
