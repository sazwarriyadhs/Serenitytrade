
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, MapPin, Ship, Plane, Warehouse, Truck as TruckIcon } from "lucide-react"
import Image from "next/image"

const internationalPartners = [
  {
    name: "Global Freight Forwarders",
    description: "End-to-end sea and air freight solutions for global trade.",
    services: ["Sea Freight", "Air Freight", "Customs Brokerage"],
  },
  {
    name: "Oceanic Express Lines",
    description: "Specializing in refrigerated container shipping for perishable goods.",
    services: ["Reefer Containers", "Sea Freight", "Bulk Cargo"],
  },
  {
    name: "Skyway Cargo",
    description: "Fast and reliable air cargo services connecting major global hubs.",
    services: ["Air Freight", "Express Cargo", "Warehousing"],
  },
]

const localPartners = [
  {
    name: "Nusantara Logistik",
    description: "Extensive domestic network for inter-island and land transportation.",
    services: ["Land Freight", "Domestic Sea Freight", "Warehousing"],
  },
  {
    name: "Cepat Kirim Indonesia",
    description: "Specialized in last-mile delivery and cold chain logistics for farmers.",
    services: ["Cold Chain Trucking", "First-mile Pickup"],
  },
]

const serviceIcons: { [key: string]: React.ElementType } = {
    "Sea Freight": Ship,
    "Air Freight": Plane,
    "Land Freight": TruckIcon,
    "Warehousing": Warehouse,
    "Customs Brokerage": Globe,
    "Domestic Sea Freight": Ship,
    "Reefer Containers": Ship,
    "Bulk Cargo": Ship,
    "Express Cargo": Plane,
    "Cold Chain Trucking": TruckIcon,
    "First-mile Pickup": TruckIcon
}

export default function ShippingPartnersPage() {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Shipping & Logistics Partners</h1>
        <p className="text-muted-foreground">
          A directory of our trusted international and local logistics partners.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            International Shipping Partners
          </CardTitle>
          <CardDescription>
            Facilitating global exports with reliable air and sea freight services.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {internationalPartners.map((partner) => (
            <div key={partner.name} className="flex flex-col md:flex-row items-start gap-6 p-4 border rounded-lg">
              <div className="flex-shrink-0">
                <Image src="https://placehold.co/150x50.png" alt={`${partner.name} logo`} width={150} height={50} className="object-contain border rounded-md p-2 bg-background" data-ai-hint="company logo" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{partner.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{partner.description}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                  {partner.services.map(service => {
                     const Icon = serviceIcons[service] || TruckIcon
                     return (
                         <div key={service} className="flex items-center text-xs text-muted-foreground gap-1.5">
                            <Icon className="h-4 w-4" />
                            <span>{service}</span>
                         </div>
                     )
                  })}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            Local Logistics Partners (Indonesia)
          </CardTitle>
          <CardDescription>
            Supporting the domestic supply chain from farm to port.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {localPartners.map((partner) => (
             <div key={partner.name} className="flex flex-col md:flex-row items-start gap-6 p-4 border rounded-lg">
              <div className="flex-shrink-0">
                <Image src="https://placehold.co/150x50.png" alt={`${partner.name} logo`} width={150} height={50} className="object-contain border rounded-md p-2 bg-background" data-ai-hint="company logo" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{partner.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{partner.description}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                   {partner.services.map(service => {
                     const Icon = serviceIcons[service] || TruckIcon
                     return (
                         <div key={service} className="flex items-center text-xs text-muted-foreground gap-1.5">
                            <Icon className="h-4 w-4" />
                            <span>{service}</span>
                         </div>
                     )
                  })}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
