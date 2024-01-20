'use client'

import { createContext, ReactNode, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSingleOrgQuery } from '@/queries/orgs'
import { toast } from 'sonner'

import { FullPageError } from '@/components/custom/error'
import { FullPageLoader } from '@/components/custom/loader'

type ContextType = {
    data: any
}

const context = createContext<ContextType>({
    data: null,
})

export const OrgProvider = ({
    orgId,
    children,
}: {
    orgId: string
    children: ReactNode
}) => {
    const { data, isLoading, isError } = useSingleOrgQuery(orgId)
    const router = useRouter()
    useEffect(() => {
        if (!isError) return
        toast.error('Failed to load organisation data!')
        router.push('/org')
    }, [isError])

    if (isLoading || isError) return <FullPageLoader />

    return <context.Provider value={{ data }}>{children}</context.Provider>
}
export const useOrg = () => {
    return useContext(context)
}
