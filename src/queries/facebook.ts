import { QueryClient } from 'react-query'

import { apiQuery } from '@/lib/api'

const FacebookAccountQueryId = 'facebook_account'

export const linkFacebook = async (code: string, queryClient: QueryClient) => {
    const result = await apiQuery({
        url: '/facebook/link',
        method: 'POST',
        body: { code },
    })
    if (result) {
        queryClient.setQueryData(FacebookAccountQueryId, result)
    }
}

export const unLinkFacebook = async (queryClient: QueryClient) => {
    const result = await apiQuery({
        url: '/facebook/unlink',
        method: 'POST',
    })
    if (result) {
        queryClient.setQueryData(FacebookAccountQueryId, {
            account: null,
            pages: null,
        })
    }
}
