'use client'

import React from 'react'
import { Bird, LucideIcon } from 'lucide-react'

const EmptyPage = (props: {
    img?: string
    icon?: LucideIcon
    title?: string
    description?: string
    children?: React.ReactNode
}) => {
    return (
        <div className="flex-1 h-full flex items-center justify-center flex-col text-center">
            {props.img ? (
                <img
                    className="dark:brightness-75"
                    src={props.img}
                    width={'350px'}
                    height={'350px'}
                />
            ) : props.icon ? (
                <props.icon strokeWidth={1} />
            ) : (
                <Bird strokeWidth={1} width={75} height={75} />
            )}

            <h1 className="text-lg font-medium my-2">
                {props.title || 'Nothing Found Here!'}
            </h1>
            <p className="text-sm text-muted-foreground max-w-[450px]">
                {props.description || 'It feels empty to me.'}
            </p>
            {props.children}
        </div>
    )
}

export default EmptyPage
