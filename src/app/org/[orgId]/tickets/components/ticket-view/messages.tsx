import { TicketMessagesResult } from '@/queries/ticket'
import { formatRelative } from 'date-fns'

import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import EmptyPage from '@/components/custom/emptyPage'

const AvatarComponent = ({
    sender_type,
    name,
}: {
    sender_type: TicketMessagesResult['sender']['type']
    name: string
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
                        .join('')
                        .toUpperCase()}
                </AvatarFallback>
            </Avatar>
        </div>
    )
}

const TicketPreviewBody = ({ items }: { items?: TicketMessagesResult[] }) => {
    if (!items) return <div className="text-sm mt-auto"></div>
    if (items.length === 0) {
        return (
            <EmptyPage
                title="No messages yet."
                description="It seems customer hasn't messaged yet. Type below to strike a conversation!"
            />
        )
    }

    return (
        <div className="text-sm mt-auto">
            {items?.map((item, i) => {
                const name = item.sender.name || item.sender.type
                return (
                    <div
                        key={i}
                        className={cn(
                            'flex items-start w-full gap-2 p-4 border-b border-border/60',
                            item.sender.type === 'customer' && 'bg-primary/10'
                        )}
                    >
                        <AvatarComponent
                            sender_type={item.sender.type}
                            name={name}
                        />
                        <div className="flex-1">
                            <div className="flex justify-between leading-none mb-0.5">
                                <div className={'font-semibold'}>
                                    <span className="capitalize">{name}</span>
                                    {item.sender.name &&
                                        item.sender.type === 'customer' && (
                                            <>
                                                <span className="text-xs font-medium capitalize">
                                                    ,&nbsp;
                                                </span>
                                                <span className="text-xs font-medium capitalize text-primary">
                                                    {item.sender.type}
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
                )
            })}
        </div>
    )
}

export default TicketPreviewBody
