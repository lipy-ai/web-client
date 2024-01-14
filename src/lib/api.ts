import configuration from '@/configuration'
import { firebase_auth } from '@/firebase/config'
import { differenceInSeconds } from 'date-fns'
import { toast } from 'sonner'

export const getToken = async () => {
    const expiresInSeconds = differenceInSeconds(
        (firebase_auth as any).currentUser?.stsTokenManager?.expirationTime,
        new Date().getTime()
    )

    return await firebase_auth.currentUser?.getIdToken(expiresInSeconds <= 0)
}

export const apiQuery = async (
    {
        url,
        method = 'GET',
        body,
    }: {
        url: string
        method?: 'GET' | 'PATCH' | 'DELETE' | 'POST'
        body?: Record<string, any>
    },
    opts?: { throwError?: boolean; allow_unauthenticated?: boolean }
) => {
    const token = await getToken()

    if (!token && !opts?.allow_unauthenticated) {
        return toast.error('Oh no! Error', {
            description: 'Unable to send request!',
        })
    }

    const headers: HeadersInit = {
        'Content-Type':
            !body && method !== 'GET' ? 'text/plain' : 'application/json',
    }

    if (token && !opts?.allow_unauthenticated) {
        headers.Authorization = `Bearer ${token}`
    }

    return await fetch(configuration.customer_api.url + url, {
        method: method,
        headers,
        body: JSON.stringify(body),
    })
        .then(async (res) => {
            const r = await res.json()
            if (!res.ok) throw r
            return r
        })
        .catch((err) => {
            if (opts?.throwError) throw err
            return toast.error('Oh no! Error', {
                description: err.message || 'Something went wrong',
            })
        })
}
