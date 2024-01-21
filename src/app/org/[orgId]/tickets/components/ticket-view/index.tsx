import { useEffect, useRef } from 'react'
import { useTicketMessagesQuery } from '@/queries/ticket'

import EmptyPage from '@/components/custom/emptyPage'
import { FullPageError } from '@/components/custom/error'
import { FullPageLoader } from '@/components/custom/loader'

import TicketPreviewFooter from './footer'
import TicketHead from './head'
import TicketPreviewBody from './messages'

const TicketPreview = ({
    orgId,
    ticketId,
}: {
    orgId: string
    ticketId: string | undefined
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const { data, isLoading, isError } = useTicketMessagesQuery({
        page: 1,
        orgId,
        ticketId,
    })

    useEffect(() => {
        const el = ref.current
        if (!el) return

        el.scrollTop = el.scrollHeight
    }, [ref.current])

    if (isError) return <FullPageError message="Failed to load conversation!" />

    if (isLoading) return <FullPageLoader />

    return (
        <div ref={ref} className="overflow-y-auto h-screen flex flex-col">
            <TicketHead />
            <TicketPreviewBody items={data} />
            <TicketPreviewFooter />
        </div>
    )
}

export default TicketPreview
