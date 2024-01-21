import {
    ArchiveX,
    Check,
    Clock,
    MessageSquareOff,
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
            <div className="sticky top-0 z-50 w-full border-b flex items-center px-4 py-2 justify-between before:absolute before:block before:top-0 before:left-0 before:content-[' '] before:-z-10 before:w-full before:h-full before:bg-background/95 before:supports-[backdrop-filter]:bg-background/60 before:backdrop-blur-lg">
                <div className="text-sm">
                    <p className="flex gap-1.5 items-center">
                        <span className="font-semibold leading-snug">
                            {name}
                        </span>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="bg-primary rounded-full h-2.5 w-2.5 block"></span>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                                Active Now
                            </TooltipContent>
                        </Tooltip>
                    </p>
                    <p className="text-[0.75em] leading-snug">
                        TKT_TA2520LZMA22CD93
                    </p>
                </div>
                <div className="flex item-center justify-around gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="w-8 h-8 my-auto"
                            >
                                <Star className="h-4 w-4" />
                                <span className="sr-only">Star Thread</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">Star Thread</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="w-8 h-8 my-auto"
                            >
                                <ArchiveX className="h-4 w-4" />
                                <span className="sr-only">Move To Junk</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            Move To Junk
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="w-8 h-8 my-auto"
                            >
                                <Clock className="h-4 w-4" />
                                <span className="sr-only">Ticket Activity</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            Ticket Activity
                        </TooltipContent>
                    </Tooltip>

                    <Separator
                        orientation="vertical"
                        className="mr-2 my-auto h-6"
                    />

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="default"
                                size="icon"
                                className="w-8 h-8 my-auto"
                            >
                                <Check className="h-4 w-4" />
                                <span className="sr-only">Resolve Ticket</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            Resolve Ticket
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    )
}

export default TicketHead
