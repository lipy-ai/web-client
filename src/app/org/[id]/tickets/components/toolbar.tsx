import React from 'react'
import { ArrowDown, Circle } from 'lucide-react'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'

import { ListFilter } from '../../../../../components/custom/filter'

export const statusOpts = [
    {
        value: 'backlog',
        label: 'Backlog',
        icon: Circle,
    },
    {
        value: 'todo',
        label: 'Todo',
        icon: Circle,
    },
    {
        value: 'in progress',
        label: 'In Progress',
        icon: Circle,
    },
    {
        value: 'done',
        label: 'Done',
        icon: Circle,
    },
    {
        value: 'canceled',
        label: 'Canceled',
        icon: Circle,
    },
]

export const prioritiesOpts = [
    {
        label: 'Low',
        value: 'low',
        icon: ArrowDown,
    },
    {
        label: 'Medium',
        value: 'medium',
        icon: ArrowDown,
    },
    {
        label: 'High',
        value: 'high',
        icon: ArrowDown,
    },
]

const Toolbar = () => {
    const status = useQueryState(
        'status',
        parseAsArrayOf(parseAsString).withDefault([])
    )
    const priorities = useQueryState(
        'priorities',
        parseAsArrayOf(parseAsString).withDefault([])
    )
    return (
        <div className="flex gap-4">
            <ListFilter title="Status" options={statusOpts} state={status} />
            <ListFilter
                title="Priorities"
                options={prioritiesOpts}
                state={priorities}
            />
        </div>
    )
}

export default Toolbar
