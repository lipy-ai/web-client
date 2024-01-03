'use client'

import React, {
    Fragment,
    ReactNode,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { usePathname } from 'next/navigation'
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

import { AccountSwitcher } from '../custom/accountSwitcher'
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

const accounts = [
    {
        label: 'Alicia Koch',
        email: 'alicia@example.com',
        icon: (
            <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>Vercel</title>
                <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
            </svg>
        ),
    },
    {
        label: 'Alicia Koch',
        email: 'alicia@gmail.com',
        icon: (
            <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>Gmail</title>
                <path
                    d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
                    fill="currentColor"
                />
            </svg>
        ),
    },
    {
        label: 'Alicia Koch',
        email: 'alicia@me.com',
        icon: (
            <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>iCloud</title>
                <path
                    d="M13.762 4.29a6.51 6.51 0 0 0-5.669 3.332 3.571 3.571 0 0 0-1.558-.36 3.571 3.571 0 0 0-3.516 3A4.918 4.918 0 0 0 0 14.796a4.918 4.918 0 0 0 4.92 4.914 4.93 4.93 0 0 0 .617-.045h14.42c2.305-.272 4.041-2.258 4.043-4.589v-.009a4.594 4.594 0 0 0-3.727-4.508 6.51 6.51 0 0 0-6.511-6.27z"
                    fill="currentColor"
                />
            </svg>
        ),
    },
]

const DashboardLayout = ({
    title,
    children,
    defaultCollapsed = false,
    defaultLayout = [15, 85],
}: Props) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
    const [layout, setLayout] = useState(defaultLayout)
    const pathname = usePathname()

    const navCollapsedSize = 4

    const keyName = 'dashboard'

    useEffect(() => {
        console.log(isCollapsed)
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
                    url: '/',
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
                    url: '/tickets/all',
                },
                {
                    title: 'Emails',
                    label: '9',
                    icon: Mail,
                    url: '/tickets/emails',
                },
                {
                    title: 'Chats',
                    label: '',
                    icon: MessagesSquare,
                    url: '/tickets/chats',
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
                    url: '/knowledge-base/website',
                },
                {
                    title: 'Documents',
                    // label: '342',
                    icon: FileText,
                    url: '/knowledge-base/documents',
                },
                {
                    title: 'FAQs',
                    // label: '342',
                    icon: FileQuestion,
                    url: '/knowledge-base/faqs',
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
                    url: '/setup/chatbots',
                },
                {
                    title: 'Email Inbox',
                    // label: '972',
                    icon: MailPlus,
                    url: '/setup/email-inbox',
                },
                {
                    title: 'Integrations',
                    // label: '342',
                    icon: Blocks,
                    url: '/setup/integrations',
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

    const active = useMemo(() => {
        let result = undefined
        navLinks.find((n) => {
            return (result = n.links.find((l) =>
                l.url === '/'
                    ? l.url === pathname
                    : pathname.slice(0, l.url?.length || 0) === l.url
            ))
        })
        return result as (typeof navLinks)[0]['links'][0] | undefined
    }, [pathname])

    console.log(active)

    return (
        <div className="h-screen">
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
                        <div className="flex flex-col h-full">
                            <div
                                className={cn(
                                    'flex h-[52px] items-center justify-center',
                                    isCollapsed && 'h-[52px]'
                                )}
                            >
                                <AccountSwitcher
                                    isCollapsed={isCollapsed}
                                    accounts={accounts}
                                />
                            </div>
                            <Separator />
                            <ScrollArea className="py-2">
                                {navLinks.map((nav, i) => (
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
                        <div className="flex items-center px-4 py-2 h-[52px]">
                            <h1 className="text-xl font-bold capitalize">
                                {active?.title || ''}
                            </h1>
                        </div>
                        <Separator />
                        <div className="h-full flex flex-col">{children}</div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </TooltipProvider>
        </div>
    )
}

export default DashboardLayout
