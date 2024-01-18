import { create } from 'zustand'

export type GlobalStore = {
    currTicket: string | undefined
    setCurrTicket: (currTicket: GlobalStore['currTicket']) => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
    currTicket: undefined,
    setCurrTicket: (currTicket) => set({ currTicket }),
}))
