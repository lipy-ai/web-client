'use client'

import React, { useMemo } from 'react'
import { usePathname } from 'next/navigation'

import { Nav } from '../custom/sidebar'
import { Separator } from '../ui/separator'

const OrgSettingNav = () => {
    const pathname = usePathname()

    const links = useMemo(() => {
        const navLinks = [
            {
                title: 'General',
                url: '/settings',
                active: false,
            },
            {
                title: 'Members',
                url: '/settings/members',
                active: false,
            },
            {
                title: 'Usage',
                url: '/settings/usage',
                active: false,
            },
            {
                url: '/settings/usage',
                active: false,
            },
        ]
        let idx = 0
        navLinks.forEach((l, i) => pathname.includes(l.url) && (idx = i))
        navLinks[idx].active = true
        return navLinks
    }, [pathname])

    return (
        <div className="w-[200px] border-r h-screen">
            <div className="sticky top-0 bg-background">
                <div className="flex justify-between px-3 py-2 items-center">
                    <div className="h-9 flex item-center">
                        <h1 className="font-semibold text-lg leading-none my-auto">
                            Organisation
                        </h1>
                    </div>
                </div>
            </div>
            <Separator />
            <div className="py-5">
                <Nav links={links} />
            </div>
        </div>
    )
}

export default OrgSettingNav
