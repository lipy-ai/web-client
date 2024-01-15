import { redirect } from 'next/navigation'

import { FullPageLoader } from '@/components/custom/loader'

export default function Home() {
    redirect('/org')
}
