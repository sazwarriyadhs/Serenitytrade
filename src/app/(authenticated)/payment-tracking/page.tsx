'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Banknote, ShieldCheck, ClipboardCheck, ArrowDownUp, UserCheck, Landmark, Circle } from "lucide-react"
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

// Mock data for payment tracking
const paymentData = {
  "TXN-98765": {
    buyer: "FreshMart EU",
    exporter: "Green Valley Exports",
    farmer: "Farm Fresh Organics",
    totalValue: 12500,
    platformFee: 750, // 6%
    exporterPayout: 11750,
    farmerPayout: 8000, // Example payout
    status: "Payout to Exporter Complete",
    history: [
      { step: "Payment Initiated by Buyer", party: "FreshMart EU", date: "2023-11-05", status: "completed", details: "via Letter of Credit (L/C)" },
      { step: "Funds Received in Escrow", party: "Serenity AgriExport Hub", date: "2023-11-06", status: "completed", details: "Securely held by platform" },
      { step: "Shipment Documents Verified", party: "Platform Admin", date: "2023-11-21", status: "completed", details: "Bill of Lading & COO confirmed" },
      { step: "Payout to Exporter", party: "Green Valley Exports", date: "2023-11-22", status: "completed", details: "$11,750 transferred" },
      { step: "Payment to Farmer", party: "Farm Fresh Organics", date: "ETA: 2023-11-24", status: "pending", details: "Awaiting transfer from exporter" },
    ],
  },
  "TXN-12345": {
    buyer: "The Coffee House",
    exporter: "Highland Coffee Co.",
    farmer: "Highland Coffee Farm",
    totalValue: 30000,
    platformFee: 1800, // 6%
    exporterPayout: 28200,
    farmerPayout: 20000, // Example payout
    status: "Payment Complete",
    history: [
        { step: "Payment Initiated by Buyer", party: "The Coffee House", date: "2023-10-26", status: "completed", details: "via Telegraphic Transfer (T/T)" },
        { step: "Funds Received in Escrow", party: "Serenity AgriExport Hub", date: "2023-10-27", status: "completed", details: "Securely held by platform" },
        { step: "Shipment Documents Verified", party: "Platform Admin", date: "2023-11-10", status: "completed", details: "All shipping docs verified" },
        { step: "Payout to Exporter", party: "Highland Coffee Co.", date: "2023-11-11", status: "completed", details: "$28,200 transferred" },
        { step: "Payment to Farmer", party: "Highland Coffee Farm", date: "2023-11-12", status: "completed", details: "$20,000 paid" },
    ],
  }
};

const timelineIcons = {
    "Payment Initiated by Buyer": Banknote,
    "Funds Received in Escrow": ShieldCheck,
    "Shipment Documents Verified": ClipboardCheck,
    "Payout to Exporter": ArrowDownUp,
    "Payment to Farmer": UserCheck,
}

type PaymentHistory = {
  step: string;
  party: string;
  date: string;
  status: "completed" | "active" | "pending";
  details: string;
}

type PaymentInfo = {
  buyer: string;
  exporter: string;
  farmer: string;
  totalValue: number;
  platformFee: number;
  exporterPayout: number;
  farmerPayout: number;
  status: string;
  history: PaymentHistory[];
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
}

export default function PaymentTrackingPage() {
  const [transactionId, setTransactionId] = useState('')
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTrackPayment = () => {
    if (!transactionId) {
      setError("Please enter a transaction ID.")
      return
    }
    setError(null)
    setLoading(true)
    setPaymentInfo(null)
    
    // Simulate API call
    setTimeout(() => {
      const data = paymentData[transactionId.toUpperCase() as keyof typeof paymentData]
      if (data) {
        setPaymentInfo(data)
      } else {
        setError("Transaction ID not found. Please check the ID and try again.")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Payment Tracking</h1>
        <p className="text-muted-foreground">
          Track the flow of funds from buyer to farmer for each transaction.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Enter Transaction ID</CardTitle>
          <CardDescription>Enter your transaction ID (e.g., TXN-98765) to see its status.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex w-full max-w-sm items-center space-x-2">
            <Input 
                type="text" 
                placeholder="TXN-98765" 
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && handleTrackPayment()}
            />
            <Button onClick={handleTrackPayment} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Track Payment
            </Button>
            </div>
            {error && <p className="text-sm font-medium text-destructive mt-4">{error}</p>}
        </CardContent>
      </Card>

      {paymentInfo && (
        <Card>
            <CardHeader>
                <CardTitle>Payment Details for {transactionId.toUpperCase()}</CardTitle>
                <CardDescription>
                    From <span className="font-semibold text-foreground">{paymentInfo.buyer}</span> to <span className="font-semibold text-foreground">{paymentInfo.exporter}</span> & <span className="font-semibold text-foreground">{paymentInfo.farmer}</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-6 rounded-lg border bg-secondary/30 p-4">
                    <h3 className="mb-4 text-lg font-semibold flex items-center"><Landmark className="mr-2 h-5 w-5 text-primary" />Financial Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <p className="text-muted-foreground">Total Paid by Buyer</p>
                            <p className="font-bold text-lg">{formatCurrency(paymentInfo.totalValue)}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Platform Fee</p>
                            <p className="font-bold text-lg text-destructive">-{formatCurrency(paymentInfo.platformFee)}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Payout to Exporter</p>
                            <p className="font-bold text-lg text-primary">{formatCurrency(paymentInfo.exporterPayout)}</p>
                        </div>
                         <div>
                            <p className="text-muted-foreground">Payment to Farmer</p>
                            <p className="font-bold text-lg text-primary">{formatCurrency(paymentInfo.farmerPayout)}</p>
                        </div>
                    </div>
                     <div className="mt-4 text-center">
                        <Badge>{paymentInfo.status}</Badge>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute left-5 top-5 h-[calc(100%-2rem)] w-0.5 bg-border -z-10"></div>
                    
                    <ul className="space-y-8">
                        {paymentInfo.history.map((item, index) => {
                            const Icon = timelineIcons[item.step as keyof typeof timelineIcons] || Circle;
                            return (
                                <li key={index} className="flex items-start gap-4">
                                    <div className={cn(
                                        "flex h-10 w-10 items-center justify-center rounded-full border-2",
                                        item.status === 'completed' && "bg-primary border-primary text-primary-foreground",
                                        item.status === 'active' && "bg-primary/20 border-primary text-primary animate-pulse",
                                        item.status === 'pending' && "bg-muted border-muted-foreground/30 text-muted-foreground"
                                    )}>
                                       <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="grid gap-1 flex-1 pt-1.5">
                                        <p className="font-semibold">{item.step}</p>
                                        <p className="text-sm text-muted-foreground"><span className="font-medium">{item.party}</span> - {item.details}</p>
                                        <time className="text-xs text-muted-foreground">{item.date}</time>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </CardContent>
        </Card>
      )}

    </div>
  )
}
