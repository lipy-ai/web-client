import { apiCreateOrg } from '@/queries/orgs'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogProps } from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const createOrgSchema = z.object({
    name: z.string().min(2).max(100),
})

export type CreateOrgFormType = z.infer<typeof createOrgSchema>

export const CreateOrgDialog = (props: DialogProps) => {
    const form = useForm<CreateOrgFormType>({
        resolver: zodResolver(createOrgSchema),
        defaultValues: {
            name: '',
        },
    })

    const { isSubmitting } = form.formState

    const onSubmit = async (values: CreateOrgFormType) => {
        await apiCreateOrg(values).then(() => {
            props?.onOpenChange && props.onOpenChange(false)
        })
    }

    return (
        <Dialog {...props}>
            <DialogContent showClose={!isSubmitting} className="sm:max-w-xl">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <DialogHeader>
                            <DialogTitle>Create Organisation</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save
                                when you're done.
                            </DialogDescription>
                        </DialogHeader>

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Business Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Acme Inc."
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            {/* <Button
                                type="submit"
                                variant={'outline'}
                                onClick={() =>
                                    props?.onOpenChange &&
                                    props.onOpenChange(false)
                                }
                            >
                                Cancel
                            </Button> */}

                            <Button type="submit" disabled={isSubmitting}>
                                Save changes
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
