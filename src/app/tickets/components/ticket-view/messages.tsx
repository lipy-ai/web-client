import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

import { useTicket } from '../../store/useTicket'

const TicketPreviewBody = () => {
    const [data, setData] = useTicket()

    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        el.scrollTop = el.scrollHeight
    }, [data.items.length, ref])

    return (
        <div
            ref={ref}
            className="space-y-4 flex-1 overflow-y-auto py-8 px-2 text-sm"
        >
            {data.items.map((msg, i) => (
                <div
                    key={`msg-${i}`}
                    className={cn(
                        'w-fit min-w-[30%] max-w-[80%] flex gap-2',
                        msg.type === 'human' ? 'ml-auto' : 'mr-auto'
                    )}
                >
                    {msg.type !== 'human' && (
                        <div className="w-8 h-8 bg-muted rounded-full overflow-hidden">
                            <img
                                src={
                                    'https://robohash.org/3884595eca9591d4c4f3c5dd28927dd5?set=set4&bgset=bg1&size=400x400'
                                }
                                alt="Support Agent Avatar"
                                className={'w-full h-full object-cover'}
                            />
                        </div>
                    )}
                    <div
                        className={cn(
                            'rounded-b-lg shadow p-2 flex-1',
                            msg.type === 'human'
                                ? 'bg-muted rounded-l-lg'
                                : 'bg-primary/20 rounded-r-lg'
                        )}
                    >
                        <span>{msg.text}</span>
                    </div>
                </div>
            ))}
            <div key={`msg`} className={cn('w-fit flex gap-2', 'mr-auto')}>
                <div className="w-8 h-8 bg-muted rounded-full overflow-hidden">
                    <img
                        src={
                            'https://robohash.org/3884595eca9591d4c4f3c5dd28927dd5?set=set4&bgset=bg1&size=400x400'
                        }
                        alt="Support Agent Avatar"
                        className={'w-full h-full object-cover'}
                    />
                </div>
                <div
                    className={cn(
                        'rounded-b-lg shadow p-2.5 flex gap-1 h-fit my-auto',
                        'bg-primary/20 rounded-r-lg'
                    )}
                >
                    {[...Array(3)].map((_, i) => (
                        <span
                            key={i}
                            className={cn(
                                'w-1.5 h-1.5 block bg-muted-foreground/50 rounded-full animate-bounce',
                                i === 0
                                    ? 'delay-0'
                                    : i === 1
                                      ? 'delay-300'
                                      : 'delay-700'
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TicketPreviewBody
