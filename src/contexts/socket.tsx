'use client'

import React, { createContext, ReactNode, useContext, useEffect } from 'react'
import { useAuth } from '@/contexts/auth'
import { io, Socket } from 'socket.io-client'
import { toast } from 'sonner'

export interface ISocketContext {
    socket: Socket | null
}

const values = {
    socket: null,
}

const SocketContext = createContext<ISocketContext | null>(values)

const socket = io('http://0.0.0.0:8082/business', {
    transports: ['websocket'],
    path: '/io/',
    autoConnect: false,
    retries: 10,
})

// socket.on('connect', function () {
//     toast.info('Socket connected')
// })

// socket.on('disconnect', function () {
//     toast.info('Socket disconnected')
// })

// socket.on('reconnect', function () {
//     toast.info('Socket reconnected')
// })

// socket.on('error', (err) => {
//     toast.error('Socker Error!', {
//         description: err.message || 'Something went wrong!',
//     })
// })

// socket.on('connect_error', (err: any) => {
//     toast.error('Socket Connection Error!', {
//         description: err.message || 'Something went wrong!',
//     })
// })

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const { token } = useAuth()

    useEffect(() => {
        if (!token) return
        socket.auth = {
            token: token,
        }
        socket.connect()
    }, [token])

    return (
        <SocketContext.Provider
            value={{
                socket,
            }}
        >
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    return useContext(SocketContext)
}
