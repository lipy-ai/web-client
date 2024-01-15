'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useOrgsQuery } from '@/queries/orgs'
import { Plus } from 'lucide-react'

import { formatDateToReadable } from '@/lib/date'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import EmptyPage from '@/components/custom/emptyPage'
import { FullPageError } from '@/components/custom/error'
import { FullPageLoader } from '@/components/custom/loader'

import { CreateOrgDialog } from './components/createOrg'

const Page = () => {
    const { data, isLoading, isError, error } = useOrgsQuery()
    const [orgDialog, setOrgDialog] = useState(false)

    if (isError)
        return (
            <FullPageError
                message={error?.message || 'Failed to fetch organisations'}
            />
        )

    if (isLoading) return <FullPageLoader />

    const noOrgs = data?.delegated.length === 0 && data?.owned.length === 0

    return (
        <>
            <CreateOrgDialog onOpenChange={setOrgDialog} open={orgDialog} />
            <div className="mx-auto max-w-screen-xl w-full py-12 px-8 space-y-8 flex-1 flex-col flex">
                <div>
                    <h2>Organisations</h2>
                    <p className="text-muted-foreground mb-2">
                        List of all organisations you own or have access to.
                    </p>
                </div>
                <div className="flex gap-4 w-full">
                    <Input placeholder="Search organisations..." />
                    <div>
                        <Button onClick={() => setOrgDialog(true)}>
                            <span>Add New...</span>

                            <Plus className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
                {noOrgs ? (
                    <EmptyPage
                        title="No Organisations Yet!"
                        description="It appears you haven't set up any organisations. Let's get started by creating your first organisation."
                    >
                        <div className="py-4">
                            <Button onClick={() => setOrgDialog(true)}>
                                <Plus className="w-5 h-5" />

                                <span>Create New Organisation</span>
                            </Button>
                        </div>
                    </EmptyPage>
                ) : (
                    <>
                        {data?.owned.map((item, i) => (
                            <div className="gap-8 grid grid-cols-[repeat(auto-fill,minmax(275px,1fr))]">
                                <Link
                                    key={i}
                                    href={`org/${item.id}`}
                                    className="text-md items-center text-sm p-4 border rounded-md hover:border-primary transition-all ease-in-out duration-300 cursor-pointer"
                                >
                                    <p className="text-base">{item.name}</p>
                                    <p className="text-muted-foreground text-xs">
                                        Created on{' '}
                                        {formatDateToReadable(item?.created_at)}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </>
    )
}

export default Page
