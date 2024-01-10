import { useState } from 'react'
import { Reply } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { TextArea } from '@/components/ui/textarea'

const TicketPreviewFooter = () => {
    const [text, setText] = useState('')
    const handleSend = () => {
        setText('')
    }
    return (
        <div className="border rounded-md p-2">
            <TextArea
                placeholder="Type message here..."
                value={text}
                onChange={(e) => setText(e.currentTarget.value)}
                className="p-0 min-h-8"
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
    )
}

export default TicketPreviewFooter
