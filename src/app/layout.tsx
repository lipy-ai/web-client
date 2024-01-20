import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

import { AuthProvider } from '@/contexts/auth'
import GlobalClientSideProvider from '@/contexts/global'
import { SocketProvider } from '@/contexts/socket'
import { Toaster } from 'sonner'

import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={cn(inter.className, 'flex flex-col min-h-screen')}>
                <GlobalClientSideProvider>
                    <AuthProvider>
                        {/* <SocketProvider> */}
                        {children}
                        {/* </SocketProvider> */}
                        <Toaster richColors />
                    </AuthProvider>
                </GlobalClientSideProvider>
            </body>
        </html>
    )
}
