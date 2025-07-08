
'use client'

import React, { useRef } from "react"
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
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


const allSuppliesData = [
  {
    name: "Benih Jagung Hibrida NK Perkasa",
    supplier: "Syngenta",
    price: "Rp 120.000 / kg",
    image: "https://placehold.co/600x400.png",
    imageHint: "corn seeds",
  },
  {
    name: "Pupuk NPK Mutiara 16-16-16",
    supplier: "PT Meroke Tetap Jaya",
    price: "Rp 750.000 / 50kg",
    image: "https://placehold.co/600x400.png",
    imageHint: "fertilizer bags",
  },
  {
    name: "Benih Padi Inpari 32",
    supplier: "Balai Benih Induk",
    price: "Rp 85.000 / 5kg",
    image: "https://placehold.co/600x400.png",
    imageHint: "rice seeds",
  },
  {
    name: "Pupuk Urea Non-Subsidi",
    supplier: "Pupuk Indonesia",
    price: "Rp 450.000 / 50kg",
    image: "https://placehold.co/600x400.png",
    imageHint: "fertilizer sack",
  },
  {
    name: "Bibit Sawit Tenera",
    supplier: "Pusat Penelitian Kelapa Sawit (PPKS)",
    price: "Rp 55.000 / bibit",
    image: "https://placehold.co/600x400.png",
    imageHint: "oil palm seedling",
  },
  {
    name: "Pupuk Organik Granul Petroganik",
    supplier: "PT Petrokimia Gresik",
    price: "Rp 150.000 / 40kg",
    image: "https://placehold.co/600x400.png",
    imageHint: "organic fertilizer",
  },
  {
    name: "Benih Cabai Rawit Merah",
    supplier: "Cap Panah Merah",
    price: "Rp 45.000 / 10g",
    image: "https://placehold.co/600x400.png",
    imageHint: "chili seeds",
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
    const plugin = useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );

    const handleBuy = (itemName: string) => {
        toast({
            title: "Action Triggered",
            description: `Buying functionality for "${itemName}" is not implemented in this demo.`,
        })
    }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold font-headline">Pasar Kebutuhan Pertanian</h1>
        <p className="text-muted-foreground">
          Jelajahi dan beli bibit, benih, pupuk, dan pestisida berkualitas dari vendor terverifikasi.
        </p>
      </div>

       <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Cari produk..." className="pl-8" />
       </div>
       
       <Card>
        <CardHeader>
            <CardTitle>Produk Unggulan Minggu Ini</CardTitle>
            <CardDescription>Jelajahi produk terlaris dan penawaran terbaik dalam slider di bawah ini.</CardDescription>
        </CardHeader>
        <CardContent>
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                opts={{
                    align: "start",
                    loop: true,
                }}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent className="-ml-4">
                    {allSuppliesData.map((item, index) => (
                        <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                             <div className="p-1">
                                <Card className="h-full flex flex-col">
                                    <CardHeader className="p-0">
                                        <div className="relative h-48 w-full">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="rounded-t-md object-cover"
                                            data-ai-hint={item.imageHint}
                                        />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4 flex-grow">
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
                             </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-[-20px] top-1/2 -translate-y-1/2 hidden sm:flex" />
                <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2 hidden sm:flex" />
            </Carousel>
        </CardContent>
       </Card>

    </div>
  )
}
