import { atom, useAtom } from 'jotai'

export type IMessage = {
    text: string
    type: 'bot' | 'agent' | 'human'
}

const msgs = [
    {
        type: 'bot',
        text: `Hi there 👋\n
    I'm the AI Assistant. \n
    How can I help you today?`,
    },
    {
        type: 'human',
        text: `Nothing`,
    },
    {
        type: 'bot',
        text: `Hi there 👋\n
    I'm the AI Assistant. \n
    How can I help you today?`,
    },
    {
        type: 'human',
        text: `Nothing`,
    },
    {
        type: 'bot',
        text: `Hi there 👋\n
    I'm the AI Assistant. \n
    How can I help you today?`,
    },
    {
        type: 'human',
        text: `Nothing`,
    },
] satisfies IMessage[]

const data = {
    id: 'xyz',
    type: 'chat',
    items: [...msgs, ...msgs, ...msgs],
}

const configAtom = atom<typeof data>(data)

export function useTicket() {
    return useAtom(configAtom)
}
