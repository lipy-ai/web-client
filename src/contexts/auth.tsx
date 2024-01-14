'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { removeAuthCache } from '@/firebase/auth'
import { firebase_auth, firebase_db, firebase_fn } from '@/firebase/config'
// import { LocalUser, useLocalUserQuery } from '@/queries/user'
import { connectAuthEmulator, getIdTokenResult, User } from 'firebase/auth'
import { connectFirestoreEmulator } from 'firebase/firestore'
import { connectFunctionsEmulator } from 'firebase/functions'

export interface IAuthContext {
    loading: boolean
    user: User | null
    // local: LocalUser | undefined
    token: string | null
}

const values = {
    loading: false,
    user: null,
    local: undefined,
    token: null,
}

const AuthContext = createContext<IAuthContext>(values)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState<IAuthContext['token']>(null)
    // const { data: local, isLoading: localFetching } = useLocalUserQuery(
    //     !!token && !loading && !!user
    // )

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
        if (!user) return setToken(null)
        getIdTokenResult(user)
            .then((res) => {
                if (res.claims.deactivated && pathname !== '/deactivated') {
                    handleDeactivated()
                }

                setToken(res.token)
            })
            .catch((err) => setToken(null))

        removeAuthCache()
    }, [user])

    return (
        <AuthContext.Provider
            value={{
                loading: loading, //|| localFetching,
                user,
                // local,
                token,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
