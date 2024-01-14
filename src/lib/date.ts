import format from 'date-fns/format'
import getUnixTime from 'date-fns/getUnixTime'

export const formatDateToReadable = (date: any) => {
    if (!date) return
    return format(new Date(date), 'dd MMM yyyy')
}
export const currentUnixTime = () => getUnixTime(new Date()) * 1000
