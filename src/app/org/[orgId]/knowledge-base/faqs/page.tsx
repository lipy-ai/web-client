'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import CustomInput from '@/components/custom/customInput'

import Faq from './components/faq'

export const FaqsFromSchema = z.object({
    faqs: z.array(
        z.object({
            id: z.string(),
            question: z.string().min(1).max(300),
            answer: z.string().min(1).max(300),
            tags: z.array(z.string()),
        })
    ),
})

export type FaqsFormType = z.infer<typeof FaqsFromSchema>

const Page = () => {
    const form = useForm<FaqsFormType>({
        resolver: zodResolver(FaqsFromSchema),
        defaultValues: {
            faqs: [
                { id: '1', question: '', answer: '', tags: [] },
                { id: '2', question: '', answer: '', tags: [] },
            ],
        },
    })

    const { fields, prepend } = useFieldArray({
        name: 'faqs',
        control: form.control,
        keyName: 'key',
    })

    return (
        <>
            <div className="p-8 space-y-6">
                <div className="flex gap-4 w-full">
                    <Input placeholder="Search faqs..." />
                    <div>
                        <Button
                            onClick={() =>
                                prepend({
                                    id: crypto.randomUUID(),
                                    question: '',
                                    answer: '',
                                    tags: [],
                                })
                            }
                        >
                            <span>Add New...</span>

                            <Plus className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
                <div className="space-y-3">
                    <div>
                        <Label>
                            Frequently Asked Questions ({fields.length} Items)
                        </Label>
                        <p className="text-muted-foreground text-sm">
                            List of all FAQ's that assistant can learn and refer
                            to while answering your customer inquires!
                        </p>
                    </div>
                    <div
                        className={cn(fields.length > 0 && 'border rounded-md')}
                    >
                        {fields.map((field, k) => (
                            <div key={field.key}>
                                <Faq />
                                {fields.length !== k + 1 && (
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
