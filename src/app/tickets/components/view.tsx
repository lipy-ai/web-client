'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useTicketsQuery } from '@/queries/ticket'

import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import Toolbar from '@/app/tickets/components/toolbar'

import { useTicketStore } from '../../../store/useTicket'
import TicketList from '../components/list'
import TicketPreviewFooter from './ticket-view/footer'
import TicketHead from './ticket-view/head'
import TicketPreviewBody from './ticket-view/messages'

const TicketPreview = () => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        el.scrollTop = el.scrollHeight
    }, [ref.current])
    return (
        <div ref={ref} className="overflow-y-auto h-screen">
            <TicketHead />
            <TicketPreviewBody />
            <TicketPreviewFooter />
        </div>
    )
}

const View = () => {
    const { data, isLoading, isError } = useTicketsQuery()
    const { currTicket, setCurrTicket } = useTicketStore()

    const handleOpenChange = (open: boolean) => {
        !open && setCurrTicket(null)
    }

    return (
        // <ResizablePanelGroup direction="horizontal">
        //     <ResizablePanel
        //         className="flex flex-col"
        //         minSize={30}
        //         defaultSize={layout[0]}
        //     >
        //         <ScrollArea>
        //             <h1 className="font-semibold text-lg p-3">Tickets</h1>
        //             <Separator />
        //             <div className="flex gap-4 flex-wrap sticky top-0 bg-background border-b p-4">
        //                 <Input placeholder="Search tickets..." />
        //                 <Toolbar />
        //             </div>
        //             <div>
        //                 <TicketList />
        //                 <Separator />
        //                 <TicketList />
        //             </div>
        //         </ScrollArea>
        //     </ResizablePanel>
        //     <ResizableHandle withHandle />
        //     <ResizablePanel
        //         minSize={30}
        //         defaultSize={layout[1]}
        //         className="flex flex-col"
        //     >
        //         <ScrollArea ref={ref}>
        //             <div>
        //                 <TicketHead />
        //                 <TicketPreviewBody />

        //                 <TicketPreviewFooter />
        //             </div>
        //         </ScrollArea>
        //     </ResizablePanel>
        // </ResizablePanelGroup>
        <div>
            <Sheet open={!!currTicket} onOpenChange={handleOpenChange}>
                <SheetContent className="w-full md:w-[60%]">
                    <TicketPreview />
                </SheetContent>
            </Sheet>
            <div className="sticky top-0 bg-background">
                <h1 className="font-semibold text-lg p-3">Tickets</h1>
                <Separator />
            </div>

            <div className="m-8 space-y-6">
                <div className="flex gap-4">
                    <Input placeholder="Search tickets..." />
                    <Toolbar />
                </div>
                <div className="border rounded-md">
                    <TicketList />
                    <Separator />
                    <TicketList />
                </div>
            </div>
        </div>
    )
}

export default View
