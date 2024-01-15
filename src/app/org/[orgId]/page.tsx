import React from 'react'

import Navbar from '@/components/custom/navbar'
import Layout from '@/components/layout'

const Page = ({ params: { orgId } }: { params: { orgId: string } }) => {
    return (
        <Layout type="dashboard">
            <Navbar title="Dashboard" />
        </Layout>
    )
}

export default Page
