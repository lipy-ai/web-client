'use client'

import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import Document from './components/document'

export type DocumentsType = Array<{
    id: string
    name: string
    tags: string[]
}>

const Page = () => {
    const [data, setData] = useState<DocumentsType>([])

    const handleAdd = () => {
        setData((prev) => [
            {
                id: crypto.randomUUID(),
                name: '',
                tags: [],
            },
            ...prev,
        ])
    }

    useEffect(() => {
        handleAdd()
        handleAdd()
        handleAdd()
        handleAdd()
    }, [])

    return (
        <>
            <div className="p-8 space-y-6">
                <div className="flex gap-4 w-full">
                    <Input placeholder="Search faqs..." />
                    <div>
                        <Button onClick={handleAdd}>
                            <span>Add New...</span>

                            <Plus className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
                <div className="space-y-3">
                    <div>
                        <Label>Documents ({data.length} Items)</Label>
                        <p className="text-muted-foreground text-sm">
                            List of all documents that assistant can learn and
                            refer to while answering your customer inquires!
                        </p>
                    </div>
                    <div className="gap-8 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
                        {data.map((field, k) => (
                            <div
                                key={field.id}
                                className="h-64 rounded-md border border-border/60 hover:border-primary overflow-hidden"
                            >
                                <Document data={field} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
