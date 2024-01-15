import { OrgTicketsTable } from 'lipy-ai/db'
import { useQuery } from 'react-query'

import { apiQuery } from '@/lib/api'

export type ALLTicketResult = Partial<OrgTicketsTable>[]

export const ALLTicketsQueryId = 'tickets'

export const useTicketsQuery = (p: {
    orgId: string
    page: number
    filter?: {
        q: string
        type: 'id' | 'platform' | 'status' | 'priorities' | 'assignee'
    }
}) => {
    return useQuery<ALLTicketResult>(
        ALLTicketsQueryId,
        async () =>
            await apiQuery(
                {
                    url: `/tickets?orgId=${p.orgId}&page=${p.page}&limit=30${
                        p.filter ? `&filter=${JSON.stringify(p.filter)}` : ''
                    }`,
                    method: 'GET',
                },
                { throwError: true }
            )
    )
}
