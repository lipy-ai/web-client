'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'

import { buttonVariants } from '../ui/button'

interface NavProps {
    isCollapsed: boolean
    links: {
        title: string
        label?: string
        icon: LucideIcon
        url: string
        active: boolean
    }[]
    name?: string
}

export const Nav = ({ links, isCollapsed, name }: NavProps) => {
    return (
        <div data-collapsed={isCollapsed} className="group flex flex-col gap-3">
            {!isCollapsed && name && (
                <>
                    <div className="px-1 font-semibold text-xs text-muted-foreground/50 uppercase flex mt-4">
                        <span className="h-4 w-4 block" />
                        <span>{name}</span>
                    </div>
                </>
            )}
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2 ">
                {links.map((link, index) => {
                    return isCollapsed ? (
                        <Tooltip key={index} delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Link
                                    href={link.url}
                                    className={cn(
                                        buttonVariants({
                                            variant: link.active
                                                ? 'default'
                                                : 'ghost',
                                            size: 'icon',
                                        }),
                                        'h-9 w-9 group-[[data-collapsed=true]]:my-0.5',
                                        link.active &&
                                            'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                                    )}
                                >
                                    <link.icon
                                        className="h-5 w-5"
                                        strokeWidth={1.5}
                                    />
                                    <span className="sr-only">
                                        {link.title}
                                    </span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent
                                side="right"
                                className="flex items-center gap-4"
                            >
                                {link.title}
                                {link.label && (
                                    <span className="ml-auto text-muted-foreground">
                                        {link.label}
                                    </span>
                                )}
                            </TooltipContent>
                        </Tooltip>
                    ) : (
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
                            <link.icon
                                className="mr-2 h-4 w-4"
                                strokeWidth={1.5}
                            />
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
