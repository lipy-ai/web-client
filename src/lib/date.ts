import { format } from '../../node_modules/date-fns/format'
import { getUnixTime } from '../../node_modules/date-fns/getUnixTime'

export const formatDateToReadable = (date: any) => {
    if (!date) return
    return format(new Date(date), 'dd MMM yyyy')
}
export const currentUnixTime = () => getUnixTime(new Date()) * 1000
