
'use client'

import React from "react"
import Image from "next/image"
import { ShoppingCart, Search } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

const seedsData = [
  {
    name: "Benih Jagung Hibrida NK Perkasa",
    supplier: "Syngenta",
    price: "Rp 120.000 / kg",
    image: "https://placehold.co/600x400.png",
    imageHint: "corn seeds",
  },
  {
    name: "Benih Padi Inpari 32",
    supplier: "Balai Benih Induk",
    price: "Rp 85.000 / 5kg",
    image: "https://placehold.co/600x400.png",
    imageHint: "rice seeds",
  },
  {
    name: "Bibit Sawit Tenera",
    supplier: "Pusat Penelitian Kelapa Sawit (PPKS)",
    price: "Rp 55.000 / bibit",
    image: "https://placehold.co/600x400.png",
    imageHint: "oil palm seedling",
  },
   {
    name: "Benih Cabai Rawit Merah",
    supplier: "Cap Panah Merah",
    price: "Rp 45.000 / 10g",
    image: "https://placehold.co/600x400.png",
    imageHint: "chili seeds",
  },
]

const fertilizersData = [
  {
    name: "Pupuk NPK Mutiara 16-16-16",
    supplier: "PT Meroke Tetap Jaya",
    price: "Rp 750.000 / 50kg",
    image: "https://placehold.co/600x400.png",
    imageHint: "fertilizer bags",
  },
  {
    name: "Pupuk Urea Non-Subsidi",
    supplier: "Pupuk Indonesia",
    price: "Rp 450.000 / 50kg",
    image: "https://placehold.co/600x400.png",
    imageHint: "fertilizer sack",
  },
  {
    name: "Pupuk Organik Granul Petroganik",
    supplier: "PT Petrokimia Gresik",
    price: "Rp 150.000 / 40kg",
    image: "https://placehold.co/600x400.png",
    imageHint: "organic fertilizer",
  },
  {
    name: "Pestisida Insektisida Regent 50 SC",
    supplier: "BASF",
    price: "Rp 65.000 / 100ml",
    image: "https://placehold.co/600x400.png",
    imageHint: "pesticide bottle",
  },
]

export default function SuppliesMarketPage() {
    const { toast } = useToast()

    const handleBuy = (itemName: string) => {
        toast({
            title: "Action Triggered",
            description: `Buying functionality for "${itemName}" is not implemented in this demo.`,
        })
    }

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold font-headline">Pasar Kebutuhan Pertanian</h1>
        <p className="text-muted-foreground">
          Jelajahi dan beli bibit, benih, pupuk, dan pestisida berkualitas dari vendor terverifikasi.
        </p>
      </div>

       <Tabs defaultValue="seeds">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                 <TabsList className="grid grid-cols-2 w-full md:w-auto">
                    <TabsTrigger value="seeds">Bibit & Benih</TabsTrigger>
                    <TabsTrigger value="fertilizers">Pupuk & Pestisida</TabsTrigger>
                </TabsList>
                <div className="relative w-full md:max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Cari produk..." className="pl-8" />
                </div>
            </div>
           

            <TabsContent value="seeds">
                <Card>
                    <CardHeader>
                        <CardTitle>Bibit & Benih Unggul</CardTitle>
                        <CardDescription>Temukan bibit dan benih bersertifikat untuk meningkatkan hasil panen Anda.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {seedsData.map((item) => (
                            <Card key={item.name}>
                                <CardHeader className="p-0">
                                    <div className="relative h-40 w-full">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="rounded-t-md object-cover"
                                        data-ai-hint={item.imageHint}
                                    />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <CardTitle className="text-lg font-headline h-12">{item.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground mt-1">Penyedia: <span className="font-medium text-foreground">{item.supplier}</span></p>
                                </CardContent>
                                <CardFooter className="flex justify-between items-center text-sm p-4 pt-0">
                                    <div className="font-semibold text-primary">{item.price}</div>
                                    <Button size="sm" onClick={() => handleBuy(item.name)}>
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Beli
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>

             <TabsContent value="fertilizers">
                <Card>
                    <CardHeader>
                        <CardTitle>Pupuk & Pestisida</CardTitle>
                        <CardDescription>Solusi nutrisi dan perlindungan tanaman untuk menjaga produktivitas.</CardDescription>
                    </CardHeader>
                     <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {fertilizersData.map((item) => (
                            <Card key={item.name}>
                                <CardHeader className="p-0">
                                    <div className="relative h-40 w-full">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="rounded-t-md object-cover"
                                        data-ai-hint={item.imageHint}
                                    />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <CardTitle className="text-lg font-headline h-12">{item.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground mt-1">Penyedia: <span className="font-medium text-foreground">{item.supplier}</span></p>
                                </CardContent>
                                <CardFooter className="flex justify-between items-center text-sm p-4 pt-0">
                                    <div className="font-semibold text-primary">{item.price}</div>
                                    <Button size="sm" onClick={() => handleBuy(item.name)}>
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Beli
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </>
  )
}
