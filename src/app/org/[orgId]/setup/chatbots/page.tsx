'use client'

import React from 'react'
import configuration from '@/configuration'
import { Minus, Plus, X } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { TextArea } from '@/components/ui/textarea'
import CustomInput from '@/components/custom/customInput'
import Upload from '@/components/custom/upload'

const Page = () => {
    return (
        <>
            <div className="flex h-full">
                <div className="flex-1 border-r p-8">
                    <div className="space-y-8">
                        <div>
                            <Label>Basic Information</Label>
                            <p className="text-sm text-muted-foreground mb-4">
                                Add basic information for the assistant below:
                            </p>
                            <div className="flex gap-8 items-center">
                                <div className="w-24 h-24">
                                    <Upload />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <Input placeholder="Name" />
                                    <Input placeholder="Description" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label>Behaviour</Label>
                            <p className="text-sm text-muted-foreground mb-4">
                                In what style your assistant should answer?
                            </p>
                            <div className="pt-6 pb-4 px-4 border rounded-md">
                                <Slider
                                    defaultValue={[1]}
                                    max={2}
                                    min={0}
                                    step={1}
                                />
                                <div className="flex justify-between text-muted-foreground text-sm pt-3">
                                    <span className="text-center">Formal</span>
                                    <span className="text-center ml-8">
                                        Casual
                                    </span>
                                    <span className="text-center">
                                        Enthusiastic
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label>Initial Message</Label>
                            <p className="text-sm text-muted-foreground mb-4">
                                Add an initial message that your assistant can
                                send to customers to start a conversation{' '}
                            </p>
                            <TextArea
                                className="border min-h-20"
                                placeholder="Add initial message here"
                            />
                        </div>
                        <div>
                            <Label>Quick Questions</Label>
                            <p className="text-sm text-muted-foreground mb-4">
                                Add quick questions that customers usually asks
                            </p>
                            <div className="space-y-4">
                                <div className="border flex justify-between items-center rounded-md">
                                    <CustomInput
                                        className="flex px-2"
                                        placeholder="Write Message here"
                                        defaultValue={''}
                                    />
                                    <Button variant={'ghost'}>
                                        <X className="text-muted-foreground w-5 h-5" />
                                    </Button>
                                </div>
                                <Button variant={'outline'} size={'sm'}>
                                    <Plus className=" w-5 h-5" />
                                    <span>Add More</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[40%] flex justify-center items-center">
                    <div>
                        <div className="m-auto h-[650px] w-[350px] shadow-xl rounded-2xl overflow-hidden flex flex-col">
                            <WebChatHead />
                            <div className="flex-1"></div>
                            <WebChatFoot />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page

export const WebChatFoot = () => {
    return (
        <div className="p-4 space-y-3">
            <Input placeholder="Write your message..." />
            <p className="font-light text-xs text-center">
                ⚡ Powered by&nbsp;
                <a
                    className="text-primary"
                    href={configuration.site.siteUrl}
                    target="_blank"
                >
                    Lipy AI
                </a>
                &nbsp;
            </p>
        </div>
    )
}

export const WebChatHead = () => {
    return (
        <div className="h-14 bg-primary w-full flex items-center justify-between p-4">
            <div className="flex gap-3 items-center">
                <span className="w-6 h-6 bg-muted rounded-full block">
                    <img src="" />
                </span>
                <span className="font-medium text-md text-primary-foreground">
                    Lipy
                </span>
            </div>
            <div className="flex gap-1">
                <Button
                    variant={'ghost'}
                    size={'icon'}
                    className="hover:bg-muted/20"
                >
                    <Minus
                        width={20}
                        height={20}
                        className="text-primary-foreground"
                    />
                </Button>
                <Button
                    variant={'ghost'}
                    size={'icon'}
                    className="hover:bg-muted/20"
                >
                    <X
                        width={20}
                        height={20}
                        className="text-primary-foreground"
                    />
                </Button>
            </div>
        </div>
    )
}
