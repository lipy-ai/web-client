'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'

import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import TicketList from '../components/list'
import { MailDisplay } from './mail'

const View = () => {
    const [layout, setLayout] = useState([30, 70])

    return (
        <div className="grid grid-cols-3">
            <ScrollArea className="col-span-1 h-[calc(100%-52px)]">
                <div className="flex p-4 gap-4 flex-wrap">
                    <Input placeholder="Search tickets..." />
                </div>
                <TicketList />
                <TicketList />
            </ScrollArea>
            <div className="col-span-2 border-l">
                <MailDisplay
                    mail={{
                        id: 'od',
                        name: 'William Smith',
                        email: 'williamsmith@example.com',
                        subject: 'Meeting Tomorrow',
                        text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
                        date: '2023-10-22T09:00:00',
                        read: true,
                        labels: ['meeting', 'work', 'important'],
                    }}
                />
            </div>
        </div>
    )
}

export default View
