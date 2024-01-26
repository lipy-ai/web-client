import React from 'react'
import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

const SelectRole = ({ currentRole }: { currentRole: string }) => {
    const roles = [
        {
            name: 'Agent',
            description: 'Can update assigned tickets & respond to customers.',
        },
        {
            name: 'Admin',
            description:
                'Can perform all operations except billing or deleting organization',
        },
        {
            name: 'Owners',
            description: 'Can perform all operations.',
        },
    ]

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="ml-auto">
                    {currentRole}
                    <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="end">
                <Command>
                    <CommandInput placeholder="Select new role..." />
                    <CommandList>
                        <CommandEmpty>No roles found.</CommandEmpty>
                        <CommandGroup>
                            {roles.map((item, k) => (
                                <CommandItem
                                    key={k}
                                    className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
                                >
                                    <p>{item.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {item.description}
                                    </p>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default SelectRole
