import { firebase_auth } from '@/firebase/config'
import { QueryClient, useQuery } from 'react-query'

import { apiQuery } from '@/lib/api'

export type LocalUser = any //Users & { plan: Plans }

export const LocalUserQueryId = 'user'

export const setUserCache = (data: LocalUser, queryClient: QueryClient) => {
    queryClient.setQueryData(LocalUserQueryId, data)
}

export const deactivateUser = async (deactivate: boolean) => {
    const data = await apiQuery({
        url: '/user/deactivate',
        method: 'PATCH',
        body: { deactivate },
    })
    if (data) {
        !deactivate && (await firebase_auth.currentUser?.getIdToken(true)) // on reactivation
    }
    return data
}

export const useLocalUserQuery = (enabled: boolean) => {
    return useQuery(
        LocalUserQueryId,
        async () =>
            (await apiQuery(
                { url: '/user', method: 'GET' },
                { throwError: true }
            )) as LocalUser,
        { enabled }
    )
}
