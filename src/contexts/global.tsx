'use client'

import React, { ReactNode, useEffect } from 'react'
import { firebase_app } from '@/firebase/config'
import { getAnalytics } from 'firebase/analytics'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { queryClient } from '@/lib/queryClient'

const GlobalClientSideProvider = ({ children }: { children: ReactNode }) => {
    useEffect(() => {
        if (typeof window === 'undefined') return
        getAnalytics(firebase_app)
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <NextThemesProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
            >
                {children}
            </NextThemesProvider>
        </QueryClientProvider>
    )
}

export default GlobalClientSideProvider
