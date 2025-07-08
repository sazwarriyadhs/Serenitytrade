
'use client'

import Image from "next/image"
import { PlusCircle, MoreHorizontal, Briefcase, FileText, Search, TrendingUp, TrendingDown, Minus, ShieldCheck } from "lucide-react"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import React, { useState, useMemo } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const availableCommoditiesData = [
  {
    name: "Organic Hass Avocado",
    exporter: "Green Valley Exports",
    origin: "Mexico",
    price: 2.50,
    minOrder: 500,
    image: "/images/Hass Avocado.png",
    imageHint: "avocado fruit",
  },
  {
    name: "Arabica Coffee Beans",
    exporter: "Highland Coffee Co.",
    origin: "Colombia",
    price: 15.00,
    minOrder: 200,
    image: "/images/Arabica Coffee.png",
    imageHint: "coffee beans",
  },
  {
    name: "Sun-dried Tomatoes",
    exporter: "Italian Pantry",
    origin: "Italy",
    price: 12.20,
    minOrder: 100,
    image: "/images/Sun-dried Tomatoes.png",
    imageHint: "dried tomatoes",
  },
];

const initialMyRequests = [
    {
        id: "REQ-001",
        commodity: "Peruvian Quinoa",
        quantity: "10,000 kg",
        status: "Offer Received",
        date: "2023-10-23",
        offers: 2,
    },
    {
        id: "REQ-002",
        commodity: "Cashew Nuts WW320",
        quantity: "15,000 kg",
        status: "Finding Exporters",
        date: "2023-10-28",
        offers: 0,
    }
]

const negotiations = [
    {
        id: "NEG-001",
        commodity: "Organic Hass Avocado",
        exporter: "Green Valley Exports",
        status: "Counter-offer Sent",
        lastUpdate: "2023-10-29",
    }
]

const requestFormSchema = z.object({
    commodity: z.string().min(1, "Commodity name is required."),
    quantity: z.string().min(1, "Quantity is required."),
    specifications: z.string().optional(),
})
type RequestFormValues = z.infer<typeof requestFormSchema>

const recommendedPrices = [
  { name: "Organic Hass Avocado", targetPrice: 2.45, trend: 'stable' },
  { name: "Arabica Coffee Beans", targetPrice: 14.85, trend: 'down' },
  { name: "Sun-dried Tomatoes", targetPrice: 12.10, trend: 'up' },
  { name: "Peruvian Quinoa", targetPrice: 8.50, trend: 'down' },
];

const trendIcons = {
  up: <TrendingUp className="h-5 w-5 text-destructive" />,
  down: <TrendingDown className="h-5 w-5 text-green-600" />,
  stable: <Minus className="h-5 w-5 text-muted-foreground" />,
}

export default function BuyerDashboardPage() {
    const { toast } = useToast()
    const [myRequests, setMyRequests] = useState(initialMyRequests)
    const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const form = useForm<RequestFormValues>({
        resolver: zodResolver(requestFormSchema),
        defaultValues: {
            commodity: "",
            quantity: "",
            specifications: "",
        },
    })

    function onSubmit(data: RequestFormValues) {
        const newRequest = {
            id: `REQ-${String(myRequests.length + 3).padStart(3, '0')}`,
            commodity: data.commodity,
            quantity: data.quantity,
            status: "Finding Exporters",
            date: new Date().toISOString().split('T')[0],
            offers: 0,
        }
        setMyRequests(prev => [newRequest, ...prev])
        toast({
            title: "Request Created",
            description: `Your request for ${data.commodity} has been submitted.`,
        })
        form.reset()
        setIsRequestDialogOpen(false)
    }

    const availableCommodities = useMemo(() => {
        if (!searchTerm) return availableCommoditiesData
        return availableCommoditiesData.filter(c => 
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            c.origin.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm])
    
    const handleMakeOffer = (commodityName: string) => {
        form.setValue("commodity", commodityName)
        setIsRequestDialogOpen(true)
    }
    
    const handleRequestAction = (action: string) => {
        toast({
            title: "Action Triggered",
            description: `${action} functionality is not implemented in this demo.`,
        })
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Buyer Dashboard</h1>
                <p className="text-muted-foreground">Manage your commodity requests, offers, and negotiations.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">My Open Requests</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{myRequests.filter(r => r.status === 'Finding Exporters').length}</div>
                        <p className="text-xs text-muted-foreground">
                            Awaiting exporter offers
                        </p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Funds in Escrow</CardTitle>
                        <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$42,500.00</div>
                        <p className="text-xs text-muted-foreground">
                            Across 3 active negotiations
                        </p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ongoing Negotiations</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{negotiations.length}</div>
                        <p className="text-xs text-muted-foreground">
                            With {negotiations.length} exporter(s)
                        </p>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Real-time Price Recommendations (Buy)</CardTitle>
                    <CardDescription>AI-powered target buy prices based on current market data. Prices are more favorable when the trend is down.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Commodity</TableHead>
                                <TableHead className="text-right">Target Price/kg</TableHead>
                                <TableHead className="text-right">Trend</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recommendedPrices.map((item) => (
                                <TableRow key={item.name}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell className="text-right">${item.targetPrice.toFixed(2)}</TableCell>
                                    <TableCell className="flex justify-end">{trendIcons[item.trend as keyof typeof trendIcons]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Tabs defaultValue="browse">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="browse">Browse Commodities</TabsTrigger>
                    <TabsTrigger value="requests">My Requests</TabsTrigger>
                    <TabsTrigger value="negotiations">Negotiations</TabsTrigger>
                </TabsList>

                <TabsContent value="browse">
                    <Card>
                        <CardHeader>
                            <CardTitle>Available Commodities</CardTitle>
                            <CardDescription>Browse commodities available for export offers.</CardDescription>
                            <div className="pt-2">
                                 <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input 
                                        placeholder="Search by commodity or origin..." 
                                        className="pl-8"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                             {availableCommodities.map((item) => (
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
                                        <CardTitle className="text-lg font-headline">{item.name}</CardTitle>
                                        <p className="text-sm text-muted-foreground mt-1">From: <span className="font-medium text-foreground">{item.exporter}</span> ({item.origin})</p>
                                    </CardContent>
                                    <CardFooter className="flex justify-between text-sm p-4 pt-0">
                                        <div>
                                            <div className="font-semibold">${item.price.toFixed(2)}/kg</div>
                                            <div className="text-muted-foreground">Min. {item.minOrder} kg</div>
                                        </div>
                                        <Button size="sm" onClick={() => handleMakeOffer(item.name)}>Make Offer</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="requests">
                    <Card>
                        <CardHeader className="flex flex-row items-center">
                           <div className="grid gap-2">
                               <CardTitle>My Commodity Requests</CardTitle>
                               <CardDescription>Track the status of your procurement requests.</CardDescription>
                           </div>
                           <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button size="sm" className="ml-auto gap-1">
                                       <PlusCircle className="h-3.5 w-3.5" />
                                       <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                           Create Request
                                       </span>
                                   </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Create Commodity Request</DialogTitle>
                                        <DialogDescription>
                                            Fill in the details below to create a new request for quotation.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                            <FormField
                                                control={form.control}
                                                name="commodity"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Commodity Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="e.g., Peruvian Quinoa" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="quantity"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Quantity</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="e.g., 10,000 kg" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="specifications"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Specifications (Optional)</FormLabel>
                                                        <FormControl>
                                                            <Textarea placeholder="Describe quality requirements, certifications, etc." {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <DialogFooter>
                                                <Button type="submit">Submit Request</Button>
                                            </DialogFooter>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                       </CardHeader>
                       <CardContent>
                           <Table>
                               <TableHeader>
                                   <TableRow>
                                       <TableHead>Request ID</TableHead>
                                       <TableHead>Commodity</TableHead>
                                       <TableHead>Quantity</TableHead>
                                       <TableHead>Date</TableHead>
                                       <TableHead>Status</TableHead>
                                       <TableHead>Offers</TableHead>
                                       <TableHead><span className="sr-only">Actions</span></TableHead>
                                   </TableRow>
                               </TableHeader>
                               <TableBody>
                                   {myRequests.map((req) => (
                                       <TableRow key={req.id}>
                                           <TableCell className="font-medium">{req.id}</TableCell>
                                           <TableCell>{req.commodity}</TableCell>
                                           <TableCell>{req.quantity}</TableCell>
                                           <TableCell>{req.date}</TableCell>
                                           <TableCell><Badge variant={req.status === 'Offer Received' ? 'default' : 'secondary'} className={`${req.status === "Offer Received" && 'bg-green-600/20 text-green-700 border-green-600/20 hover:bg-green-600/30'}`}>{req.status}</Badge></TableCell>
                                           <TableCell>{req.offers > 0 ? `${req.offers} Received` : 'None'}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                    aria-haspopup="true"
                                                    size="icon"
                                                    variant="ghost"
                                                    >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onSelect={() => handleRequestAction("View Offers")}>View Offers</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => handleRequestAction("Edit Request")}>Edit Request</DropdownMenuItem>
                                                     <DropdownMenuItem onSelect={() => handleRequestAction("Cancel Request")}>Cancel Request</DropdownMenuItem>
                                                </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                       </TableRow>
                                   ))}
                               </TableBody>
                           </Table>
                       </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="negotiations">
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Negotiations</CardTitle>
                            <CardDescription>Manage your ongoing price and term negotiations.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <Table>
                               <TableHeader>
                                   <TableRow>
                                       <TableHead>ID</TableHead>
                                       <TableHead>Commodity</TableHead>
                                       <TableHead>Exporter</TableHead>
                                       <TableHead>Status</TableHead>
                                       <TableHead>Last Update</TableHead>
                                       <TableHead><span className="sr-only">Actions</span></TableHead>
                                   </TableRow>
                               </TableHeader>
                               <TableBody>
                                   {negotiations.map((neg) => (
                                       <TableRow key={neg.id}>
                                           <TableCell className="font-medium">{neg.id}</TableCell>
                                           <TableCell>{neg.commodity}</TableCell>
                                           <TableCell>{neg.exporter}</TableCell>
                                           <TableCell><Badge variant="secondary">{neg.status}</Badge></TableCell>
                                           <TableCell>{neg.lastUpdate}</TableCell>
                                           <TableCell>
                                                <Button variant="outline" size="sm" onClick={() => handleRequestAction("View Chat")}>View Chat</Button>
                                           </TableCell>
                                       </TableRow>
                                   ))}
                               </TableBody>
                           </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
