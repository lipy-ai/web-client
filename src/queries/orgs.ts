import { OrgListTable } from 'lipy-ai/db'
import { useQuery, useQueryClient } from 'react-query'

import { apiQuery } from '@/lib/api'
import { queryClient } from '@/lib/queryClient'
import { CreateOrgFormType } from '@/app/org/components/createOrg'

export type ALLOrgsResult = {
    owned: OrgListTable[]
    delegated: OrgListTable[]
}

export const ALLOrgsQueryId = 'orgs'

export const useOrgsQuery = (enabled = true) => {
    return useQuery<ALLOrgsResult>(
        ALLOrgsQueryId,
        async () =>
            await apiQuery(
                { url: '/orgs', method: 'GET' },
                { throwError: true }
            )
    )
}

export const apiCreateOrg = async (data: CreateOrgFormType) => {
    const result = await apiQuery({
        url: '/org',
        method: 'POST',
        body: data,
    })
    if (result) {
        queryClient.setQueryData<ALLOrgsResult | undefined>(
            ALLOrgsQueryId,
            (prev) => {
                if (!prev) return
                const owned = [result]
                if (prev?.owned) {
                    owned.push(...prev.owned)
                }
                return { ...prev, owned }
            }
        )
    }
}
