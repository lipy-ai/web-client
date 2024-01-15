import React, { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'

import DashboardLayout from './dashboard'

const Layout = ({
    title,
    type,
    children,
}: {
    title?: string
    type: 'dashboard'
    children: ReactNode
}) => {
    const layout = cookies().get(`react-resizable-panels:${type}`)
    const collapsed = cookies().get(`react-resizable-panels:${type}-collapsed`)
    const defaultLayout = layout ? JSON.parse(layout.value) : undefined
    const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

    switch (type) {
        case 'dashboard':
            return (
                <DashboardLayout
                    title={title || 'Page Title'}
                    defaultLayout={defaultLayout}
                    defaultCollapsed={defaultCollapsed}
                >
                    {children}
                </DashboardLayout>
            )

        default:
            return children
    }
}

export default Layout
