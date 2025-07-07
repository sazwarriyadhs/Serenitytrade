'use client'

import React, { useState } from "react"
import { MoreHorizontal, PlusCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useToast } from "@/hooks/use-toast"

const initialOffers = [
  {
    id: "OFF-001",
    commodity: "Organic Hass Avocado",
    exporter: "Green Valley Exports",
    buyer: "FreshMart EU",
    quantity: "5,000 kg",
    price: "$12,500",
    status: "Negotiating",
    date: "2023-10-26"
  },
  {
    id: "OFF-002",
    commodity: "Arabica Coffee Beans",
    exporter: "Highland Coffee Co.",
    buyer: "The Coffee House",
    quantity: "2,000 kg",
    price: "$30,000",
    status: "Offer Accepted",
    date: "2023-10-24"
  },
  {
    id: "REQ-001",
    commodity: "Peruvian Quinoa",
    exporter: "Andean Grains",
    buyer: "Whole Foods",
    quantity: "10,000 kg",
    price: "Pending Request",
    status: "Buyer Request",
    date: "2023-10-23"
  },
  {
    id: "OFF-003",
    commodity: "Fresh Mangoes",
    exporter: "Tropical Delights",
    buyer: "Juice World Inc.",
    quantity: "8,000 kg",
    price: "$9,600",
    status: "Offer Sent",
    date: "2023-10-22"
  },
  {
    id: "OFF-004",
    commodity: "Organic Blueberries",
    exporter: "Berry Fields",
    buyer: "Super Fruct",
    quantity: "3,000 kg",
    price: "$21,000",
    status: "Fulfilled",
    date: "2023-09-15"
  },
];

const offerFormSchema = z.object({
  commodity: z.string().min(1, "Commodity is required."),
  buyer: z.string().min(1, "Buyer is required."),
  quantity: z.string().min(1, "Quantity is required."),
  price: z.coerce.number().positive("Price must be a positive number."),
})

type OfferFormValues = z.infer<typeof offerFormSchema>


export default function OffersPage() {
  const { toast } = useToast()
  const [offers, setOffers] = useState(initialOffers)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<OfferFormValues>({
    resolver: zodResolver(offerFormSchema),
  })

  function onSubmit(data: OfferFormValues) {
    const newOffer = {
      id: `OFF-${String(offers.filter(o => o.id.startsWith("OFF")).length + 5).padStart(3, '0')}`,
      commodity: data.commodity,
      exporter: "My Export Company", // Assume a logged-in exporter
      buyer: data.buyer,
      quantity: data.quantity,
      price: `$${data.price.toLocaleString()}`,
      status: "Offer Sent",
      date: new Date().toISOString().split('T')[0],
    }
    setOffers(prev => [newOffer, ...prev])
    toast({
      title: "Offer Sent",
      description: `Your offer for ${data.commodity} has been sent to ${data.buyer}.`
    })
    form.reset()
    setIsDialogOpen(false)
  }
  
  const handleAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `${action} functionality is not implemented in this demo.`,
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
            <CardTitle>Offers & Requests</CardTitle>
            <CardDescription>
            Manage your export offers and buyer requests.
            </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="ml-auto gap-1">
              <PlusCircle className="h-4 w-4" />
              New Offer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Offer</DialogTitle>
              <DialogDescription>
                Fill out the form to send a new offer to a buyer.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
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
                          <SelectItem value="Organic Hass Avocado">Organic Hass Avocado</SelectItem>
                          <SelectItem value="Arabica Coffee Beans">Arabica Coffee Beans</SelectItem>
                          <SelectItem value="Sun-dried Tomatoes">Sun-dried Tomatoes</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="buyer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Buyer</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., FreshMart EU" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                   <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 5,000 kg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Price (USD)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 12500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <DialogFooter>
                  <Button type="submit">Send Offer</Button>
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
              <TableHead>ID</TableHead>
              <TableHead>Commodity</TableHead>
              <TableHead>
                Parties
              </TableHead>
              <TableHead>
                Status
              </TableHead>
              <TableHead>
                Quantity
              </TableHead>
              <TableHead className="text-right">
                Price
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map(offer => (
            <TableRow key={offer.id}>
              <TableCell className="font-medium">{offer.id}</TableCell>
              <TableCell className="font-medium">{offer.commodity}</TableCell>
              <TableCell>
                <div className="font-medium">{offer.buyer}</div>
                <div className="text-sm text-muted-foreground">{offer.exporter}</div>
              </TableCell>
              <TableCell>
                <Badge variant={
                    offer.status === "Fulfilled" || offer.status === "Offer Accepted" ? "default" 
                    : offer.status === 'Buyer Request' ? "outline"
                    : "secondary"
                } className={`${(offer.status === "Fulfilled" || offer.status === "Offer Accepted") && 'bg-green-600/20 text-green-700 border-green-600/20 hover:bg-green-600/30'}`}>
                  {offer.status}
                </Badge>
              </TableCell>
              <TableCell>{offer.quantity}</TableCell>
              <TableCell className="text-right">{offer.price}</TableCell>
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
                    <DropdownMenuItem onSelect={() => handleAction("View Details")}>View Details</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleAction("Negotiate")}>Negotiate</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleAction("Cancel")}>Cancel</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
