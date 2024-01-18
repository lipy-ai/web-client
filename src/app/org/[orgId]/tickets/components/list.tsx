'use client'

import React from 'react'
import { ALLTicketResult } from '@/queries/ticket'
import { formatDistance, formatDistanceToNow } from 'date-fns'
import { Mail, MessageCircle, MessageSquare } from 'lucide-react'

import { cn } from '@/lib/utils'

import { useTicketStore } from '../../../../../store/ticket'

const TicketList = ({ items }: { items: ALLTicketResult }) => {
    const { setCurrTicket } = useTicketStore()

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
                        onClick={() => setCurrTicket(item.id)}
                    >
                        <div className="flex gap-3">
                            <div className="w-8 h-8 border flex items-center justify-center rounded-full my-auto bg-accent">
                                <MessageSquare className="w-4 h-4 " />
                            </div>
                            <div>
                                <p className="font-medium">
                                    {item.customer.name || 'Anonymous Customer'}
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    {item.assignee.id
                                        ? `Assigned to ${
                                              item.assignee.name || 'Unknown'
                                          }`
                                        : 'Not Assisgned'}
                                </p>
                            </div>
                        </div>
                        <p>{formatDistanceToNow(item.created_at!)}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default TicketList
