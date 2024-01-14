'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/auth'
import {
    getAuthCache,
    setAuthCache,
    signInWithEmailLink,
} from '@/firebase/auth'
import { addSeconds, differenceInSeconds } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { FullPageError } from '@/components/custom/error'
import { FullPageLoader } from '@/components/custom/loader'

const Page = () => {
    const searchParams = useSearchParams()

    const url_email = searchParams.get('value')
    const [counter, setCounter] = useState(0)

    const [email, setEmail] = useState<string | null>(null)
    const [loading, setLoading] = useState<'initial' | 'api' | null>('initial')
    const [error, setError] = useState<string | null>(null)

    const emailSchema = z.string().email().toLowerCase()

    const { user } = useAuth()

    const router = useRouter()

    const handleEmail = async () => {
        if (!email || counter > 0) return
        loading !== 'initial' && setLoading('api')

        const { result } = await signInWithEmailLink(email)

        if (result) {
            setCounter(result?.wait_for_seconds || result?.default_seconds || 0)
            if (result?.default_seconds) {
                setAuthCache({
                    magic_link_default_wait_seconds: result.default_seconds,
                    magic_link_sent: true,
                })
            }
        }
        setLoading(null)
    }

    const handleInitial = async () => {
        try {
            const parsed = emailSchema.safeParse(url_email)
            if (!parsed.success) throw new Error('Invalid Email Provided')
            setEmail(parsed.data)
        } catch (error: any) {
            setError(error.message)
            setLoading(null)
        }
    }

    useEffect(() => {
        handleInitial()
    }, [])

    useEffect(() => {
        const cache = getAuthCache()
        if (user) return router.replace(cache?.redirect_url || '/dashboard')
        const date = cache?.magic_link_sent_at
        const defaultTime = cache?.magic_link_default_wait_seconds

        let timer = counter

        if (date && defaultTime && counter <= 0) {
            const lastEmailTime = new Date(Number(date))
            timer = differenceInSeconds(
                addSeconds(lastEmailTime, defaultTime),
                new Date()
            )
        }
        if (!cache?.magic_link_sent) {
            handleEmail()
        } else {
            setCounter(timer)
            setLoading(null)
        }
        return
    }, [email, user])

    useEffect(() => {
        if (counter <= 0) return
        const intervalId = setInterval(() => {
            setCounter((prev) => prev - 1)
        }, 1000)

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId)
    }, [counter])

    if (loading === 'initial') return <FullPageLoader />

    if (error)
        return (
            <FullPageError
                title="Failed to send magic link"
                message={`Reason: ${error}`}
            >
                <Link
                    href={'/auth'}
                    className={cn(buttonVariants({ variant: 'secondary' }))}
                >
                    Okay
                </Link>
            </FullPageError>
        )

    return (
        <div className="flex h-screen w-full items-center justify-center p-4">
            <div className="max-w-[550px] text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/mail.png"
                    alt="Email sent image"
                    width={350}
                    height={350}
                    className="mx-auto mb-6"
                />
                <h1 className="mb-4 text-4xl font-semibold">
                    Check Your Email Inbox
                </h1>
                <p className="mb-8 text-lg text-muted-foreground">
                    An email to {email} has been sent! Please check your inbox
                    and click on sigin link to continue.
                </p>
                <Button
                    size={null}
                    className="w-[200px] py-4 text-lg"
                    onClick={handleEmail}
                    disabled={counter > 0 || loading === 'api'}
                >
                    {loading === 'api' ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                    ) : counter > 0 ? (
                        `${counter} seconds`
                    ) : (
                        'Resend Email'
                    )}
                </Button>
            </div>
        </div>
    )
}

export default Page
