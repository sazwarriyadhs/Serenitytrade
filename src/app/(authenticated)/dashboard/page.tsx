
'use client'

import dynamic from 'next/dynamic'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Skeleton } from '@/components/ui/skeleton'
import { Wallet, Package, Users, ArrowUpRight, TrendingUp, TrendingDown, Minus, Handshake } from "lucide-react"
import { Button } from '@/components/ui/button'
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"


const DashboardChart = dynamic(() => import('@/components/dashboard-chart'), {
  ssr: false,
  loading: () => (
    <Card className="xl:col-span-2">
      <CardHeader>
        <CardTitle>Transaction Volume</CardTitle>
        <CardDescription>
          A summary of transactions over the last 6 months.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <Skeleton className="h-[350px] w-full" />
      </CardContent>
    </Card>
  ),
})

const recommendedSellPrices = [
  { name: "Organic Hass Avocado", targetPrice: 2.55, trend: 'up' },
  { name: "Arabica Coffee Beans", targetPrice: 15.20, trend: 'stable' },
  { name: "Sun-dried Tomatoes", targetPrice: 12.35, trend: 'up' },
  { name: "King Quinoa", targetPrice: 9.05, trend: 'stable' },
];

const trendIcons = {
  up: <TrendingUp className="h-5 w-5 text-green-600" />,
  down: <TrendingDown className="h-5 w-5 text-destructive" />,
  stable: <Minus className="h-5 w-5 text-muted-foreground" />,
}

const partneredFarmers = [
  { id: 'FARM-001', name: 'Sunrise Farms', specialty: 'Organic Avocados', since: '2023-10-15', status: 'Active' },
  { id: 'FARM-002', name: 'Highland Coffee Farm', specialty: 'Arabica Coffee', since: '2023-09-01', status: 'Active' },
];

const potentialPartners = [
  { id: 'FARM-003', name: 'Andean Grains', specialty: 'Quinoa, Amaranth', location: 'Peru', capacity: '100 tons/year' },
  { id: 'FARM-004', name: 'Berry Fields', specialty: 'Blueberries, Strawberries', location: 'Chile', capacity: '75 tons/year' },
  { id: 'FARM-005', name: 'Java Spices', specialty: 'Cloves, Nutmeg', location: 'Indonesia', capacity: '20 tons/year' },
];


export default function DashboardPage() {
  const { toast } = useToast()

  const handleAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `${action} functionality is not implemented in this demo.`,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Exporter Dashboard</h1>
        <p className="text-muted-foreground">Monitor your sales, offers, and export performance.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Withdrawable Balance
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15,780.50</div>
            <p className="text-xs text-muted-foreground">
              Funds ready for withdrawal
            </p>
          </CardContent>
           <CardFooter>
            <Button className="w-full">Withdraw Funds</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New Buyers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+23</div>
            <p className="text-xs text-muted-foreground">
              +18.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Exports
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Offers
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-4">
        <DashboardChart />
        <Card className="xl:col-span-1">
            <CardHeader>
                <CardTitle>Price Recommendations (Sell)</CardTitle>
                <CardDescription>AI-powered target sell prices. Prices are more favorable when the trend is up.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Commodity</TableHead>
                            <TableHead className="text-right">Price/kg</TableHead>
                            <TableHead className="text-right">Trend</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recommendedSellPrices.map((item) => (
                            <TableRow key={item.name}>
                                <TableCell className="font-medium text-sm">{item.name}</TableCell>
                                <TableCell className="text-right">${item.targetPrice.toFixed(2)}</TableCell>
                                <TableCell className="flex justify-end">{trendIcons[item.trend as keyof typeof trendIcons]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>Recent Offers</CardTitle>
            <CardDescription>
              Recently added export offers from our partners.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commodity</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Organic Avocados</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      Exporter: Green Farms Ltd.
                    </div>
                  </TableCell>
                  <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Arabica Coffee Beans</div>
                     <div className="hidden text-sm text-muted-foreground md:inline">
                      Exporter: Highland Coffee
                    </div>
                  </TableCell>
                  <TableCell className="text-right">$10,000.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Fresh Mangoes</div>
                     <div className="hidden text-sm text-muted-foreground md:inline">
                      Exporter: Tropical Fruits Co.
                    </div>
                  </TableCell>
                  <TableCell className="text-right">$4,300.00</TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell>
                    <div className="font-medium">Quinoa Grains</div>
                     <div className="hidden text-sm text-muted-foreground md:inline">
                      Exporter: Andean Grains
                    </div>
                  </TableCell>
                  <TableCell className="text-right">$7,800.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Handshake />
                    Farmer Partnerships
                </CardTitle>
                <CardDescription>
                    Manage your farmer network and discover new partnership opportunities. You can partner with up to 10 farmers.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="my-partners">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="my-partners">My Partners ({partneredFarmers.length})</TabsTrigger>
                        <TabsTrigger value="find-farmers">Find New Farmers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="my-partners" className="pt-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Farmer Name</TableHead>
                                    <TableHead>Primary Commodity</TableHead>
                                    <TableHead>Partner Since</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {partneredFarmers.map((farmer) => (
                                    <TableRow key={farmer.id}>
                                        <TableCell className="font-medium">{farmer.name}</TableCell>
                                        <TableCell>{farmer.specialty}</TableCell>
                                        <TableCell>{farmer.since}</TableCell>
                                        <TableCell><Badge variant="default" className="bg-green-600/20 text-green-700 border-green-600/20 hover:bg-green-600/30">{farmer.status}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" onClick={() => handleAction(`Manage partnership with ${farmer.name}`)}>
                                                Manage
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="find-farmers" className="pt-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Farmer Name</TableHead>
                                    <TableHead>Specialty</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Annual Capacity</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {potentialPartners.map((farmer) => (
                                    <TableRow key={farmer.id}>
                                        <TableCell className="font-medium">{farmer.name}</TableCell>
                                        <TableCell>{farmer.specialty}</TableCell>
                                        <TableCell>{farmer.location}</TableCell>
                                        <TableCell>{farmer.capacity}</TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" onClick={() => handleAction(`Send partnership request to ${farmer.name}`)} disabled={partneredFarmers.length >= 10}>
                                                Send Request
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         {partneredFarmers.length >= 10 && (
                            <p className="text-sm text-center text-muted-foreground mt-4">
                                You have reached the maximum of 10 farmer partnerships.
                            </p>
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
