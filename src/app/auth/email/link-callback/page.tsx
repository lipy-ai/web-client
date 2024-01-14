'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getAuthCache } from '@/firebase/auth'
import { firebase_auth } from '@/firebase/config'
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { FullPageError } from '@/components/custom/error'
import { FullPageLoader } from '@/components/custom/loader'

const EmailCallbackValidatePage = () => {
    const router = useRouter()

    const href = (typeof window !== 'undefined' && window.location.href) || '/'

    const [error, setError] = useState(false)

    const handle = async (
        href: string,
        email: string,
        cache: ReturnType<typeof getAuthCache>
    ) => {
        try {
            const redirectUrl = cache?.redirect_url || '/'
            await signInWithEmailLink(firebase_auth, email, href)

            router.replace(redirectUrl)
        } catch (err) {
            setError(true)
        }
    }

    useEffect(() => {
        const cache = getAuthCache()
        const email = cache?.magic_link_email
        if (!isSignInWithEmailLink(firebase_auth, href) || !email) {
            router.push('/auth')
        } else {
            handle(href, email, cache)
        }
    }, [])

    if (error)
        return (
            <FullPageError
                title={'Failed to Sign in'}
                message={
                    'We&apos;ve encounterd some issues, validating your signin link, Please try again.'
                }
            >
                <Link
                    href={'/auth'}
                    className={cn(buttonVariants({ variant: 'secondary' }))}
                >
                    Okay
                </Link>
            </FullPageError>
        )

    return <FullPageLoader />
}

export default EmailCallbackValidatePage
