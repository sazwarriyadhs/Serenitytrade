
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, CheckCircle } from "lucide-react"

const expeditionPartners = [
  { name: "JNE Express", service: "Layanan domestik & internasional, termasuk JNE Trucking (JTR) untuk kargo besar." },
  { name: "TIKI (Titipan Kilat)", service: "Jaringan luas di seluruh Indonesia dengan layanan reguler, express, dan kargo." },
  { name: "SiCepat Ekspres", service: "Dikenal dengan kecepatan pengiriman dan layanan pick-up gratis, termasuk layanan kargo SiCepat Gokil." },
  { name: "J&T Express", service: "Fokus pada pengiriman e-commerce dengan cakupan nasional yang sangat luas." },
  { name: "Anteraja", service: "Menawarkan layanan sameday, nextday, dan reguler dengan sistem pelacakan yang canggih." },
  { name: "Ninja Xpress", service: "Melayani pengiriman domestik dengan opsi Cash on Delivery (COD) dan pelacakan real-time." },
  { name: "Pos Indonesia", service: "BUMN dengan jangkauan hingga ke pelosok desa, menawarkan layanan Pos Jumbo Ekonomi untuk paket besar." },
  { name: "Wahana Express", service: "Dikenal dengan tarif yang kompetitif untuk pengiriman domestik." },
];

export default function ExpeditionPartnersPage() {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Mitra Ekspedisi Darat</h1>
        <p className="text-muted-foreground">
          Direktori mitra ekspedisi terpercaya untuk pengiriman domestik dan penjemputan barang dari lokasi produsen.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-6 w-6 text-primary" />
            Layanan Pengiriman Domestik
          </CardTitle>
          <CardDescription>
            Mitra-mitra ini menyediakan layanan penjemputan (first-mile) dan pengiriman domestik ke gudang eksportir atau pelabuhan.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="space-y-4">
                {expeditionPartners.map((partner) => (
                    <li key={partner.name} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                        <div>
                             <h4 className="font-medium text-foreground">{partner.name}</h4>
                             <p className="text-sm text-muted-foreground">{partner.service}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </CardContent>
      </Card>
    </div>
  )
}
