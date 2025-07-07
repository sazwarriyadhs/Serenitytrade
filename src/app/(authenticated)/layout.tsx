
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar"
import { Logo } from "@/components/logo"
import { UserNav } from "@/components/user-nav"
import { LayoutDashboard, Leaf, ArrowRightLeft, Bell, Spline, TrendingUp, BookUser, Tractor, Briefcase, Calculator, Truck, Landmark, Compass, BookCheck, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const allNavItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Exporter Dashboard", roles: ['exporter', 'admin'] },
  { href: "/buyer-dashboard", icon: Briefcase, label: "Buyer Dashboard", roles: ['buyer', 'admin'] },
  { href: "/farmer-dashboard", icon: Tractor, label: "Farmer Dashboard", roles: ['farmer', 'admin'] },
  { href: "/find-market", icon: Compass, label: "Find Market", roles: ['farmer', 'admin'] },
  { href: "/commodities", icon: Leaf, label: "Commodities", roles: ['exporter', 'buyer', 'farmer', 'admin'] },
  { href: "/offers", icon: ArrowRightLeft, label: "Offers & Requests", roles: ['exporter', 'buyer', 'admin'] },
  { href: "/tracking", icon: Truck, label: "Shipment Tracking", roles: ['exporter', 'buyer', 'farmer', 'admin'] },
  { href: "/payment-tracking", icon: Landmark, label: "Payment Tracking", roles: ['exporter', 'buyer', 'farmer', 'admin'] },
  { href: "/prediction", icon: TrendingUp, label: "Demand Prediction", roles: ['exporter', 'admin'] },
  { href: "/value-chain", icon: Spline, label: "Value Chain", roles: ['exporter', 'buyer', 'farmer', 'admin'] },
  { href: "/fee-calculator", icon: Wallet, label: "Fee & Payouts", roles: ['exporter', 'farmer', 'admin'] },
  { href: "/exporter-guide", icon: BookCheck, label: "Panduan Ekspor", roles: ['exporter', 'admin'] },
  { href: "/buyer-info", icon: BookUser, label: "Info Buyer", roles: ['buyer', 'admin'] },
  { href: "/notifications", icon: Bell, label: "Notifications", roles: ['exporter', 'buyer', 'farmer', 'admin'] },
]

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    // On component mount, read the role from localStorage.
    const role = localStorage.getItem("userRole")
    setUserRole(role)
  }, [])

  // Filter navigation items based on the user's role.
  const navItems = allNavItems.filter(item => userRole && item.roles.includes(userRole))

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar collapsible="icon" variant="sidebar" side="left">
          <SidebarHeader className="p-4">
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="w-full flex-1">
              {/* Search form removed */}
            </div>
            <UserNav />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
