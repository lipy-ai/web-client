import React from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import sanitizeHtml from 'sanitize-html'

import { cn } from '@/lib/utils'

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLDivElement>, 'onChange'> {
    onChange?: (val: string) => void
    tagName?: string
}

// eslint-disable-next-line react/display-name
const CustomInput = React.forwardRef<HTMLDivElement, InputProps>(
    ({ className, value, onChange, tagName, ...props }, ref) => {
        const handleChange = (e: ContentEditableEvent) => {
            const sanitizeConf: sanitizeHtml.IOptions = {
                allowedTags: ['span'],
                allowedAttributes: {
                    span: ['class'],
                },
            }
            onChange &&
                onChange(sanitizeHtml(e.currentTarget.innerHTML, sanitizeConf))
        }

        return (
            <ContentEditable
                tabIndex={0}
                html={value as any}
                onChange={handleChange}
                tagName={tagName || 'div'} // Use a custom HTML tag (uses a div by default)
                className={cn(
                    'text-sm cursor-text outline-none before:opacity-40 before:text-foreground [&:not(:focus)]:empty:before:content-[attr(placeholder)] ',
                    !value && 'inline-block',
                    className
                )}
                {...props}
            />
        )
    }
)

export default CustomInput
