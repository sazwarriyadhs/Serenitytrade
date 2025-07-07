
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Ship, Plane, Truck } from "lucide-react"

const seaPartners = [
  { name: "Maersk" },
  { name: "CMA CGM" },
  { name: "MSC (Mediterranean Shipping Company)" },
  { name: "NYK Line" },
  { name: "Samudera Indonesia" },
];

const airPartners = [
  { name: "DHL Global Forwarding" },
  { name: "FedEx Express Freight" },
  { name: "UPS Freight" },
  { name: "Garuda Indonesia Cargo" },
  { name: "Emirates SkyCargo" },
];

const localForwarders = [
  { name: "Kirana Logistik" },
  { name: "Samudera Logistics" },
  { name: "Cipta Krida Bahari" },
  { name: "Logee.id (Indonesia)" },
  { name: "Kargo Tech (marketplace logistik)" },
];

export default function ShippingPartnersPage() {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Mitra Logistik Ekspor</h1>
        <p className="text-muted-foreground">
          Direktori mitra logistik terpercaya kami untuk pengiriman internasional dan domestik.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ship className="h-6 w-6 text-primary" />
            Mitra Kapal Laut (FCL/LCL)
          </CardTitle>
          <CardDescription>
            Penyedia layanan pengiriman laut FCL (Full Container Load) dan LCL (Less than Container Load) dengan jangkauan global.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {seaPartners.map((partner) => (
                    <li key={partner.name}><span className="font-medium text-foreground">{partner.name}</span></li>
                ))}
            </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-6 w-6 text-primary" />
            Mitra Kargo Udara (Cargo Express)
          </CardTitle>
          <CardDescription>
            Solusi pengiriman kargo udara cepat untuk barang yang sensitif terhadap waktu.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {airPartners.map((partner) => (
                    <li key={partner.name}><span className="font-medium text-foreground">{partner.name}</span></li>
                ))}
            </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-6 w-6 text-primary" />
            Freight Forwarder & Agregator Lokal
          </CardTitle>
          <CardDescription>
            Mitra lokal yang membantu mengelola dan mengkonsolidasikan pengiriman ekspor dari berbagai pemasok.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {localForwarders.map((partner) => (
                    <li key={partner.name}><span className="font-medium text-foreground">{partner.name}</span></li>
                ))}
            </ul>
        </CardContent>
      </Card>

    </div>
  )
}
