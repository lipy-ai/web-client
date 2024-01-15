import React from 'react'

import Layout from '@/components/layout'

import View from '../../components/view'

const Page = ({ params: { id } }: { params: { id: string } }) => {
    return (
        <Layout type="dashboard">
            <View />
        </Layout>
    )
}

export default Page
