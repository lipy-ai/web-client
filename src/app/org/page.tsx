'use client'

import { useOrgsQuery } from '@/queries/orgs'

const Page = () => {
    const { data, isLoading, isError } = useOrgsQuery()

    return <div></div>
}

export default Page
