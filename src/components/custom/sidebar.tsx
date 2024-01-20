'use client'

import Link from 'next/link'
import { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { buttonVariants } from '../ui/button'

interface NavProps {
    links: {
        title: string
        label?: string
        icon?: LucideIcon
        url: string
        active: boolean
    }[]
    name?: string
}

export const Nav = ({ links, name }: NavProps) => {
    return (
        <div className="flex flex-col gap-3">
            {name && (
                <>
                    <div className="px-1 font-semibold text-xs text-muted-foreground/50 uppercase flex mt-4">
                        <span className="h-4 w-4 block" />
                        <span>{name}</span>
                    </div>
                </>
            )}
            <nav className="grid gap-2 px-2">
                {links.map((link, index) => {
                    return (
                        <Link
                            key={index}
                            href={link.url}
                            className={cn(
                                buttonVariants({
                                    variant: 'ghost',
                                    size: 'sm',
                                }),
                                link.active &&
                                    'text-primary bg-primary/10 hover:text-primary hover:bg-primary/10 ',
                                'justify-start'
                            )}
                        >
                            {link.icon && (
                                <link.icon
                                    className="mr-2 h-4 w-4"
                                    strokeWidth={1.5}
                                />
                            )}
                            {link.title}
                            {link.label && (
                                <span
                                    className={cn(
                                        'ml-auto',
                                        link.active && 'text-primary'
                                    )}
                                >
                                    {link.label}
                                </span>
                            )}
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
