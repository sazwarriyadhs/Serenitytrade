'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon, PlusCircle, Upload, FileText, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"

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
});
type CertFormValues = z.infer<typeof certFormSchema>

// Mock data
const recentHarvests = [
  { id: "HARV-001", commodity: "Hass Avocado", quantity: "1500 kg", date: "2023-10-28", grade: "A" },
  { id: "HARV-002", commodity: "Arabica Coffee", quantity: "800 kg", date: "2023-10-25", grade: "Premium" },
];

const farmerProducts = [
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

export default function FarmerDashboardPage() {
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
    console.log(data)
    alert("Harvest data submitted!")
    harvestForm.reset();
  }
  
  function onCertSubmit(data: CertFormValues) {
    console.log(data)
    alert(`Certification '${data.certName}' submitted with file: ${data.certFile[0].name}`)
    certForm.reset();
  }


  return (
    <div className="flex flex-col gap-8">
       <div>
        <h1 className="text-3xl font-bold font-headline">Farmer Dashboard</h1>
        <p className="text-muted-foreground">Manage your harvests, products, and partnerships.</p>
      </div>

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
                                        <div className="flex gap-1">
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
