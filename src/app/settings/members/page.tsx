import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import SelectRole from './select-role'

export default () => {
    return (
        <div className="space-y-6 p-8">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-medium">Members</h3>
                    <p className="text-sm text-muted-foreground">
                        Invite your team members to collaborate.
                    </p>
                </div>
                <div>
                    <Button>Invite Members</Button>
                </div>
            </div>
            <Separator />
            <div className="max-w-lg flex flex-col gap-6">
                {[...Array(5)].map((item, k) => (
                    <div
                        key={k}
                        className="flex items-center justify-between space-x-4"
                    >
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage src="" />
                                <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium leading-none">
                                    Sofia Davis
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    m@example.com
                                </p>
                            </div>
                        </div>
                        <SelectRole currentRole="Owner" />
                    </div>
                ))}
            </div>
        </div>
    )
}
