import React from 'react'
import { Plus } from 'lucide-react'

import { cn } from '@/lib/utils'

export type UploadProps = {
    className?: string
    accept?: string
}

const Upload = ({ className, accept }: UploadProps) => {
    return (
        <div
            className={cn(
                'border-2 border-dashed relative flex items-center justify-center w-full h-full rounded-md',
                className
            )}
        >
            <span className="p-4">
                <Plus className="text-muted-foreground" />
            </span>
            <input
                type="file"
                accept={accept || 'image/png, image/jpeg'}
                className="absolute w-full h-full top-0 left-0 opacity-0"
            />
        </div>
    )
}

export default Upload
