import React from 'react'
import { formatDistanceToNow } from 'date-fns'

import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

const TicketList = () => {
    const items = [...Array(10)].map((k, i) => {
        return {
            id: i,
            name: 'William Smith',
            email: 'williamsmith@example.com',
            subject: 'Meeting Tomorrow',
            text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
            date: '2023-10-22T09:00:00',
            read: true,
            labels: ['meeting', 'work', 'important'],
        }
    })

    return (
        <div>
            <ScrollArea className="p-4">
                <div className="flex flex-col gap-2 pt-0">
                    {items.map((item) => (
                        <button
                            key={item.id}
                            className={cn(
                                'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent'
                                // mail.selected === item.id && 'bg-muted'
                            )}
                            // onClick={() =>
                            //     setMail({
                            //         ...mail,
                            //         selected: item.id,
                            //     })
                            // }
                        >
                            <div className="flex w-full flex-col gap-1">
                                <div className="flex items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="font-semibold">
                                            {item.name}
                                        </div>
                                        {!item.read && (
                                            <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                                        )}
                                    </div>
                                    <div
                                        className={cn(
                                            'ml-auto text-xs'
                                            // mail.selected === item.id
                                            //     ? 'text-foreground'
                                            //     : 'text-muted-foreground'
                                        )}
                                    >
                                        {formatDistanceToNow(
                                            new Date(item.date),
                                            {
                                                addSuffix: true,
                                            }
                                        )}
                                    </div>
                                </div>
                                <div className="text-xs font-medium">
                                    {item.subject}
                                </div>
                            </div>
                            <div className="line-clamp-2 text-xs text-muted-foreground">
                                {item.text.substring(0, 300)}
                            </div>
                            {item.labels.length ? (
                                <div className="flex items-center gap-2">
                                    {item.labels.map((label) => (
                                        <></>
                                        // <Badge
                                        //     key={label}
                                        //     variant={getBadgeVariantFromLabel(
                                        //         label
                                        //     )}
                                        // >
                                        //     {label}
                                        // </Badge>
                                    ))}
                                </div>
                            ) : null}
                        </button>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

export default TicketList
