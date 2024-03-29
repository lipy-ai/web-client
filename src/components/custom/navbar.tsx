'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, HelpCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

import { buttonVariants } from '../ui/button'
import { Separator } from '../ui/separator'
import { UserNav } from './userNav'

const Navbar = ({ titles = {} }: { titles?: Record<string, string> }) => {
    const pathname = usePathname()
    const title = useMemo(() => {
        let key = null
        Object.keys(titles).forEach((k) => pathname.includes(k) && (key = k))
        if (key) return titles[key]
    }, [pathname, titles])

    return (
        <div className="sticky top-0 bg-background">
            <div className="flex justify-between px-3 py-2 items-center">
                <div className="h-9 flex item-center">
                    <h1 className="font-semibold text-lg leading-none my-auto">
                        {title}
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <Link
                        href="/"
                        className={cn(
                            buttonVariants({
                                variant: 'ghost',
                                size: 'sm',
                            })
                        )}
                    >
                        <span>Help</span>
                    </Link>
                    <Link
                        href="/"
                        className={cn(
                            buttonVariants({
                                variant: 'outline',
                                size: 'sm',
                            })
                        )}
                    >
                        <span>Feedback</span>
                    </Link>
                    <Link
                        href="/"
                        className={cn(
                            buttonVariants({
                                variant: 'ghost',
                                size: 'icon',
                            }),
                            'rounded-full'
                        )}
                    >
                        <Bell className="w-5 h-5 text-muted-foreground" />
                        {/* <span>Help</span> */}
                    </Link>
                    <UserNav />
                </div>
            </div>
            <Separator />
        </div>
    )
}

export default Navbar
