import Image from 'next/image'

import Navbar from '@/components/custom/navbar'
import Layout from '@/components/layout'

export default function Home() {
    return (
        <Layout type="dashboard">
            <Navbar title="Dashboard" />

            <p className="m-auto p-16 border-2 border-dashed text-3xl">
                Dashboard
            </p>
        </Layout>
    )
}
