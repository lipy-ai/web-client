'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { removeAuthCache } from '@/firebase/auth'
import { firebase_auth, firebase_db, firebase_fn } from '@/firebase/config'
// import { LocalUser, useLocalUserQuery } from '@/queries/user'
import { connectAuthEmulator, getIdTokenResult, User } from 'firebase/auth'
import { connectFirestoreEmulator } from 'firebase/firestore'
import { connectFunctionsEmulator } from 'firebase/functions'
import { toast } from 'sonner'

import { FullPageLoader } from '@/components/custom/loader'

export interface IAuthContext {
    loading: boolean
    user: User | null
}

const values = {
    loading: false,
    user: null,
}

const AuthContext = createContext<IAuthContext>(values)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const router = useRouter()
    const pathname = usePathname()

    const handleDeactivated = async () => {
        router.replace('/deactivated')
    }
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_APP_ENV === 'staging') {
            connectFirestoreEmulator(firebase_db, 'localhost', 8080)
            connectFunctionsEmulator(firebase_fn, 'localhost', 5001)
            connectAuthEmulator(firebase_auth, 'http://localhost:9099')
            console.warn(
                'Conneted Firebase emulators, Please remove in production'
            )
        }
        const unsubscribe = firebase_auth.onAuthStateChanged((curr) => {
            setUser(curr)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (loading) return
        if (!user) return router.push('/auth')
        getIdTokenResult(user)
            .then((res) => {
                if (res.claims.deactivated && pathname !== '/deactivated') {
                    handleDeactivated()
                }
            })
            .catch((err) => toast.error('Failed to fetch token result'))

        removeAuthCache()
    }, [user, loading])

    return (
        <AuthContext.Provider
            value={{
                loading: loading, //|| localFetching,
                user,
            }}
        >
            {!user && !pathname.includes('/auth') ? (
                <FullPageLoader />
            ) : (
                children
            )}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
