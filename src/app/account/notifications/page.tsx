import { Separator } from '@/components/ui/separator'

import { NotificationsForm } from './form'

const Page = () => {
    return (
        <div className="p-8 space-y-6">
            <div>
                <h3 className="text-lg font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                    Configure how you receive notifications.
                </p>
            </div>
            <Separator />
            <NotificationsForm />
        </div>
    )
}
export default Page
