
'use client'

import React, { useState, useMemo } from "react"
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
import { DollarSign, Users, ShieldAlert, ListChecks, MoreHorizontal, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

const platformStats = {
  totalRevenue: 75230.50,
  activeUsers: 125,
  pendingVerifications: 8,
  totalTransactions: 240,
}

const recentUsersData = [
  { id: "USR-001", name: "Green Valley Exports", role: "Exporter", status: "Verified", joined: "2023-10-15" },
  { id: "USR-002", name: "Farm Fresh Organics", role: "Farmer", status: "Verified", joined: "2023-10-12" },
  { id: "USR-003", name: "FreshMart EU", role: "Buyer", status: "Verified", joined: "2023-10-10" },
  { id: "USR-004", name: "Agro Imports Inc.", role: "Buyer", status: "Pending Verification", joined: "2023-11-01" },
  { id: "USR-005", name: "Sunrise Farms", role: "Farmer", status: "Pending Verification", joined: "2023-11-02" },
]

const recentTransactions = [
  { id: "TXN-98765", type: "Export Deal", amount: 12500, status: "Completed", date: "2023-11-22" },
  { id: "TXN-12345", type: "Export Deal", amount: 30000, status: "Completed", date: "2023-11-12" },
  { id: "PYT-FARM-01", type: "Farmer Payout", amount: 8000, status: "Completed", date: "2023-11-22" },
  { id: "FEE-PLAT-01", type: "Platform Fee", amount: 750, status: "Processed", date: "2023-11-22" },
]


export default function AdminDashboardPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return recentUsersData;
    return recentUsersData.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const handleAction = (action: string) => {
    toast({
      title: "Action Triggered",
      description: `${action} functionality is not implemented in this demo.`,
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform-wide overview and management tools.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Platform Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${platformStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              All fees collected from transactions.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              Farmers, Exporters, and Buyers.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.pendingVerifications}</div>
            <p className="text-xs text-muted-foreground">
              New users or documents awaiting approval.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.totalTransactions}</div>
            <p className="text-xs text-muted-foreground">
              Completed deals on the platform.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
            <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Verify, manage, and monitor all platform users.</CardDescription>
                <div className="pt-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search users by name or role..." 
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined On</TableHead>
                             <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Badge variant={user.status === 'Verified' ? 'default' : 'destructive'} className={`${user.status === "Verified" && 'bg-green-600/20 text-green-700 border-green-600/20 hover:bg-green-600/30'}`}>
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{user.joined}</TableCell>
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
                                            <DropdownMenuItem onSelect={() => handleAction("View Profile")}>View Profile</DropdownMenuItem>
                                            {user.status !== "Verified" && <DropdownMenuItem onSelect={() => handleAction("Verify User")}>Verify User</DropdownMenuItem>}
                                            <DropdownMenuItem onSelect={() => handleAction("Suspend User")}>Suspend User</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card className="lg:col-span-3">
             <CardHeader>
                <CardTitle>Recent Platform Transactions</CardTitle>
                <CardDescription>A log of the latest financial activities.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Transaction ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                         {recentTransactions.map((tx) => (
                            <TableRow key={tx.id}>
                                <TableCell className="font-medium">{tx.id}</TableCell>
                                <TableCell>{tx.type}</TableCell>
                                <TableCell><Badge variant="secondary">{tx.status}</Badge></TableCell>
                                <TableCell className="text-right">${tx.amount.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>

    </div>
  )
}
