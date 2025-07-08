
'use client'

import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, ListOrdered, Package, MoreHorizontal, PlusCircle } from "lucide-react"
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
import { useToast } from "@/hooks/use-toast"

const vendorStats = {
  totalRevenue: 22550000.00,
  productsListed: 15,
  pendingOrders: 8,
}

const productListings = [
  { id: "P-001", name: "Benih Jagung Hibrida NK Perkasa", category: "Benih & Bibit", stock: 500, price: "Rp 120.000 / kg", status: "Active" },
  { id: "P-002", name: "Pupuk NPK Mutiara 16-16-16", category: "Pupuk & Pestisida", stock: 1200, price: "Rp 750.000 / 50kg", status: "Active" },
  { id: "P-003", name: "Traktor Tangan Quick G1000", category: "Alat & Mesin", stock: 25, price: "Rp 8.500.000 / unit", status: "Active" },
  { id: "P-004", name: "Pestisida Regent 50 SC", category: "Pupuk & Pestisida", stock: 150, price: "Rp 65.000 / 100ml", status: "Inactive" },
]

const recentOrders = [
  { id: "ORD-001", producer: "Sunrise Farms", item: "Benih Jagung Hibrida", quantity: 5, total: "Rp 600.000", status: "Shipped", date: "2023-11-25" },
  { id: "ORD-002", producer: "Java Spices Plantation", item: "Pupuk NPK Mutiara", quantity: 10, total: "Rp 7.500.000", status: "Processing", date: "2023-11-26" },
  { id: "ORD-003", producer: "Berry Fields", item: "Traktor Tangan Quick G1000", quantity: 1, total: "Rp 8.500.000", status: "Pending Payment", date: "2023-11-26" },
]

export default function VendorDashboardPage() {
  const { toast } = useToast()

  const handleAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `${action} functionality is not implemented in this demo.`,
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold font-headline">Vendor Dashboard</h1>
      <p className="text-muted-foreground -mt-4">Manage your products, orders, and profile.</p>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp{vendorStats.totalRevenue.toLocaleString('id-ID')}</div>
            <p className="text-xs text-muted-foreground">
              Gross revenue from all sales.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Listed</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendorStats.productsListed}</div>
            <p className="text-xs text-muted-foreground">
              Total active and inactive products.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <ListOrdered className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendorStats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              Orders needing to be processed or shipped.
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">Product Management</TabsTrigger>
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
            <Card>
                <CardHeader>
                    <CardTitle>My Product Listings</CardTitle>
                    <CardDescription>Manage all products you offer on the marketplace.</CardDescription>
                    <div className="pt-2 flex justify-end">
                       <Button size="sm" className="ml-auto gap-1" onClick={() => handleAction("Add New Product")}>
                           <PlusCircle className="h-3.5 w-3.5" />
                           <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                               Add New Product
                           </span>
                       </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productListings.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>
                                        <Badge variant={product.status === 'Active' ? 'default' : 'secondary'} className={`${product.status === "Active" && 'bg-green-600/20 text-green-700 border-green-600/20 hover:bg-green-600/30'}`}>{product.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onSelect={() => handleAction("Edit Product")}>Edit</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => handleAction("View Analytics")}>Analytics</DropdownMenuItem>
                                                <DropdownMenuItem onSelect={() => handleAction("Archive Product")}>Archive</DropdownMenuItem>
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
        <TabsContent value="orders">
            <Card>
                 <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>A log of the latest orders for your products.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Producer</TableHead>
                                <TableHead>Item</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {recentOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.producer}</TableCell>
                                    <TableCell>{order.item}</TableCell>
                                    <TableCell><Badge variant="outline">{order.status}</Badge></TableCell>
                                    <TableCell className="text-right">{order.total}</TableCell>
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
