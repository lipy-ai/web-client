import React from 'react'

import Navbar from '@/components/custom/navbar'
import Layout from '@/components/layout'

const Page = ({ params: { orgId } }: { params: { orgId: string } }) => {
    return (
        <Layout type="dashboard">
            <Navbar title="Dashboard" />
            <h1 className="m-auto p-8 border-2 border-dashed">Dashboard</h1>
        </Layout>
    )
}

export default Page
