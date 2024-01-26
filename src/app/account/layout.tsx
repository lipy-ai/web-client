import React, { ReactNode } from 'react'

import Navbar from '@/components/custom/navbar'
import Layout from '@/components/layout'
import AccountNav from '@/components/layout/accountSidebar'

const Page = ({ children }: { children: ReactNode }) => {
    return (
        <Layout type="dashboard">
            <div className="flex">
                <AccountNav />
                <div className="flex-1">
                    <Navbar />
                    <div>{children}</div>
                </div>
            </div>
        </Layout>
    )
}

export default Page
