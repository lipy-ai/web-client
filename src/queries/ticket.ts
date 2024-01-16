import {
    OrgCustomersTable,
    OrgMessagesTable,
    OrgTicketsTable,
} from 'lipy-ai/db'
import { useQuery } from 'react-query'

import { apiQuery } from '@/lib/api'

export type ALLTicketResult = Array<
    Pick<
        OrgTicketsTable,
        | 'id'
        | 'channel'
        | 'star'
        | 'status'
        | 'tags'
        | 'created_at'
        | 'updated_at'
    > & {
        customer: Pick<OrgCustomersTable, 'id' | 'name'>
        assignee: Pick<OrgCustomersTable, 'id' | 'name'>
    }
>

export type TicketMessagesResult = {
    id: string
    data: OrgMessagesTable['data']
    sent_at: string
    sender: {
        id: string
        type: OrgMessagesTable['sender_type']
        picture?: string
        name?: string
    }
}

export const ALLTicketsQueryId = 'tickets'
export const TicketsMessageQueryId = (id: string) => 'ticket_msg:' + id

export const useTicketsQuery = (p: {
    orgId: string
    page: number
    filter?: {
        q: string
        type: 'id' | 'platform' | 'status' | 'priorities' | 'assignee'
    }
}) => {
    return useQuery<ALLTicketResult>(
        ALLTicketsQueryId,
        async () =>
            await apiQuery(
                {
                    url: `/org/${p.orgId}/tickets?page=${p.page}&limit=30${
                        p.filter ? `&filter=${JSON.stringify(p.filter)}` : ''
                    }`,
                    method: 'GET',
                },
                { throwError: true }
            )
    )
}

export const useTicketMessagesQuery = (p: {
    ticketId: string | undefined
    orgId: string
    page: number
}) => {
    return useQuery<TicketMessagesResult[]>(
        TicketsMessageQueryId(p.ticketId!),
        async () =>
            await apiQuery(
                {
                    url: `/org/${p.orgId}/ticket/${p.ticketId}/messages?page=${p.page}&limit=30`,
                    method: 'GET',
                },
                { throwError: true }
            ),
        { enabled: !!p.ticketId }
    )
}
