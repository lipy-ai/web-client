'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth'
import {
    getAuthCache,
    signInWithFacebook,
    signInWithGoogle,
} from '@/firebase/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FullPageLoader } from '@/components/custom/loader'
import { Icons } from '@/components/icons'

const FormSchema = z.object({
    email: z.string().email('Please enter valid email.').nonempty(),
})

export default function AuthenticationPage() {
    const { user, loading } = useAuth()
    const [url, setUrl] = useState('/')
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<
        'google' | 'email' | 'facebook' | undefined
    >(undefined)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const handleGoogle = async (event: React.MouseEvent) => {
        const cache = getAuthCache()
        cache?.redirect_url && setUrl(cache?.redirect_url)
        event.preventDefault()
        setIsLoading('google')
        await signInWithGoogle()
        setIsLoading(undefined)
    }

    const handleFacebook = async (event: React.MouseEvent) => {
        const cache = getAuthCache()
        cache?.redirect_url && setUrl(cache?.redirect_url)
        event.preventDefault()
        setIsLoading('facebook')
        await signInWithFacebook()
        setIsLoading(undefined)
    }

    const handleEmail = async (data: z.infer<typeof FormSchema>) => {
        setIsLoading('email')
        router.push(`/auth/email?value=${data.email.toLowerCase()}`)
    }

    useEffect(() => {
        if (user && !loading) router.replace(url)
    }, [user, loading])

    if (user || loading || isLoading) return <FullPageLoader />

    return (
        <div className="container flex h-screen items-center justify-center">
            <div className="flex h-[475px] w-[475px] flex-col items-center justify-center rounded-xl p-2 ">
                <Icons.logo
                    width={'150px'}
                    height={'50px'}
                    style={{ minHeight: '50px' }}
                />
                <p className="mb-12">Continue to LIPY.ai</p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleEmail)}
                        className="mb-4 w-full space-y-6"
                    >
                        {/* <div className="mb-8 w-full">
                            <Input
                                placeholder="you@example.com"
                                className="h-12 text-base"
                            />
                        </div> */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            className="h-12 text-base"
                                            placeholder="you@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            variant={'secondary'}
                            type="submit"
                            className="mb-2 w-full py-6 text-lg"
                            disabled={!!isLoading}
                        >
                            <span className="mx-auto flex items-center ">
                                Continue with Email
                            </span>
                        </Button>
                    </form>
                </Form>
                <div className="relative mb-2 w-full py-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <Button
                    variant={null}
                    type="button"
                    className="mb-6 w-full bg-neutral-800 py-6 text-lg text-white hover:opacity-90  dark:bg-white dark:text-background"
                    disabled={!!isLoading}
                    onClick={handleGoogle}
                >
                    <span className="mx-auto flex w-[250px] items-center">
                        <Icons.google className="mr-4 h-5 w-5" />
                        Continue with Google
                    </span>
                </Button>

                <Button
                    variant={null}
                    type="button"
                    className="mb-10 w-full text-lg bg-[#1877F2] py-6 text-white hover:brightness-75"
                    disabled={!!isLoading}
                    onClick={handleFacebook}
                >
                    <span className="mx-auto flex w-[250px] items-center">
                        <Icons.facebook
                            type="white"
                            className="mr-4 h-5 w-5 mb-[2px]"
                        />
                        Continue with Facebook
                    </span>
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                    By continuing, you agree to our&nbsp;
                    <Link
                        href="/terms-and-conditions"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Terms of Service
                    </Link>
                    <br />
                    &nbsp;and&nbsp;
                    <Link
                        href="/privacy-policy"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}
