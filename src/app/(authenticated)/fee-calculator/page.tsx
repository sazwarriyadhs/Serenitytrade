'use client'

import { useState, useMemo } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Badge } from '@/components/ui/badge'
import { DollarSign } from 'lucide-react'

const feeAllocationConfig = [
  { name: "Infrastructure & Hosting", percentage: 25, color: "hsl(var(--chart-1))" },
  { name: "Verification & Legal", percentage: 20, color: "hsl(var(--chart-2))" },
  { name: "Support & CS", percentage: 15, color: "hsl(var(--chart-3))" },
  { name: "Marketing & Leads", percentage: 30, color: "hsl(var(--chart-4))" },
  { name: "Net Profit", percentage: 10, color: "hsl(var(--chart-5))" },
]

export default function FeeCalculatorPage() {
  const [transactionValue, setTransactionValue] = useState(8000)
  const [adminFee, setAdminFee] = useState([6])

  const handleTransactionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseFloat(e.target.value)
    setTransactionValue(value)
  }

  const handleFeeChange = (value: number[]) => {
    setAdminFee(value)
  }

  const { adminFeeAmount, exporterPayout, feeAllocationData } = useMemo(() => {
    const feePercentage = adminFee[0]
    const adminFeeAmount = transactionValue * (feePercentage / 100)
    const exporterPayout = transactionValue - adminFeeAmount
    
    const feeAllocationData = feeAllocationConfig.map(item => ({
      name: item.name,
      value: (adminFeeAmount * (item.percentage / 100)),
      percentage: item.percentage,
      color: item.color,
    }))

    return { adminFeeAmount, exporterPayout, feeAllocationData }
  }, [transactionValue, adminFee])
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value)
  }

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Fee & Payout Calculator</h1>
        <p className="text-muted-foreground">
          Simulate transaction fees and understand payout structures.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Calculator</CardTitle>
              <CardDescription>Enter the total transaction value and adjust the admin fee.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="transaction-value" className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Total Transaction Value (USD)
                </Label>
                <Input
                  id="transaction-value"
                  type="number"
                  placeholder="e.g., 8000"
                  value={transactionValue || ''}
                  onChange={handleTransactionChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                   <Label htmlFor="admin-fee">Admin Fee Percentage</Label>
                   <Badge variant="secondary" className="text-base">{adminFee[0]}%</Badge>
                </div>
                <Slider
                  id="admin-fee"
                  min={0}
                  max={20}
                  step={0.5}
                  value={adminFee}
                  onValueChange={handleFeeChange}
                />
                 <p className="text-xs text-muted-foreground">Standard range is 5% - 8%.</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
             <CardHeader>
              <CardTitle>Transaction Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Buyer Pays Total</span>
                <span className="font-semibold">{formatCurrency(transactionValue)}</span>
              </div>
              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-muted-foreground">Marketplace Fee ({adminFee[0]}%)</span>
                <span className="font-semibold text-destructive"> - {formatCurrency(adminFeeAmount)}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg text-primary border-t pt-4">
                <span>Exporter Receives</span>
                <span>{formatCurrency(exporterPayout)}</span>
              </div>
               <div className="text-center pt-4 text-sm text-muted-foreground">
                <p>✅ The Farmer is paid in full by the Exporter based on their separate agreement.</p>
                <p>✅ Buyers are generally not charged a transaction fee on this platform.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Marketplace Fee Allocation</CardTitle>
              <CardDescription>
                An example of how the {formatCurrency(adminFeeAmount)} fee is utilized to sustain and grow the platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={feeAllocationData} layout="vertical" margin={{ left: 20, right: 30 }}>
                  <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} />
                  <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--secondary))' }}
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'hsl(var(--radius))' }}
                    formatter={(value: number, name: string, props: any) => [`${formatCurrency(value)} (${props.payload.percentage}%)`, name]}
                  />
                  <Bar dataKey="value" background={{ fill: 'hsl(var(--muted)/0.3)' }} radius={[0, 4, 4, 0]}>
                     {feeAllocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
               <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 pt-4">
                  {feeAllocationConfig.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                      <span>{item.name}</span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
