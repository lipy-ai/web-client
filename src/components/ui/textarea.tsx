import React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, InputProps>(
    ({ className, ...props }, ref) => {
        const handleSize = (el: HTMLElement) => {
            el.style.height = '0px'
            el.style.height = `${el.scrollHeight}px`
        }

        React.useEffect(() => {
            if (!props.id || !document) return
            const el = document.getElementById(String(props.id))
            el && handleSize(el)
        }, [props.id])

        return (
            <textarea
                className={cn(
                    'resize-none text-sm my-auto flex-1 block max-h-[300px] w-full p-2 rounded-md outline-none',
                    className
                )}
                onInput={(e) => {
                    handleSize(e.currentTarget)
                    props.onChange && props.onChange(e as any)
                }}
                ref={ref}
                {...props}
            />
        )
    }
)

TextArea.displayName = 'TextArea'

export { TextArea }
