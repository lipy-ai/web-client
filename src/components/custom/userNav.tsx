'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth'
import { logOut } from '@/firebase/auth'
import { Loader2 } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const UserNav = () => {
    const [loggingOut, setLoggingOut] = useState(false)
    const { user } = useAuth()

    if (!user) return null

    const handleLogout = (e: any) => {
        e.preventDefault()
        setLoggingOut(true)
        logOut()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full p-0"
                >
                    <Avatar className="h-8 w-8 border">
                        <AvatarImage
                            src={user.photoURL!}
                            alt={user.displayName!}
                            className="object-cover"
                        />
                        <AvatarFallback>
                            {user.displayName
                                ?.split(' ')
                                .map((chunk: any) => chunk[0])
                                .join('')}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.displayName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="space-x-2"
                >
                    <span>{loggingOut ? 'Logging out...' : 'Log out'} </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
