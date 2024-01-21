import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from 'recharts'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

const data = [
    {
        revenue: 0,
        subscription: 240,
    },
    {
        revenue: 0,
        subscription: 300,
    },
    {
        revenue: 0,
        subscription: 200,
    },
    {
        revenue: 0,
        subscription: 278,
    },
    {
        revenue: 0,
        subscription: 189,
    },
    {
        revenue: 0,
        subscription: 239,
    },
    {
        revenue: 0,
        subscription: 278,
    },
    {
        revenue: 0,
        subscription: 189,
    },
    {
        revenue: 0,
        subscription: 240,
    },
    {
        revenue: 0,
        subscription: 300,
    },
    {
        revenue: 0,
        subscription: 200,
    },
    {
        revenue: 0,
        subscription: 278,
    },
    {
        revenue: 0,
        subscription: 189,
    },
    {
        revenue: 0,
        subscription: 239,
    },
    {
        revenue: 0,
        subscription: 278,
    },
    {
        revenue: 0,
        subscription: 189,
    },
    {
        revenue: 0,
        subscription: 240,
    },
    {
        revenue: 0,
        subscription: 300,
    },
    {
        revenue: 0,
        subscription: 200,
    },
    {
        revenue: 0,
        subscription: 278,
    },
    {
        revenue: 0,
        subscription: 189,
    },
    {
        revenue: 0,
        subscription: 239,
    },
    {
        revenue: 0,
        subscription: 278,
    },
    {
        revenue: 0,
        subscription: 189,
    },
    {
        revenue: 0,
        subscription: 240,
    },
    {
        revenue: 0,
        subscription: 300,
    },
    {
        revenue: 0,
        subscription: 200,
    },
    {
        revenue: 0,
        subscription: 278,
    },
    {
        revenue: 0,
        subscription: 189,
    },
    {
        revenue: 0,
        subscription: 239,
    },
    {
        revenue: 0,
        subscription: 278,
    },
    {
        revenue: 0,
        subscription: 189,
    },
]

export function CardsStats() {
    return (
        <div className="grid gap-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-normal">
                        Subscriptions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">
                        +180.1% from last month
                    </p>
                    <div className="mt-4 h-[80px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <Bar
                                    dataKey="subscription"
                                    style={
                                        {
                                            fill: 'hsl(var(--primary))',
                                            opacity: 1,
                                        } as React.CSSProperties
                                    }
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
