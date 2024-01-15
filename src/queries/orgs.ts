import { useQuery } from 'react-query'

import { apiQuery } from '@/lib/api'

export const ALLOrgsQueryId = 'orgs'

export const useOrgsQuery = (enabled = true) => {
    return useQuery(
        ALLOrgsQueryId,
        async () =>
            await apiQuery(
                { url: '/orgs', method: 'GET' },
                { throwError: true }
            )
    )
}
