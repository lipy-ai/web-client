import configuration from '@/configuration'
import { linkFacebook } from '@/queries/facebook'
import {
    FacebookAuthProvider,
    GoogleAuthProvider,
    linkWithPopup,
    reauthenticateWithPopup,
    signInWithPopup,
    signOut,
    User,
} from 'firebase/auth'
import { httpsCallable } from 'firebase/functions'
import { QueryClient } from 'react-query'
import { toast } from 'sonner'

import { currentUnixTime } from '@/lib/date'

import { firebase_auth, firebase_fn } from './config'

type CacheType = {
    redirect_url?: string
    magic_link_sent_at?: number
    magic_link_default_wait_seconds?: number
    magic_link_sent?: boolean
    magic_link_email?: string
}

export const getAuthCache = () => {
    const data = window.localStorage.getItem('authCache')
    return ((data && JSON.parse(data)) || null) as CacheType | null
}

export const setAuthCache = (data: CacheType) => {
    const old = getAuthCache()

    return window.localStorage.setItem(
        'authCache',
        JSON.stringify({ ...old, ...data })
    )
}

export const removeAuthCache = () => {
    return window.localStorage.removeItem('authCache')
}

export async function signInWithEmailLink(email: string) {
    let result: {
        email: string
        default_seconds: number
        wait_for_seconds: number
    } | null = null
    let error = null
    const URL = process.env.NEXT_PUBLIC_WEB_URL
    if (!URL) return { result, error: Error('Invalid url') }
    try {
        const { data } = await httpsCallable(
            firebase_fn,
            'authFunction'
        )({ action: 'magic_link', body: { email } })
        data &&
            setAuthCache({
                magic_link_sent_at: currentUnixTime(),
                magic_link_email: email,
            })
        result = data as any
    } catch (err: any) {
        toast.error(`Failed to send magic link to ${email}!`, {
            description: err.message,
        })
        error = err
    }
    return { result, error }
}

export async function logOut() {
    return await signOut(firebase_auth)
}

export async function signInWithGoogle() {
    let result = null
    let error = null
    try {
        const provider = new GoogleAuthProvider()

        result = await signInWithPopup(firebase_auth, provider)
    } catch (e: any) {
        if (
            !['auth/popup-closed-by-user', 'auth/user-cancelled'].includes(
                e.code
            )
        ) {
            toast.error('Failed to signin with google', {
                description: `Code: ${e.code}`,
            })
            error = e
        }
    }
    return { result, error }
}

export async function signInWithFacebook() {
    let result = null
    let error = null
    try {
        const provider = new FacebookAuthProvider()
        provider.setCustomParameters({
            config_id: String(
                configuration.facebook.config_id.business_management
            ),
            display: 'popup',
        })
        result = await signInWithPopup(firebase_auth, provider)
    } catch (e: any) {
        if (
            !['auth/popup-closed-by-user', 'auth/user-cancelled'].includes(
                e.code
            )
        ) {
            toast.error('Failed to signin with facebook', {
                description: `Code: ${e.code}`,
            })
            error = e
        }
    }
    return { result, error }
}

export async function linkWithFacebook(user: User, queryClient: QueryClient) {
    let result = null
    let error = null
    try {
        const provider = new FacebookAuthProvider()
        provider.setCustomParameters({
            config_id: String(configuration.facebook.config_id.full_access),
            auth_type: 'rerequest',
            display: 'popup',
        })

        const shouldLink = !user.providerData.find(
            (p) => p.providerId === 'facebook.com'
        )
        result = shouldLink
            ? await linkWithPopup(user, provider)
            : await reauthenticateWithPopup(user, provider)

        if (result) {
            if ((result as any)._tokenResponse.oauthAccessToken) {
                await linkFacebook(
                    (result as any)._tokenResponse.oauthAccessToken,
                    queryClient
                )
            } else {
                toast.error('Failed to find token!')
            }
        }
    } catch (e: any) {
        if (
            !['auth/popup-closed-by-user', 'auth/user-cancelled'].includes(
                e.code
            )
        ) {
            toast.error('Failed to link with facebook', {
                description: `Code: ${e.code}`,
            })
            error = e
        }
    }
    return { result, error }
}
