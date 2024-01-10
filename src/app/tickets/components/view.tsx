'use client'

import React, { useState } from 'react'

import { Input } from '@/components/ui/input'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import Toolbar from '@/app/tickets/components/toolbar'

import TicketList from '../components/list'
import TicketHead from './ticket-view/head'
import TicketPreviewFooter from './ticket-view/input'
import TicketPreviewBody from './ticket-view/messages'

const View = () => {
    const [layout, setLayout] = useState([30, 70])

    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel className="flex flex-col" minSize={30}>
                <ScrollArea>
                    <h1 className="font-semibold text-lg p-3">Tickets</h1>
                    <Separator />
                    <div className="flex gap-4 flex-wrap sticky top-0 bg-background border-b p-4">
                        <Input placeholder="Search tickets..." />
                        <Toolbar />
                    </div>
                    <div>
                        <TicketList />
                        <Separator />
                        <TicketList />
                    </div>
                </ScrollArea>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel minSize={30} className="flex flex-col">
                <ScrollArea>
                    <div>
                        <TicketHead />
                        <TicketPreviewBody />
                        <div className="sticky bottom-0 bg-background rounded-md p-4">
                            <TicketPreviewFooter />
                        </div>
                    </div>
                </ScrollArea>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default View
