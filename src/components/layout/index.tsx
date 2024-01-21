import React, { ReactNode } from 'react'

import DashboardLayout from './dashboard'

const Layout = ({
    type,
    children,
}: {
    type: 'dashboard'
    children: ReactNode
}) => {
    switch (type) {
        case 'dashboard':
            return <DashboardLayout>{children}</DashboardLayout>

        default:
            return children
    }
}

export default Layout
