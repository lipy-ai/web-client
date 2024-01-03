'use client'

import React, { useState } from 'react'

import { Input } from '@/components/ui/input'
import Toolbar from '@/app/tickets/components/toolbar'

import TicketList from '../components/list'

const View = () => {
    const [layout, setLayout] = useState([30, 70])

    return (
        <div className="max-w-screen-lg w-full p-10 space-y-6">
            <div className="flex gap-4 flex-wrap">
                <Input placeholder="Search tickets..." />
                <Toolbar />
            </div>
            <div className="border rounded-md">
                <TicketList />
                <TicketList />
            </div>
        </div>
    )
}

export default View
