"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function DashboardChart() {
  const [chartData, setChartData] = useState<Array<{ month: string; total: number }>>([])

  useEffect(() => {
    // Generate random data on client side to avoid hydration mismatch
    setChartData([
      { month: "January", total: Math.floor(Math.random() * 5000) + 1000 },
      { month: "February", total: Math.floor(Math.random() * 5000) + 1000 },
      { month: "March", total: Math.floor(Math.random() * 5000) + 1000 },
      { month: "April", total: Math.floor(Math.random() * 5000) + 1000 },
      { month: "May", total: Math.floor(Math.random() * 5000) + 1000 },
      { month: "June", total: Math.floor(Math.random() * 5000) + 1000 },
    ])
  }, [])

  return (
    <Card className="xl:col-span-2">
      <CardHeader>
        <CardTitle>Transaction Volume</CardTitle>
        <CardDescription>
          A summary of transactions over the last 6 months.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--secondary))' }}
              contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
            />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
