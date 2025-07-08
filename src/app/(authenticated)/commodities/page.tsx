
'use client'

import React, { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { PlusCircle, MoreHorizontal, File } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

const commodityFormSchema = z.object({
  name: z.string().min(3, "Commodity name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  price: z.coerce.number().positive("Price must be a positive number."),
  stock: z.coerce.number().int().positive("Stock must be a positive number."),
  origin: z.string().min(2, "Origin is required."),
  certifications: z.string().optional(),
})
type CommodityFormValues = z.infer<typeof commodityFormSchema>

const roleConfigs: { [key: string]: any } = {
  farmer: {
    title: "My Commodities",
    description: "Manage your farm's commodities available for export partnership.",
    addButton: "Add Commodity",
    initialCommodities: [
      { name: "Organic Hass Avocado", description: "Creamy, nutrient-rich avocados from certified organic farms.", price: 2.50, stock: 1500, origin: "Mexico", certifications: ["USDA Organic", "Fair Trade"], image: "/images/Hass Avocado.png", imageHint: "avocado fruit", status: "active" },
      { name: "Arabica Coffee Beans", description: "High-altitude grown, medium roast with notes of chocolate and citrus.", price: 15.00, stock: 800, origin: "Colombia", certifications: ["Rainforest Alliance"], image: "/images/Arabica Coffee.png", imageHint: "coffee beans", status: "active" },
      { name: "Sun-dried Tomatoes", description: "Rich, intense flavor. Perfect for pastas, salads, and sauces.", price: 12.20, stock: 650, origin: "Italy", certifications: [], image: "/images/Sun-dried Tomatoes.png", imageHint: "dried tomatoes", status: "active" },
      { name: "King Quinoa", description: "Versatile and protein-packed quinoa, pre-washed and ready to cook.", price: 8.75, stock: 2200, origin: "Peru", certifications: ["Non-GMO Project"], image: "/images/Royal Quinoa.png", imageHint: "quinoa seeds", status: "archived" },
    ],
  },
  peternak: {
    title: "My Livestock Products",
    description: "Manage your livestock products available for partnership.",
    addButton: "Add Livestock Product",
    initialCommodities: [
      { name: "Beef (Carcass)", description: "High-quality beef carcass from grass-fed cattle.", price: 7.00, stock: 500, origin: "Indonesia", certifications: ["Halal Certified"], image: "https://placehold.co/600x400.png", imageHint: "beef carcass", status: "active" },
      { name: "Chicken Eggs", description: "Fresh, grade A chicken eggs.", price: 0.15, stock: 5000, origin: "Indonesia", certifications: ["Healthy Farm"], image: "https://placehold.co/600x400.png", imageHint: "chicken eggs", status: "active" },
    ],
  },
  nelayan: {
    title: "My Seafood Catches",
    description: "Manage your seafood products available for partnership.",
    addButton: "Add Seafood",
    initialCommodities: [
      { name: "Tuna Loin", description: "Sashimi-grade yellowfin tuna loin, frozen at sea.", price: 25.00, stock: 300, origin: "Indonesia", certifications: ["Dolphin Safe"], image: "https://placehold.co/600x400.png", imageHint: "tuna loin", status: "active" },
      { name: "Vannamei Shrimp", description: "Frozen, headless, shell-on vannamei shrimp.", price: 12.00, stock: 1200, origin: "Indonesia", certifications: [], image: "https://placehold.co/600x400.png", imageHint: "shrimp", status: "active" },
    ],
  },
  pengelola_hasil_kebun: {
    title: "My Plantation Products",
    description: "Manage your plantation products available for partnership.",
    addButton: "Add Plantation Product",
    initialCommodities: [
      { name: "Palm Oil (CPO)", description: "Crude Palm Oil from sustainable plantations.", price: 800, stock: 50000, origin: "Indonesia", certifications: ["RSPO Certified"], image: "https://placehold.co/600x400.png", imageHint: "palm oil", status: "active" },
      { name: "Robusta Coffee Beans", description: "High-quality Robusta beans for espresso blends.", price: 4.00, stock: 2000, origin: "Indonesia", certifications: ["Fair Trade"], image: "https://placehold.co/600x400.png", imageHint: "coffee beans", status: "archived" },
    ],
  },
  pengelola_hasil_hutan: {
    title: "My Forest Products",
    description: "Manage your forest products available for partnership.",
    addButton: "Add Forest Product",
    initialCommodities: [
      { name: "Teak Wood Logs", description: "Sustainably harvested teak logs for furniture.", price: 1200, stock: 30, origin: "Indonesia", certifications: ["FSC Certified"], image: "https://placehold.co/600x400.png", imageHint: "teak wood", status: "active" },
      { name: "Rattan", description: "High-quality raw rattan for manufacturing.", price: 3, stock: 15000, origin: "Indonesia", certifications: [], image: "https://placehold.co/600x400.png", imageHint: "rattan material", status: "active" },
    ],
  },
  default: { // For buyer, exporter, admin
    title: "Browse All Commodities",
    description: "Explore all available products from our network of producers.",
    addButton: "Add Commodity", // Or hide it
    initialCommodities: [
      { name: "Organic Hass Avocado", description: "Creamy, nutrient-rich avocados from certified organic farms.", price: 2.50, stock: 1500, origin: "Mexico", certifications: ["USDA Organic", "Fair Trade"], image: "/images/Hass Avocado.png", imageHint: "avocado fruit", status: "active" },
      { name: "Arabica Coffee Beans", description: "High-altitude grown, medium roast with notes of chocolate and citrus.", price: 15.00, stock: 800, origin: "Colombia", certifications: ["Rainforest Alliance"], image: "/images/Arabica Coffee.png", imageHint: "coffee beans", status: "active" },
      { name: "Tuna Loin", description: "Sashimi-grade yellowfin tuna loin, frozen at sea.", price: 25.00, stock: 300, origin: "Indonesia", certifications: ["Dolphin Safe"], image: "https://placehold.co/600x400.png", imageHint: "tuna loin", status: "active" },
      { name: "Palm Oil (CPO)", description: "Crude Palm Oil from sustainable plantations.", price: 800, stock: 50000, origin: "Indonesia", certifications: ["RSPO Certified"], image: "https://placehold.co/600x400.png", imageHint: "palm oil", status: "active" },
    ],
  }
};

const producerRoles = ['farmer', 'peternak', 'nelayan', 'pengelola_hasil_hutan', 'pengelola_hasil_kebun'];

export default function CommoditiesPage() {
  const { toast } = useToast()
  const [userRole, setUserRole] = useState<string | null>(null);
  const [commodities, setCommodities] = useState(roleConfigs.default.initialCommodities)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  const form = useForm<CommodityFormValues>({
    resolver: zodResolver(commodityFormSchema),
  })

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    const config = roleConfigs[role as keyof typeof roleConfigs] || roleConfigs.default;
    setCommodities(config.initialCommodities);
  }, []);

  const config = useMemo(() => {
    return roleConfigs[userRole as keyof typeof roleConfigs] || roleConfigs.default;
  }, [userRole]);

  const isProducer = userRole && producerRoles.includes(userRole);

  function onSubmit(data: CommodityFormValues) {
    const newCommodity = {
      ...data,
      certifications: data.certifications ? data.certifications.split(',').map(s => s.trim()) : [],
      image: "https://placehold.co/600x400.png",
      imageHint: "new commodity",
      status: "active",
    }
    setCommodities(prev => [newCommodity, ...prev])
    toast({
      title: "Product Added",
      description: `${data.name} has been successfully added to your listings.`,
    })
    form.reset()
    setIsDialogOpen(false)
  }

  const handleExport = () => {
    const activeCommodities = commodities.filter(c => c.status === 'active');
    if (activeCommodities.length === 0) {
      toast({ variant: 'destructive', title: 'No Active Products', description: 'There are no active products to export.' });
      return;
    }
    const headers = ["Name", "Description", "Price ($/kg)", "Stock (kg)", "Origin", "Certifications"];
    const csvContent = [
      headers.join(','),
      ...activeCommodities.map(c => [
        `"${c.name.replace(/"/g, '""')}"`, `"${c.description.replace(/"/g, '""')}"`,
        c.price, c.stock, `"${c.origin.replace(/"/g, '""')}"`, `"${c.certifications.join('; ')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "commodities_export.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({ title: "Export Successful", description: "Active products have been exported to CSV." })
    }
  }

  const handleAction = (action: string) => {
    toast({ title: "Action Triggered", description: `${action} functionality is not implemented in this demo.` })
  }

  if (!userRole) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
    <div className="mb-4">
        <h1 className="text-3xl font-bold font-headline">{config.title}</h1>
        <p className="text-muted-foreground">{config.description}</p>
    </div>
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">Archived</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          {isProducer && (
            <>
            <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleExport}>
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">{config.addButton}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{config.addButton}</DialogTitle>
                  <DialogDescription>Fill out the form below to list a new product.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl><Input placeholder="e.g., Organic Hass Avocado" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="description" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl><Textarea placeholder="Describe the product..." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="price" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price ($/Unit)</FormLabel>
                          <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="stock" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock (Units)</FormLabel>
                          <FormControl><Input type="number" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="origin" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Origin</FormLabel>
                        <FormControl><Input placeholder="e.g., Mexico" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="certifications" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Certifications (comma-separated)</FormLabel>
                        <FormControl><Input placeholder="e.g., USDA Organic, Fair Trade" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <DialogFooter><Button type="submit">{config.addButton}</Button></DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            </>
          )}
        </div>
      </div>
      <TabsContent value="all">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {commodities.map((item: any, index: number) => (
             <Card key={`${item.name}-${index}`}>
              <CardHeader className="relative">
                {isProducer && (
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost" className="absolute top-4 right-4 h-6 w-6">
                          <MoreHorizontal className="h-4 w-4" /><span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={() => handleAction("Edit")}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleAction("Delete")}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                )}
                <div className="relative h-40 w-full">
                  <Image src={item.image} alt={item.name} fill className="rounded-md object-cover" data-ai-hint={item.imageHint} />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-headline">{item.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.certifications.map((cert: string) => <Badge key={cert} variant="secondary">{cert}</Badge>)}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-sm">
                <div className="font-semibold">${item.price.toFixed(2)}/kg</div>
                <div className="text-muted-foreground">{item.stock} kg in stock</div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="active">
         <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {commodities.filter((c: any) => c.status === 'active').map((item: any, index: number) => (
             <Card key={`${item.name}-${index}`}>
              <CardHeader className="relative">
                {isProducer && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost" className="absolute top-4 right-4 h-6 w-6">
                        <MoreHorizontal className="h-4 w-4" /><span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onSelect={() => handleAction("Edit")}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleAction("Delete")}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                <div className="relative h-40 w-full">
                  <Image src={item.image} alt={item.name} fill className="rounded-md object-cover" data-ai-hint={item.imageHint} />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-headline">{item.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                 <div className="mt-4 flex flex-wrap gap-2">
                  {item.certifications.map((cert: string) => <Badge key={cert} variant="secondary">{cert}</Badge>)}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-sm">
                <div className="font-semibold">${item.price.toFixed(2)}/kg</div>
                <div className="text-muted-foreground">{item.stock} kg in stock</div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
       <TabsContent value="archived">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {commodities.filter((c: any) => c.status === 'archived').map((item: any, index: number) => (
             <Card key={`${item.name}-${index}`}>
              <CardHeader className="relative">
                {isProducer && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost" className="absolute top-4 right-4 h-6 w-6">
                        <MoreHorizontal className="h-4 w-4" /><span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onSelect={() => handleAction("Unarchive")}>Unarchive</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleAction("Delete")}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                <div className="relative h-40 w-full">
                  <Image src={item.image} alt={item.name} fill className="rounded-md object-cover" data-ai-hint={item.imageHint} />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-headline">{item.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                 <div className="mt-4 flex flex-wrap gap-2">
                  {item.certifications.map((cert: string) => <Badge key={cert} variant="secondary">{cert}</Badge>)}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-sm">
                <div className="font-semibold">${item.price.toFixed(2)}/kg</div>
                <div className="text-muted-foreground">{item.stock} kg in stock</div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
    </>
  )
}

    