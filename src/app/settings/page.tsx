import { Separator } from '@/components/ui/separator'

import { OrgGeneralForm } from './form'

export default () => {
    return (
        <div className="space-y-6 p-8">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    This is how others will see you on the site.
                </p>
            </div>
            <Separator />
            <OrgGeneralForm />
        </div>
    )
}
