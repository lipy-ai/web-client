'use client'

import React, { useMemo } from 'react'
import { usePathname } from 'next/navigation'

import { Nav } from '../custom/sidebar'
import { Separator } from '../ui/separator'

const AccountNav = () => {
    const pathname = usePathname()

    const links = useMemo(() => {
        const navLinks = [
            {
                title: 'Profile',
                url: '/account',
                active: false,
            },
            {
                title: 'Billing',
                url: '/account/billing',
                active: false,
            },
            {
                title: 'Notifications',
                url: '/account/notifications',
                active: false,
            },
            {
                title: 'Appearence',
                url: '/account/appearences',
                active: false,
            },
        ]
        let idx = 0
        navLinks.forEach((l, i) => pathname.includes(l.url) && (idx = i))
        navLinks[idx].active = true
        return navLinks
    }, [pathname])

    return (
        <div className="w-[200px] border-r h-screen sticky top-0">
            <div className="sticky top-0 bg-background">
                <div className="flex justify-between px-3 py-2 items-center">
                    <div className="h-9 flex item-center">
                        <h1 className="font-semibold text-lg leading-none my-auto">
                            Account
                        </h1>
                    </div>
                </div>
                <Separator />
            </div>
            <div className="py-5">
                <Nav links={links} />
            </div>
        </div>
    )
}

export default AccountNav
