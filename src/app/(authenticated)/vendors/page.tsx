
'use client'

import Image from "next/image"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

const seedVendors = [
  {
    name: "Syngenta Indonesia",
    logo: "https://placehold.co/150x60.png",
    imageHint: "syngenta logo",
    description: "Vendor global terkemuka untuk benih jagung hibrida, padi, dan sayuran dengan teknologi perlindungan tanaman terintegrasi.",
    flagshipProducts: ["Benih Jagung NK", "Pestisida Amistartop"],
  },
  {
    name: "PT East West Seed Indonesia (Cap Panah Merah)",
    logo: "https://placehold.co/150x60.png",
    imageHint: "panah merah logo",
    description: "Spesialis benih sayuran tropis berkualitas tinggi yang sudah teruji oleh petani di seluruh Indonesia.",
    flagshipProducts: ["Cabai Rawit Genie", "Tomat Servo F1"],
  },
  {
    name: "Bisi International Tbk",
    logo: "https://placehold.co/150x60.png",
    imageHint: "bisi logo",
    description: "Perusahaan agribisnis terpadu yang memproduksi benih jagung, padi, serta pakan ternak berkualitas.",
    flagshipProducts: ["Jagung Hibrida BISI-18", "Padi Hibrida Intani"],
  },
]

const fertilizerVendors = [
  {
    name: "Pupuk Indonesia Holding Company",
    logo: "https://placehold.co/150x60.png",
    imageHint: "pupuk indonesia logo",
    description: "BUMN produsen pupuk terbesar di Indonesia, menyediakan berbagai jenis pupuk urea, NPK, organik, dan lainnya.",
    flagshipProducts: ["Pupuk Urea", "NPK Phonska Plus"],
  },
  {
    name: "PT Meroke Tetap Jaya",
    logo: "https://placehold.co/150x60.png",
    imageHint: "meroke logo",
    description: "Fokus pada penyediaan pupuk majemuk NPK dan nutrisi tanaman berbasis kalium untuk meningkatkan kualitas panen.",
    flagshipProducts: ["NPK Mutiara Grower", "Pupuk Kalium SOP"],
  },
  {
    name: "BASF",
    logo: "https://placehold.co/150x60.png",
    imageHint: "basf logo",
    description: "Perusahaan kimia global yang menyediakan solusi perlindungan tanaman inovatif seperti fungisida, insektisida, dan herbisida.",
    flagshipProducts: ["Fungisida Cabrio", "Insektisida Regent"],
  },
]

const equipmentVendors = [
  {
    name: "Yanmar",
    logo: "https://placehold.co/150x60.png",
    imageHint: "yanmar logo",
    description: "Produsen mesin diesel, traktor, dan alat pertanian dari Jepang yang terkenal dengan keandalan dan efisiensinya.",
    flagshipProducts: ["Traktor Roda 4", "Mesin Panen Padi"],
  },
  {
    name: "Kubota",
    logo: "https://placehold.co/150x60.png",
    imageHint: "kubota logo",
    description: "Menyediakan berbagai macam mesin pertanian, mulai dari traktor, mesin tanam padi (transplanter), hingga mesin pemanen.",
    flagshipProducts: ["Traktor L Series", "Combine Harvester"],
  },
  {
    name: "CV Karya Hidup Sentosa (Quick)",
    logo: "https://placehold.co/150x60.png",
    imageHint: "quick traktor logo",
    description: "Produsen traktor tangan (kultivator) terkemuka asli Indonesia yang sudah sangat dikenal oleh para petani.",
    flagshipProducts: ["Traktor Tangan Quick G1000", "Implement Bajak"],
  },
]

export default function VendorsPage() {
  const { toast } = useToast()

  const handleContact = (vendorName: string) => {
    toast({
      title: "Action Triggered",
      description: `Contact functionality for "${vendorName}" is a premium feature.`,
    })
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold font-headline">Mitra Pemasok & Vendor</h1>
        <p className="text-muted-foreground">
          Direktori vendor terverifikasi untuk semua kebutuhan produksi pertanian, perikanan, dan peternakan Anda.
        </p>
      </div>

      <Tabs defaultValue="seeds" className="mt-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="seeds">Benih & Bibit Unggul</TabsTrigger>
          <TabsTrigger value="fertilizers">Pupuk & Pestisida</TabsTrigger>
          <TabsTrigger value="equipment">Alat & Mesin</TabsTrigger>
        </TabsList>

        <TabsContent value="seeds">
          <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            {seedVendors.map((vendor) => (
              <Card key={vendor.name} className="flex flex-col">
                <CardHeader>
                  <div className="relative w-full h-20 mb-4">
                    <Image
                      src={vendor.logo}
                      alt={`${vendor.name} logo`}
                      fill
                      className="object-contain"
                      data-ai-hint={vendor.imageHint}
                    />
                  </div>
                  <CardTitle>{vendor.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{vendor.description}</p>
                   <div className="mt-4">
                        <h4 className="text-sm font-semibold mb-2">Produk Unggulan:</h4>
                        <div className="flex flex-wrap gap-2">
                            {vendor.flagshipProducts.map(p => <Badge key={p} variant="secondary">{p}</Badge>)}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleContact(vendor.name)}>
                    <Phone className="mr-2 h-4 w-4" />
                    Hubungi Vendor
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="fertilizers">
          <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            {fertilizerVendors.map((vendor) => (
              <Card key={vendor.name} className="flex flex-col">
                <CardHeader>
                  <div className="relative w-full h-20 mb-4">
                    <Image
                      src={vendor.logo}
                      alt={`${vendor.name} logo`}
                      fill
                      className="object-contain"
                      data-ai-hint={vendor.imageHint}
                    />
                  </div>
                  <CardTitle>{vendor.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{vendor.description}</p>
                   <div className="mt-4">
                        <h4 className="text-sm font-semibold mb-2">Produk Unggulan:</h4>
                        <div className="flex flex-wrap gap-2">
                            {vendor.flagshipProducts.map(p => <Badge key={p} variant="secondary">{p}</Badge>)}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleContact(vendor.name)}>
                    <Phone className="mr-2 h-4 w-4" />
                    Hubungi Vendor
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="equipment">
          <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            {equipmentVendors.map((vendor) => (
              <Card key={vendor.name} className="flex flex-col">
                <CardHeader>
                  <div className="relative w-full h-20 mb-4">
                    <Image
                      src={vendor.logo}
                      alt={`${vendor.name} logo`}
                      fill
                      className="object-contain"
                      data-ai-hint={vendor.imageHint}
                    />
                  </div>
                  <CardTitle>{vendor.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{vendor.description}</p>
                   <div className="mt-4">
                        <h4 className="text-sm font-semibold mb-2">Produk Unggulan:</h4>
                        <div className="flex flex-wrap gap-2">
                            {vendor.flagshipProducts.map(p => <Badge key={p} variant="secondary">{p}</Badge>)}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleContact(vendor.name)}>
                    <Phone className="mr-2 h-4 w-4" />
                    Hubungi Vendor
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
