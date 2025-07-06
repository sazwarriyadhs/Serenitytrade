'use client'

import dynamic from 'next/dynamic'
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
import { Skeleton } from '@/components/ui/skeleton'
import { DollarSign, Package, Users, ArrowUpRight } from "lucide-react"

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

export default function DashboardPage() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
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
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <DashboardChart />
        <Card>
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
    </>
  )
}
