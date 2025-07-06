import Image from "next/image"
import { MoreHorizontal, PlusCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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

const offers = [
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

export default function OffersPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
            <CardTitle>Offers & Requests</CardTitle>
            <CardDescription>
            Manage your export offers and buyer requests.
            </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
            <a href="#">
            <PlusCircle className="h-4 w-4" />
            New Offer
            </a>
        </Button>
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
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Negotiate</DropdownMenuItem>
                    <DropdownMenuItem>Cancel</DropdownMenuItem>
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
