import { atom, useAtom } from 'jotai'

export type IMessage = {
    sender_id: string
    sender_type: 'customer' | 'bot' | 'agent'
    name: string
    data: {
        text: string
    }
    sent_at: string
}

const msgs = [
    {
        sender_id: '001',
        sender_type: 'customer',
        name: 'Jhone Doe',
        data: {
            text: 'Hello, I have a question about my order.',
        },
        sent_at: '2024-01-11T10:00:00',
    },
    {
        sender_id: '002',
        sender_type: 'bot',
        name: 'Assistant',
        data: {
            text: 'Greetings! How can I assist you today?',
        },
        sent_at: '2024-01-11T10:05:00',
    },
    {
        sender_id: '003',
        sender_type: 'agent',
        name: 'Alex H.',
        data: {
            text: 'Hello, this is John from customer support. How may I help you?',
        },
        sent_at: '2024-01-11T10:10:00',
    },
    {
        sender_id: '004',
        sender_type: 'customer',
        name: 'Jhone Doe',
        data: {
            text: 'I need assistance with a product refund.',
        },
        sent_at: '2024-01-11T10:15:00',
    },
    {
        sender_id: '005',
        sender_type: 'bot',
        name: 'Assistant',
        data: {
            text: 'Sure, I can help you with that. Please provide your order number.',
        },
        sent_at: '2024-01-11T10:20:00',
    },
    {
        sender_id: '006',
        sender_type: 'agent',
        name: 'Alex H.',
        data: {
            text: 'Hi Bob, I see you need assistance with a refund. Can you provide more details about your order?',
        },
        sent_at: '2024-01-11T10:25:00',
    },
    {
        sender_id: '007',
        sender_type: 'customer',
        name: 'Jhone Doe',
        data: {
            text: "My order number is 123456. I haven't received the product, and I want a refund.",
        },
        sent_at: '2024-01-11T10:30:00',
    },
    {
        sender_id: '008',
        sender_type: 'bot',
        name: 'Assistant',
        data: {
            text: 'Thank you for providing the details. Let me check your order status.',
        },
        sent_at: '2024-01-11T10:35:00',
    },
    {
        sender_id: '009',
        sender_type: 'agent',
        name: 'Alex H.',
        data: {
            text: "Charlie, I apologize for the inconvenience. It seems there's a delay in shipping. We'll process your refund right away.",
        },
        sent_at: '2024-01-11T10:40:00',
    },
    {
        sender_id: '010',
        sender_type: 'customer',
        name: 'Jhone Doe',
        data: {
            text: 'Thank you for your help. I appreciate it.',
        },
        sent_at: '2024-01-11T10:45:00',
    },
    {
        sender_id: '011',
        sender_type: 'bot',
        name: 'Assistant',
        data: {
            text: "You're welcome, Eva! If you have any more questions, feel free to ask.",
        },
        sent_at: '2024-01-11T10:50:00',
    },
    {
        sender_id: '012',
        sender_type: 'agent',
        name: 'Alex H.',
        data: {
            text: 'Is there anything else we can assist you with, Eva?',
        },
        sent_at: '2024-01-11T10:55:00',
    },
    {
        sender_id: '013',
        sender_type: 'customer',
        name: 'Jhone Doe',
        data: {
            text: 'I have a technical issue with the app. It keeps crashing.',
        },
        sent_at: '2024-01-11T11:00:00',
    },
    {
        sender_id: '014',
        sender_type: 'bot',
        name: 'Assistant',
        data: {
            text: "I'm sorry to hear that, David. Let me guide you through troubleshooting steps to resolve the issue.",
        },
        sent_at: '2024-01-11T11:05:00',
    },
    {
        sender_id: '015',
        sender_type: 'agent',
        name: 'Alex H.',
        data: {
            text: "David, could you please provide more details about your device and the app version you're using?",
        },
        sent_at: '2024-01-11T11:10:00',
    },
    {
        sender_id: '016',
        sender_type: 'customer',
        name: 'Jhone Doe',
        data: {
            text: "I'm having trouble accessing my account. It says my password is incorrect.",
        },
        sent_at: '2024-01-11T11:15:00',
    },
    {
        sender_id: '017',
        sender_type: 'bot',
        name: 'Assistant',
        data: {
            text: 'I understand the concern, Grace. Let me assist you in resetting your password.',
        },
        sent_at: '2024-01-11T11:20:00',
    },
    {
        sender_id: '018',
        sender_type: 'agent',
        name: 'Alex H.',
        data: {
            text: "Grace, please check your email for a password reset link. If the issue persists, let me know, and we'll further investigate.",
        },
        sent_at: '2024-01-11T11:25:00',
    },
    {
        sender_id: '019',
        sender_type: 'customer',
        name: 'Jhone Doe',
        data: {
            text: "Thank you, Oliver. I'll check my email right away.",
        },
        sent_at: '2024-01-11T11:30:00',
    },
    {
        sender_id: '020',
        sender_type: 'bot',
        name: 'Assistant',
        data: {
            text: "You're welcome, Sophia! If you encounter any more issues, feel free to reach out.",
        },
        sent_at: '2024-01-11T11:35:00',
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
