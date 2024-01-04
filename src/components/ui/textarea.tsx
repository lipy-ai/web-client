import React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
    extends React.TableHTMLAttributes<HTMLTextAreaElement> {
    noStyle?: boolean
}

const TextArea = React.forwardRef<HTMLTextAreaElement, InputProps>(
    ({ className, noStyle, ...props }, ref) => {
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
                    'resize-none outline-none focus:outline-none max-h-[300px] text-sm',
                    className
                )}
                rows={1}
                onInput={(e) => {
                    handleSize(e.currentTarget)
                    props.onChange && props.onChange(e)
                }}
                ref={ref}
                {...props}
            />
        )
    }
)

TextArea.displayName = 'TextArea'

export { TextArea }
