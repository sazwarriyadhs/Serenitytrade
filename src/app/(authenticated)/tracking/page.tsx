'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle, Loader2, Package, Ship, Tractor, Warehouse, Anchor, ClipboardCheck } from "lucide-react"
import { cn } from '@/lib/utils'

// Mock data for tracking
const trackingData = {
  "SHP-12345": {
    commodity: "Organic Hass Avocado",
    origin: "Farm Fresh Organics, Mexico",
    destination: "FreshMart EU, Rotterdam",
    status: "In Transit to Buyer",
    history: [
      { step: "Harvest Logged", location: "Oaxaca, Mexico", date: "2023-11-01", status: "completed" },
      { step: "Picked up by Exporter", location: "Oaxaca, Mexico", date: "2023-11-02", status: "completed" },
      { step: "Received at Warehouse", location: "Veracruz, Mexico", date: "2023-11-03", status: "completed" },
      { step: "Export Processing", location: "Port of Veracruz", date: "2023-11-04", status: "completed" },
      { step: "Shipped", location: "Port of Veracruz", date: "2023-11-05", status: "completed" },
      { step: "In Transit to Buyer", location: "Atlantic Ocean", date: "2023-11-06", status: "active" },
      { step: "Customs Clearance", location: "Port of Rotterdam", date: "ETA: 2023-11-20", status: "pending" },
      { step: "Delivered", location: "FreshMart EU Warehouse", date: "ETA: 2023-11-21", status: "pending" },
    ],
  },
  "SHP-67890": {
    commodity: "Arabica Coffee Beans",
    origin: "Highland Coffee Farm, Colombia",
    destination: "The Coffee House, USA",
    status: "Delivered",
    history: [
        { step: "Harvest Logged", location: "Salento, Colombia", date: "2023-10-15", status: "completed" },
        { step: "Picked up by Exporter", location: "Salento, Colombia", date: "2023-10-16", status: "completed" },
        { step: "Received at Warehouse", location: "Cartagena, Colombia", date: "2023-10-17", status: "completed" },
        { step: "Export Processing", location: "Port of Cartagena", date: "2023-10-18", status: "completed" },
        { step: "Shipped", location: "Port of Cartagena", date: "2023-10-19", status: "completed" },
        { step: "In Transit to Buyer", location: "Caribbean Sea", date: "2023-10-20", status: "completed" },
        { step: "Customs Clearance", location: "Port of Miami", date: "2023-10-25", status: "completed" },
        { step: "Delivered", location: "The Coffee House, Miami", date: "2023-10-26", status: "completed" },
    ],
  }
};

const timelineIcons = {
    "Harvest Logged": Tractor,
    "Picked up by Exporter": Tractor,
    "Received at Warehouse": Warehouse,
    "Export Processing": ClipboardCheck,
    "Shipped": Ship,
    "In Transit to Buyer": Ship,
    "Customs Clearance": Anchor,
    "Delivered": Package,
}

type TrackingHistory = {
  step: string;
  location: string;
  date: string;
  status: "completed" | "active" | "pending";
}

type TrackingInfo = {
  commodity: string;
  origin: string;
  destination: string;
  status: string;
  history: TrackingHistory[];
}


export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState('')
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTrackShipment = () => {
    if (!trackingId) {
      setError("Please enter a tracking ID.")
      return
    }
    setError(null)
    setLoading(true)
    setTrackingInfo(null)
    
    // Simulate API call
    setTimeout(() => {
      const data = trackingData[trackingId.toUpperCase() as keyof typeof trackingData]
      if (data) {
        setTrackingInfo(data)
      } else {
        setError("Tracking ID not found. Please check the ID and try again.")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Shipment Tracking</h1>
        <p className="text-muted-foreground">
          Track your shipment from the farm to its final destination.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Enter Tracking ID</CardTitle>
          <CardDescription>Enter your shipment ID (e.g., SHP-12345) to see its status.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex w-full max-w-sm items-center space-x-2">
            <Input 
                type="text" 
                placeholder="SHP-12345" 
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && handleTrackShipment()}
            />
            <Button onClick={handleTrackShipment} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Track
            </Button>
            </div>
            {error && <p className="text-sm font-medium text-destructive mt-4">{error}</p>}
        </CardContent>
      </Card>

      {trackingInfo && (
        <Card>
            <CardHeader>
                <CardTitle>Tracking Details for {trackingId.toUpperCase()}</CardTitle>
                <CardDescription>Commodity: {trackingInfo.commodity}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
                    <div className="p-3 border rounded-md">
                        <p className="text-muted-foreground">Origin</p>
                        <p className="font-semibold">{trackingInfo.origin}</p>
                    </div>
                     <div className="p-3 border rounded-md">
                        <p className="text-muted-foreground">Destination</p>
                        <p className="font-semibold">{trackingInfo.destination}</p>
                    </div>
                     <div className="p-3 border rounded-md bg-secondary/50">
                        <p className="text-muted-foreground">Current Status</p>
                        <p className="font-semibold text-primary">{trackingInfo.status}</p>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute left-5 top-5 h-[calc(100%-2rem)] w-0.5 bg-border -z-10"></div>
                    
                    <ul className="space-y-8">
                        {trackingInfo.history.map((item, index) => {
                            const Icon = timelineIcons[item.step as keyof typeof timelineIcons] || Circle;
                            return (
                                <li key={index} className="flex items-start gap-4">
                                    <div className={cn(
                                        "flex h-10 w-10 items-center justify-center rounded-full border-2",
                                        item.status === 'completed' && "bg-primary border-primary text-primary-foreground",
                                        item.status === 'active' && "bg-primary/20 border-primary text-primary animate-pulse",
                                        item.status === 'pending' && "bg-muted border-muted-foreground/30 text-muted-foreground"
                                    )}>
                                        {item.status === 'completed' ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                                    </div>
                                    <div className="grid gap-1 flex-1 pt-1.5">
                                        <p className="font-semibold">{item.step}</p>
                                        <p className="text-sm text-muted-foreground">{item.location}</p>
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
