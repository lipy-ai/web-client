import React from 'react'
import { Loader2 } from 'lucide-react'

export const FullPageLoader = () => {
    return (
        <div className="flex h-full w-full flex-1 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
    )
}
export const LoadingDots = () => {
    return (
        <span className="ml-1 space-x-1">
            <span className="inline-flex h-[3px] w-[3px] animate-pulse rounded-full bg-current duration-700" />
            <span className="inline-flex h-[3px] w-[3px] animate-pulse rounded-full bg-current delay-150 duration-700" />
            <span className="inline-flex h-[3px] w-[3px] animate-pulse rounded-full bg-current delay-300 duration-700" />
        </span>
    )
}
