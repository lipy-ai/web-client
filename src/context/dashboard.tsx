'use client'

import { createContext, ReactNode, useContext } from 'react'

const IsSsrMobileContext = createContext(false)

export const SsrMobileProvider = ({
    value,
    children,
}: {
    value: boolean
    children: ReactNode
}) => {
    return (
        <IsSsrMobileContext.Provider value={value}>
            {children}
        </IsSsrMobileContext.Provider>
    )
}
export const useIsMobile = () => {
    const isSsrMobile = useContext(IsSsrMobileContext)

    return isSsrMobile
}
