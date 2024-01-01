import React from 'react'

import Layout from '@/components/layout'

import TicketList from '../components/list'

const Page = () => {
    return (
        <Layout type="dashboard">
            <TicketList />
        </Layout>
    )
}

export default Page
