import Image from 'next/image'

import Layout from '@/components/layout'

export default function Home() {
    return (
        <Layout type="dashboard">
            <p className="m-auto p-16 border-2 border-dashed text-3xl">
                Dashboard
            </p>
        </Layout>
    )
}
