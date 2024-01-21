import React, { ReactNode } from 'react'

import Navbar from '@/components/custom/navbar'
import Layout from '@/components/layout'
import OrgSettingNav from '@/components/layout/orgSettingsSidebar'

const Page = ({ children }: { children: ReactNode }) => {
    return (
        <Layout type="dashboard">
            <div className="flex w-full">
                <OrgSettingNav />
                <div className="flex-1">
                    <Navbar />
                    {children}
                </div>
            </div>
        </Layout>
    )
}

export default Page
