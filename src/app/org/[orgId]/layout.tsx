import React, { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { OrgProvider } from '@/contexts/org'

import Navbar from '@/components/custom/navbar'
import Layout from '@/components/layout'

const Page = async ({
    children,
    params: { orgId },
}: {
    children: ReactNode
    params: { orgId: string }
}) => {
    if (!orgId) redirect('/org')

    return (
        <OrgProvider orgId={orgId}>
            <Layout type="dashboard">
                <Navbar
                    titles={{
                        '/org': 'Dashboard',
                        '/tickets/view/all': 'All Tickets',
                        '/tickets/view/email': 'Emails Tickets',
                        '/tickets/view/chat': 'Chats Tickets',
                        '/knowledge-base': 'Knowledge Base',
                        '/setup': 'Assistant Setup',
                        '/settings': 'Organisation Settings',
                    }}
                />
                {children}
            </Layout>
        </OrgProvider>
    )
}

export default Page
