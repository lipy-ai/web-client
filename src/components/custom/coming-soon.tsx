'use client'

/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { useRouter } from 'next/navigation'

const ComingSoonPage = () => {
    const router = useRouter()

    return (
        <>
            <div className="h-full flex flex-col flex-1 items-center justify-center space-y-10">
                <img
                    src="/coming-soon.svg"
                    alt="coming soon image"
                    width={300}
                    height={300}
                />
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">Coming Soon</h1>
                    <p className="px-4 max-w-sm text-sm text-muted-foreground">
                        We're currenlty working on it. Contact us on{' '}
                        <a
                            href="mailto:team@lipy.ai"
                            className="underline hover:text-primary"
                        >
                            team@lipy.ai
                        </a>{' '}
                        for further information.
                    </p>
                </div>
            </div>
        </>
    )
}

export default ComingSoonPage
