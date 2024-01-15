'use client'

import React from 'react'
import { formatDistance, formatDistanceToNow } from 'date-fns'
import { Mail, MessageCircle, MessageSquare } from 'lucide-react'

import { cn } from '@/lib/utils'

import { useTicketStore } from '../../../../../store/useTicket'

const TicketList = () => {
    const { setCurrTicket } = useTicketStore()

    const items = [...Array(10)].map((k, i) => {
        return {
            id: `id-` + i,
            name: 'William Smith',
            email: 'williamsmith@example.com',
            subject: 'Meeting Tomorrow',
            text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
            date: '2023-10-22T09:00:00',
            read: true,
            labels: ['meeting', 'work', 'important'],
        }
    })

    return (
        <div>
            <div className="flex flex-col">
                {items.map((item) => (
                    <button
                        key={item.id}
                        className={cn(
                            'flex items-start gap-4 justify-between pl-3 pr-6 py-3 border-b last:border-0 text-left text-sm transition-all hover:bg-accent'
                            // mail.selected === item.id && 'bg-muted'
                        )}
                        onClick={() => setCurrTicket(item.id.toString())}
                    >
                        <div className="flex gap-3">
                            <div className="w-8 h-8 border flex items-center justify-center rounded-full my-auto bg-accent">
                                <MessageSquare className="w-4 h-4 " />
                            </div>
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-muted-foreground">
                                    {item.subject}
                                </p>
                            </div>
                        </div>
                        <p>{formatDistanceToNow(item.date)}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default TicketList
