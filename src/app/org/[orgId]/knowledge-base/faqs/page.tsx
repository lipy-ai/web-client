'use client'

import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import Faq from './components/faq'

export type FaqsType = Array<{
    id: string
    question: string
    answer: string
    tags: string[]
}>

const Page = () => {
    const [data, setData] = useState<FaqsType>([])

    const handleAdd = () => {
        setData((prev) => [
            {
                id: crypto.randomUUID(),
                question: '',
                answer: '',
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
                        <Label>
                            Frequently Asked Questions ({data.length} Items)
                        </Label>
                        <p className="text-muted-foreground text-sm">
                            List of all FAQ's that assistant can learn and refer
                            to while answering your customer inquires!
                        </p>
                    </div>
                    <div className={cn(data.length > 0 && 'border rounded-md')}>
                        {data.map((field, k) => (
                            <div key={field.id}>
                                <Faq data={field} />
                                {data.length !== k + 1 && (
                                    <Separator className="bg-border/60" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
