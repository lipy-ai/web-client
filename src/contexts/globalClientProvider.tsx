'use client'

import React, { ReactNode, useEffect, useRef } from 'react'
import { firebase_app, firebase_auth } from '@/firebase/config'
import { getAnalytics } from 'firebase/analytics'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: 0,
            staleTime: 1000 * 60 * 15, //15 mins
        },
    },
})
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
