'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface AccountSwitcherProps {
    isCollapsed: boolean
    accounts: {
        label: string
        email: string
        icon: React.ReactNode
    }[]
}

export function AccountSwitcher({
    isCollapsed,
    accounts,
}: AccountSwitcherProps) {
    const [selectedAccount, setSelectedAccount] = React.useState<string>(
        accounts[0].email
    )

    return (
        <Select
            defaultValue={selectedAccount}
            onValueChange={setSelectedAccount}
        >
            <SelectTrigger
                className={cn(
                    'my-4 mx-2 border-0 p-1.5 flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
                    isCollapsed &&
                        'h-9 w-9 flex shrink-0 items-center justify-center [&>span]:w-auto [&>svg]:hidden p-0'
                )}
                aria-label="Select account"
            >
                <SelectValue placeholder="Select an account">
                    <span
                        className={cn(
                            'border rounded-md h-9 w-9 flex items-center justify-center shrink-0',
                            isCollapsed ? 'h-9 w-9' : 'h-7 w-7'
                        )}
                    >
                        {
                            accounts.find(
                                (account) => account.email === selectedAccount
                            )?.icon
                        }
                    </span>
                    <span
                        className={cn(
                            'flex-1 text-start ml-2 font-semibold',
                            isCollapsed && 'hidden'
                        )}
                    >
                        {
                            accounts.find(
                                (account) => account.email === selectedAccount
                            )?.label
                        }
                    </span>
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {accounts.map((account) => (
                    <SelectItem key={account.email} value={account.email}>
                        <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                            {account.icon}
                            {account.email}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
