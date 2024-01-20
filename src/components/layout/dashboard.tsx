'use client'

import React, { ReactNode, useMemo } from 'react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import {
    AlertCircle,
    Blocks,
    FileQuestion,
    FileText,
    Globe,
    Home,
    Mail,
    MailPlus,
    MessageSquareCode,
    MessagesSquare,
    Settings,
    Ticket,
    User,
} from 'lucide-react'

import { cn } from '@/lib/utils'

import OrgSwitcher from '../custom/orgSwitcher'
import { buttonVariants } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip'

interface Props {
    children: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
    const pathname = usePathname()

    const { orgId } = useParams<{ orgId: string }>()

    const navLinks = [
        {
            links: [
                {
                    title: 'Home',
                    icon: Home,
                    url: `/org/${orgId}`,
                },
            ],
        },
        {
            title: 'Tickets',
            links: [
                {
                    title: 'All Tickets',
                    label: '128',
                    icon: Ticket,
                    url: `/org/${orgId}/tickets/view/all`,
                },
                {
                    title: 'Emails',
                    label: '9',
                    icon: Mail,
                    url: `/org/${orgId}/tickets/view/email`,
                },
                {
                    title: 'Chats',
                    label: '',
                    icon: MessagesSquare,
                    url: `/org/${orgId}/tickets/view/chat`,
                },
            ],
        },
        {
            title: 'knowledge base',
            links: [
                {
                    title: 'Website',
                    // label: '972',
                    icon: Globe,
                    url: `/org/${orgId}/knowledge-base/website`,
                },
                {
                    title: 'Documents',
                    // label: '342',
                    icon: FileText,
                    url: `/org/${orgId}/knowledge-base/documents`,
                },
                {
                    title: 'FAQs',
                    // label: '342',
                    icon: FileQuestion,
                    url: `/org/${orgId}/knowledge-base/faqs`,
                },
            ],
        },
        {
            title: 'Set Up',
            links: [
                {
                    title: 'Chatbots',
                    // label: '972',
                    icon: MessageSquareCode,
                    url: `/org/${orgId}/setup/chatbots`,
                },
                {
                    title: 'Email Inbox',
                    // label: '972',
                    icon: MailPlus,
                    url: `/org/${orgId}/setup/email-inbox`,
                },
                {
                    title: 'Integrations',
                    // label: '342',
                    icon: Blocks,
                    url: `/org/${orgId}/setup/integrations`,
                },
            ],
        },
        {
            links: [
                {
                    title: 'Account',
                    // label: '972',
                    icon: User,
                    url: '/account',
                },
                {
                    title: 'Settings',
                    // label: '972',
                    icon: Settings,
                    url: '/settings',
                },
                {
                    title: 'Help',
                    // label: '342',
                    icon: AlertCircle,
                    url: '/help',
                },
            ],
        },
    ]

    const links = useMemo(() => {
        return navLinks.map((n) => {
            const newLinks = n.links.map((l) => {
                return {
                    ...l,
                    active:
                        l.url === `/org/${orgId}`
                            ? l.url === pathname
                            : pathname.slice(0, l.url?.length || 0) === l.url,
                }
            })

            return { ...n, links: newLinks }
        })
    }, [pathname])

    return (
        <div className="flex flex-1 w-full">
            <TooltipProvider delayDuration={0}>
                <div className="flex flex-col h-screen w-[70px] border-r">
                    <div
                        className={cn(
                            'flex h-[52px] items-center justify-center'
                        )}
                    >
                        <OrgSwitcher />
                    </div>
                    <Separator />
                    <ScrollArea>
                        {links.map((nav, i) => (
                            <div
                                className="flex flex-col items-center justify-center border-border/40 border-b py-1.5"
                                key={`nav-${i}`}
                            >
                                {nav.links.map((link, key) => (
                                    <Tooltip key={key} delayDuration={0}>
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
                                                    'h-9 w-9 my-0.5',
                                                    link.active &&
                                                        'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                                                )}
                                            >
                                                {link.icon && (
                                                    <link.icon
                                                        width={20}
                                                        height={20}
                                                        strokeWidth={1.5}
                                                    />
                                                )}
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
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </div>
                        ))}
                    </ScrollArea>
                </div>
                <div className="h-screen overflow-auto w-full">
                    <div className="h-full flex flex-col">{children}</div>
                </div>
            </TooltipProvider>
        </div>
    )
}

export default DashboardLayout
