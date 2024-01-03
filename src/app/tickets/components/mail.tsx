import format from 'date-fns/format'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

interface MailDisplayProps {
    mail: any | null
}

export function MailDisplay({ mail }: MailDisplayProps) {
    const today = new Date()

    return (
        <div className="flex flex-1 flex-col">
            <div className="flex items-center p-2">
                <div className="flex items-center gap-2 h-12">
                    <p>Head</p>
                </div>
                <div className="ml-auto flex items-center gap-2"></div>
            </div>
            <Separator />
            {mail ? (
                <div className="flex flex-1 flex-col">
                    <div className="flex items-start p-4">
                        <div className="flex items-start gap-4 text-sm">
                            <Avatar>
                                <AvatarImage alt={mail.name} />
                                <AvatarFallback>
                                    {mail.name
                                        .split(' ')
                                        .map((chunk) => chunk[0])
                                        .join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <div className="font-semibold">{mail.name}</div>
                                <div className="line-clamp-1 text-xs">
                                    {mail.subject}
                                </div>
                                <div className="line-clamp-1 text-xs">
                                    <span className="font-medium">
                                        Reply-To:
                                    </span>{' '}
                                    {mail.email}
                                </div>
                            </div>
                        </div>
                        {mail.date && (
                            <div className="ml-auto text-xs text-muted-foreground">
                                {format(new Date(mail.date), 'PPpp')}
                            </div>
                        )}
                    </div>
                    <Separator />
                    <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
                        {mail.text}
                    </div>
                    <Separator className="mt-auto" />
                    <div className="p-4">
                        <form>
                            <div className="grid gap-4">
                                <Textarea
                                    className="p-4"
                                    placeholder={`Reply ${mail.name}...`}
                                />
                                <div className="flex items-center">
                                    <Button size="sm" className="ml-auto">
                                        Send
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="p-8 text-center text-muted-foreground">
                    No message selected
                </div>
            )}
        </div>
    )
}
