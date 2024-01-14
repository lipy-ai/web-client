import { useQuery } from 'react-query'

import { apiQuery } from '@/lib/api'

export const ALLTicketsQueryId = 'tickets'

export const useTicketsQuery = (enabled = true) => {
    return useQuery(
        ALLTicketsQueryId,
        async () =>
            await apiQuery(
                { url: '/tickets', method: 'GET' },
                { throwError: true }
            )
    )
}
