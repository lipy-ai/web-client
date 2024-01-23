import React from 'react'

import { Badge } from '@/components/ui/badge'

const integrations = [
    {
        name: 'Shopify',
        image: '/logo/shopify.svg',
        description:
            'Integrates assistant with Shopify to handle ecommerce related customer queries',
        coming_soon: true,
    },
    {
        name: 'Woocommerce',
        image: '/logo/woocommerce.svg',
        description:
            'Integrates assistant with Woocommerce to handle ecommerce related customer queries',
        coming_soon: true,
    },
]

const Page = () => {
    return (
        <>
            <div className="gap-8 grid grid-cols-[repeat(auto-fill,minmax(275px,1fr))] p-8">
                {integrations.map((item, i) => (
                    <div key={i} className="border rounded-md p-4">
                        <div className="flex justify-between items-start">
                            <img
                                src={item.image}
                                alt={item.name}
                                width={40}
                                height={40}
                                className="mb-2 bg-muted rounded-full border object-contain"
                            />
                            {item.coming_soon && (
                                <Badge variant={'outline'}>Coming Soon</Badge>
                            )}
                        </div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground text-sm">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Page
