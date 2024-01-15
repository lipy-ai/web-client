import { create } from 'zustand'

export type TicketStore = {
    currTicket: string | undefined
    setCurrTicket: (currTicket: TicketStore['currTicket']) => void
}

export const useTicketStore = create<TicketStore>((set) => ({
    currTicket: undefined,
    setCurrTicket: (currTicket) => set({ currTicket }),
}))
