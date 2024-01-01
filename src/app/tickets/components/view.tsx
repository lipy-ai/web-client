'use client'

import React, { useState } from 'react'

import { Input } from '@/components/ui/input'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ScrollArea } from '@/components/ui/scroll-area'

import TicketList from '../components/list'
import { CardsStats } from './stats'

const View = () => {
    const [layout, setLayout] = useState([30, 70])

    return (
        // <ResizablePanelGroup
        //     autoSaveId={'keyName'}
        //     direction="horizontal"
        //     onLayout={(sizes: number[]) => setLayout(sizes)}
        //     className="flex-1 items-stretch"
        // >
        //     <ResizablePanel defaultSize={layout[0]} minSize={35} maxSize={65}>
        //         <TicketList />
        //     </ResizablePanel>
        //     <ResizableHandle withHandle />

        //     <ResizablePanel defaultSize={layout[1]} minSize={35} maxSize={65}>
        //         <div></div>
        //     </ResizablePanel>
        // </ResizablePanelGroup>
        <ScrollArea className="h-[calc(100vh-50px)]">
            <div className="p-4">
                {/* <div className="grid grid-cols-3 p-4 gap-4">
                <div className="col-span-1">
                    <TicketList />
                </div>
                <div className="col-span-2 border-l"></div>
            </div> */}
                <CardsStats />
                <div className="py-8">
                    <Input placeholder="Filter" />
                </div>
                <TicketList />
                <TicketList />
            </div>
        </ScrollArea>
    )
}

export default View
