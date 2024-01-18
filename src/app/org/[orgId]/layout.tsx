import React, { ReactNode } from 'react'
import { redirect } from 'next/navigation'

import Navbar from '@/components/custom/navbar'
import Layout from '@/components/layout'

const Page = ({
    children,
    params: { orgId },
}: {
    children: ReactNode
    params: { orgId: string }
}) => {
    if (!orgId || orgId === undefined) redirect('/org')
    return (
        <Layout type="dashboard">
            <Navbar />
            {children}
        </Layout>
    )
}

export default Page
