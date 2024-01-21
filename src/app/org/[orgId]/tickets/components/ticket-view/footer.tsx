import { useState } from 'react'
import { Reply } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { TextArea } from '@/components/ui/textarea'

const TicketPreviewFooter = () => {
    const [text, setText] = useState('')
    const handleSend = () => {
        setText('')
    }
    return (
        <div className="sticky bottom-0 bg-background border-t border-border/40 gap-1">
            <div className="leading-none bg-primary">
                <div className="text-xs font-medium flex gap-2 items-center text-primary-foreground px-4 py-0.5">
                    <div className="flex gap-0.5">
                        {[...Array(3)].map((_, i) => (
                            <span
                                key={i}
                                className={cn(
                                    'w-2 h-2 mb-0.5 block bg-primary-foreground rounded-full animate-pulse',
                                    i === 0
                                        ? 'delay-0'
                                        : i === 1
                                          ? 'delay-300'
                                          : 'delay-700'
                                )}
                            />
                        ))}
                    </div>
                    <span>Kundan is typing...</span>
                </div>
            </div>
            <div className="p-4">
                <div
                    className="border rounded-md p-2 cursor-text"
                    onClick={(e) =>
                        (
                            e.currentTarget.childNodes[0] as HTMLTextAreaElement
                        )?.focus()
                    }
                >
                    <TextArea
                        placeholder="Type message here..."
                        value={text}
                        rows={1}
                        onChange={(e) => setText(e.currentTarget.value)}
                        className="p-0 min-h-4"
                    />
                    <div className="flex items-end justify-end">
                        <Button
                            type="button"
                            onClick={handleSend}
                            size={'sm'}
                            className="rounded-full space-x-2"
                        >
                            <Reply className="w-5 h-5 mb-0.5" />{' '}
                            <span> Send Reply</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketPreviewFooter
