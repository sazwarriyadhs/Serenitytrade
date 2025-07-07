
'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon, PlusCircle, Upload, FileText, CheckCircle2, Wallet, Handshake, Landmark } from "lucide-react"
import { format } from "date-fns"
import React, { useState } from "react"
import { useToast } from "@/hooks/use-toast"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const harvestFormSchema = z.object({
  commodity: z.string({
    required_error: "Please select a commodity.",
  }),
  harvestDate: z.date({
    required_error: "A harvest date is required.",
  }),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1."),
  qualityGrade: z.string().min(1, "Quality grade is required."),
  notes: z.string().optional(),
})
type HarvestFormValues = z.infer<typeof harvestFormSchema>

const certFormSchema = z.object({
  certName: z.string().min(1, "Certification name is required."),
  certFile: z.instanceof(FileList).refine(files => files?.length === 1, "File is required."),
  product: z.string({ required_error: "Please select a product." }),
});
type CertFormValues = z.infer<typeof certFormSchema>

// Mock data
const initialHarvests = [
  { id: "HARV-001", commodity: "Hass Avocado", quantity: "1500 kg", date: "2023-10-28", grade: "A" },
  { id: "HARV-002", commodity: "Arabica Coffee", quantity: "800 kg", date: "2023-10-25", grade: "Premium" },
];

const initialFarmerProducts = [
    { id: "PROD-01", name: "Hass Avocado", certs: ["Organik Indonesia"], stock: "1200 kg" },
    { id: "PROD-02", name: "Arabica Coffee", certs: ["Fair Trade"], stock: "500 kg" },
];

const activityLog = [
    { date: "2023-10-29", activity: "Partnership request from 'Green Valley Exports'.", status: "Pending" },
    { date: "2023-10-28", activity: "Submitted harvest log for 1500 kg Hass Avocado.", status: "Completed" },
    { date: "2023-10-27", activity: "Uploaded 'Organik Indonesia' certification.", status: "Verified" },
]

const partnerships = [
    { exporter: "Green Valley Exports", status: "Active" },
    { exporter: "Highland Coffee Co.", status: "Negotiating" },
]

const localCommunityPrices = [
  { name: "Cabai Merah Keriting", price: 55000, unit: "kg" },
  { name: "Bawang Merah", price: 42000, unit: "kg" },
  { name: "Kopi Robusta Lampung", price: 38000, unit: "kg" },
  { name: "Gabah Kering Giling (GKG)", price: 6800, unit: "kg" },
];

export default function FarmerDashboardPage() {
  const { toast } = useToast()
  const [recentHarvests, setRecentHarvests] = useState(initialHarvests)
  const [farmerProducts, setFarmerProducts] = useState(initialFarmerProducts)

  const harvestForm = useForm<HarvestFormValues>({
    resolver: zodResolver(harvestFormSchema),
  })

  const certForm = useForm<CertFormValues>({
    resolver: zodResolver(certFormSchema),
    defaultValues: {
        certName: "",
    }
  })

  const certFileRef = certForm.register("certFile");

  function onHarvestSubmit(data: HarvestFormValues) {
    const newHarvest = {
      id: `HARV-${String(recentHarvests.length + 1).padStart(3, '0')}`,
      commodity: data.commodity,
      quantity: `${data.quantity} kg`,
      date: format(data.harvestDate, "yyyy-MM-dd"),
      grade: data.qualityGrade,
    }
    setRecentHarvests(prev => [newHarvest, ...prev]);
    toast({
      title: "Harvest Logged",
      description: `Successfully logged ${data.quantity}kg of ${data.commodity}.`,
    })
    harvestForm.reset();
  }
  
  function onCertSubmit(data: CertFormValues) {
    setFarmerProducts(prev => prev.map(p => {
        if (p.id === data.product) {
            return { ...p, certs: [...p.certs, data.certName] }
        }
        return p
    }))

    toast({
      title: "Certification Submitted",
      description: `Certification '${data.certName}' for ${farmerProducts.find(p => p.id === data.product)?.name} submitted for verification. File: ${data.certFile[0].name}`,
    })
    certForm.reset();
  }

  const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
  }


  return (
    <div className="flex flex-col gap-8">
       <div>
        <h1 className="text-3xl font-bold font-headline">Farmer Dashboard</h1>
        <p className="text-muted-foreground">Manage your harvests, products, and partnerships.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Payout</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,250.00</div>
            <p className="text-xs text-muted-foreground">
              From completed sales via exporters
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Request Payout</Button>
          </CardFooter>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Partnerships</CardTitle>
                <Handshake className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{partnerships.length}</div>
                <p className="text-xs text-muted-foreground">
                    Exporters you are currently working with
                </p>
            </CardContent>
        </Card>
      </div>
      
      <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-2">
                  <Landmark className="h-5 w-5 text-primary" />
                  Harga Komunitas Lokal
              </CardTitle>
              <CardDescription>
                  Harga rata-rata dari komunitas petani lokal (sumber tidak resmi).
              </CardDescription>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Komoditas</TableHead>
                          <TableHead className="text-right">Harga Perkiraan / kg</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {localCommunityPrices.map((item) => (
                          <TableRow key={item.name}>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell className="text-right font-mono">{formatIDR(item.price)}</TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </CardContent>
      </Card>


      <Tabs defaultValue="harvest">
        <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="harvest">Harvest Log</TabsTrigger>
            <TabsTrigger value="products">My Products & Certs</TabsTrigger>
            <TabsTrigger value="activity">Activity & Partnerships</TabsTrigger>
        </TabsList>

        <TabsContent value="harvest" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Log New Harvest</CardTitle>
                    <CardDescription>Enter the details of your recent harvest to update your inventory.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...harvestForm}>
                        <form onSubmit={harvestForm.handleSubmit(onHarvestSubmit)} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField
                                    control={harvestForm.control}
                                    name="commodity"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Commodity</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a commodity" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Hass Avocado">Hass Avocado</SelectItem>
                                                <SelectItem value="Arabica Coffee">Arabica Coffee</SelectItem>
                                                <SelectItem value="Vanilla Beans">Vanilla Beans</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={harvestForm.control}
                                    name="harvestDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                        <FormLabel>Harvest Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={harvestForm.control}
                                    name="quantity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Quantity (in Kg)</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="e.g., 500" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={harvestForm.control}
                                    name="qualityGrade"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Quality Grade</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., Grade A" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={harvestForm.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Notes</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Any additional notes about this harvest..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">
                                <PlusCircle className="mr-2"/>
                                Add Harvest Log
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Harvests</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Commodity</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Grade</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentHarvests.map((harvest) => (
                                <TableRow key={harvest.id}>
                                    <TableCell className="font-medium">{harvest.id}</TableCell>
                                    <TableCell>{harvest.commodity}</TableCell>
                                    <TableCell>{harvest.quantity}</TableCell>
                                    <TableCell>{harvest.date}</TableCell>
                                    <TableCell><Badge variant="secondary">{harvest.grade}</Badge></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
             <Card>
                <CardHeader>
                    <CardTitle>My Products</CardTitle>
                     <CardDescription>An overview of your available products and their stock levels.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Certifications</TableHead>
                                <TableHead>Available Stock</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {farmerProducts.map((prod) => (
                                <TableRow key={prod.id}>
                                    <TableCell className="font-medium">{prod.name}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-1 flex-wrap">
                                            {prod.certs.map(cert => <Badge key={cert} variant="outline">{cert}</Badge>)}
                                        </div>
                                    </TableCell>
                                    <TableCell>{prod.stock}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                 <CardHeader>
                    <CardTitle>Upload Certification</CardTitle>
                    <CardDescription>Add new certifications for your products to increase buyer trust.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Form {...certForm}>
                        <form onSubmit={certForm.handleSubmit(onCertSubmit)} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField
                                    control={certForm.control}
                                    name="product"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a product" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {farmerProducts.map(p => (
                                                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={certForm.control}
                                    name="certName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Certification Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g., USDA Organic" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                             <FormField
                                control={certForm.control}
                                name="certFile"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Certification Document</FormLabel>
                                    <FormControl>
                                         <Input type="file" {...certFileRef} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <Button type="submit">
                                <FileText className="mr-2" />
                                Submit Certification
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Activity Log</CardTitle>
                    <CardDescription>A log of your recent activities on the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Activity</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {activityLog.map((log, index) => (
                                <TableRow key={index}>
                                    <TableCell>{log.date}</TableCell>
                                    <TableCell className="font-medium">{log.activity}</TableCell>
                                    <TableCell>
                                        <Badge variant={log.status === 'Completed' || log.status === 'Verified' ? 'default' : 'secondary'} className={`${(log.status === "Completed" || log.status === "Verified") && 'bg-green-600/20 text-green-700 border-green-600/20 hover:bg-green-600/30'}`}>
                                            {log.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                 <CardHeader>
                    <CardTitle>Export Partnerships</CardTitle>
                    <CardDescription>Your current partnership status with exporters.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {partnerships.map((partner) => (
                             <li key={partner.exporter} className="flex items-center justify-between p-3 rounded-md border">
                                 <div className="flex items-center gap-3">
                                     <CheckCircle2 className="h-5 w-5 text-primary"/>
                                     <span className="font-medium">{partner.exporter}</span>
                                 </div>
                                <Badge variant={partner.status === 'Active' ? 'default' : 'secondary'} className={`${partner.status === 'Active' && 'bg-green-600/20 text-green-700 border-green-600/20 hover:bg-green-600/30'}`}>{partner.status}</Badge>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

    

    