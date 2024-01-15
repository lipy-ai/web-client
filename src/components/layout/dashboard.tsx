'use client'

import React, { Fragment, ReactNode, useEffect, useMemo, useState } from 'react'
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
import { Nav } from '../custom/sidebar'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '../ui/resizable'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { TooltipProvider } from '../ui/tooltip'

interface Props {
    title: string
    defaultLayout: number[] | undefined
    defaultCollapsed?: boolean
    children: ReactNode
}

const DashboardLayout = ({
    children,
    defaultCollapsed = false,
    defaultLayout = [15, 85],
}: Props) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
    const [layout, setLayout] = useState(defaultLayout)
    const pathname = usePathname()
    const navCollapsedSize = 4

    const { orgId } = useParams<{ orgId: string }>()

    const keyName = 'dashboard'

    useEffect(() => {
        document.cookie = `react-resizable-panels:${keyName}-collapsed=${JSON.stringify(
            isCollapsed
        )}; path=/`
    }, [isCollapsed])

    useEffect(() => {
        document.cookie = `react-resizable-panels:${keyName}=${JSON.stringify(
            layout
        )};  path=/`
    }, [layout])

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
        <div>
            <TooltipProvider delayDuration={0}>
                <ResizablePanelGroup
                    autoSaveId={keyName}
                    direction="horizontal"
                    onLayout={(sizes: number[]) => setLayout(sizes)}
                    className="flex-1 items-stretch"
                >
                    <ResizablePanel
                        defaultSize={layout[0]}
                        collapsedSize={navCollapsedSize}
                        collapsible={true}
                        minSize={10}
                        maxSize={17}
                        onCollapse={() => {
                            setIsCollapsed(true)
                        }}
                        onExpand={() => {
                            setIsCollapsed(false)
                        }}
                        className={cn(
                            isCollapsed &&
                                'min-w-[50px] transition-all duration-300 ease-in-out'
                        )}
                    >
                        <div className="flex flex-col h-screen">
                            <div
                                className={cn(
                                    'flex h-[52px] items-center justify-center',
                                    isCollapsed && 'h-[52px]'
                                )}
                            >
                                <OrgSwitcher isCollapsed={isCollapsed} />
                            </div>
                            <Separator />
                            <ScrollArea className="py-4">
                                {links.map((nav, i) => (
                                    <Fragment key={`nav-${i}`}>
                                        <Nav
                                            key={i}
                                            name={nav.title}
                                            isCollapsed={isCollapsed}
                                            links={nav.links}
                                        />
                                        {/* {i < navLinks.length - 1 && (
                                            <Separator />
                                        )} */}
                                    </Fragment>
                                ))}
                            </ScrollArea>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={layout[1]} minSize={30}>
                        <div className="h-screen overflow-auto">
                            <div className="h-full flex flex-col">
                                {children}
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </TooltipProvider>
        </div>
    )
}

export default DashboardLayout
