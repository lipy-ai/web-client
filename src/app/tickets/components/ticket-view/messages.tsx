import { useEffect, useRef } from 'react'
import { formatDistanceToNow, formatRelative } from 'date-fns'

import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

import { IMessage, useTicketStore } from '../../store/useTicket'

const AvatarComponent = ({
    sender_type,
    name,
}: {
    sender_type: IMessage['sender_type']
    name: IMessage['name']
}) => {
    return (
        <div>
            <Avatar className="border rounded-md">
                <AvatarImage
                    src={
                        sender_type === 'bot'
                            ? 'https://api.dicebear.com/7.x/fun-emoji/svg?eyes=glasses&mouth=cute&backgroundColor=ffdfbf'
                            : ``
                    }
                    alt={name}
                    className="rounded-md"
                />
                <AvatarFallback
                    className={cn(
                        'rounded-md',
                        sender_type === 'customer' &&
                            'bg-primary text-primary-foreground'
                    )}
                >
                    {name
                        .split(' ')
                        .map((chunk) => chunk[0])
                        .join('')}
                </AvatarFallback>
            </Avatar>
        </div>
    )
}

const TicketPreviewBody = () => {
    const { data } = useTicketStore()

    return (
        <div className="text-sm ">
            {data.items.map((item, i) => (
                <div
                    key={i}
                    className={cn(
                        'flex items-start w-full gap-2 p-4 border-b border-border/40',
                        item.sender_type === 'customer' && 'bg-primary/10'
                    )}
                >
                    <AvatarComponent
                        sender_type={item.sender_type}
                        name={item.name}
                    />
                    <div className="flex-1">
                        <div className="flex justify-between leading-none mb-0.5">
                            <div className={'font-semibold'}>
                                <span>{item.name}</span>
                                {item.sender_type === 'customer' && (
                                    <>
                                        <span className="text-xs font-medium capitalize">
                                            ,&nbsp;
                                        </span>
                                        <span className="text-xs font-medium capitalize text-primary">
                                            {item.sender_type}
                                        </span>
                                    </>
                                )}
                            </div>
                            <p className="text-xs font-light">
                                {formatRelative(item.sent_at, new Date())}
                            </p>
                        </div>
                        <div className="max-w-[90%]">
                            <p>{item.data.text}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TicketPreviewBody
