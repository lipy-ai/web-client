'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { useTicketsQuery } from '@/queries/ticket'
import { Mail, MessageCircleOff, Ticket } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import EmptyPage from '@/components/custom/emptyPage'
import { FullPageError } from '@/components/custom/error'
import { FullPageLoader } from '@/components/custom/loader'
import Toolbar from '@/app/org/[orgId]/tickets/components/toolbar'

import { useTicketStore } from '../../../../../store/ticket'
import TicketList from './list'
import TicketPreview from './ticket-view'

const View = () => {
    const { orgId, type } = useParams<{
        orgId: string
        type: 'all' | 'email' | 'chat'
    }>()
    const { data, isLoading, isError } = useTicketsQuery({ page: 1, orgId })
    const { currTicket, setCurrTicket } = useTicketStore()

    const handleOpenChange = (open: boolean) => {
        !open && setCurrTicket(undefined)
    }

    const views = {
        all: {
            title: 'All Tickets',
            err: 'Failed to load tickets.',
            empty: {
                title: 'No Tickets Yet.',
                icon: Ticket,
            },
        },
        email: {
            title: 'Emails',
            err: 'Failed to load emails.',
            empty: {
                title: 'No Emails Yet.',
                icon: Mail,
            },
        },
        chat: {
            title: 'Chats',
            err: 'Failed to load chats.',
            empty: {
                title: 'No Messages Yet.',
                icon: MessageCircleOff,
            },
        },
    }

    return (
        <>
            {isError ? (
                <FullPageError message={views[type].err} />
            ) : isLoading ? (
                <FullPageLoader />
            ) : !data || data.length === 0 ? (
                <EmptyPage
                    title={views[type].empty.title}
                    description="It appears you haven't recieved any messages from your customers yet."
                    icon={views[type].empty.icon}
                ></EmptyPage>
            ) : (
                <div>
                    <Sheet open={!!currTicket} onOpenChange={handleOpenChange}>
                        <SheetContent className="w-full md:w-[60%]">
                            <TicketPreview
                                ticketId={currTicket}
                                orgId={orgId}
                            />
                        </SheetContent>
                    </Sheet>
                    <div className="m-8 space-y-6">
                        <div className="flex gap-4">
                            <Input placeholder="Search tickets..." />
                            <Toolbar />
                        </div>

                        <div className="border rounded-md">
                            <TicketList items={data} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default View
