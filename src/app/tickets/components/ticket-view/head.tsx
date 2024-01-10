import Link from 'next/link'
import {
    Archive,
    ArchiveX,
    Check,
    CheckCheck,
    CheckSquare2,
    MoreVertical,
    Star,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

const name = 'Jhon Doe'

const TicketHead = () => {
    return (
        <TooltipProvider delayDuration={0}>
            <div className="sticky top-0 z-50 w-full border-b flex items-center p-2 justify-between before:absolute before:block before:top-0 before:left-0 before:content-[' '] before:-z-10 before:w-full before:h-full before:bg-background/95 before:supports-[backdrop-filter]:bg-background/60 before:backdrop-blur-lg">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage alt={name} />
                        <AvatarFallback>
                            {name
                                .split(' ')
                                .map((chunk) => chunk[0])
                                .join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-semibold leading-snug">
                            {name}
                        </p>
                        <p className="text-[0.7em] leading-none flex items-center gap-1">
                            <span>Active Now</span>
                            <span className="bg-primary rounded-full h-2 w-2 block"></span>
                        </p>
                    </div>
                </div>
                <div className="flex item-center justify-around">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Star className="h-4 w-4" />
                                <span className="sr-only">Star Thread</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Star Thread</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <ArchiveX className="h-4 w-4" />
                                <span className="sr-only">Move To Junk</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Move To Junk</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">More Options</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>More Options</TooltipContent>
                    </Tooltip>
                    <Separator
                        orientation="vertical"
                        className="mx-2 my-auto h-6"
                    />
                    <Button variant="ghost" size="sm" className="gap-2">
                        <Check className="h-4 w-4" />
                        <span>Close Ticket</span>
                    </Button>
                </div>
            </div>
        </TooltipProvider>
    )
}

export default TicketHead
