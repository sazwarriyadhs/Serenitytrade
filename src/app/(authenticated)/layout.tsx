
"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
import { LayoutDashboard, Leaf, ArrowRightLeft, Bell, Spline, TrendingUp, BookUser, Tractor, Briefcase, Calculator, Truck, Landmark, Compass, BookCheck, Wallet, BookMarked, Shield, Box, Ship, CreditCard, Loader2, ShoppingBasket, Factory } from "lucide-react"

const producerRoles = ['farmer', 'peternak', 'nelayan', 'pengelola_hasil_hutan', 'pengelola_hasil_kebun'];

const allNavItems = [
  { href: "/admin-dashboard", icon: Shield, label: "Admin Dashboard", roles: ['admin'] },
  { href: "/dashboard", icon: LayoutDashboard, label: "Exporter Dashboard", roles: ['exporter'] },
  { href: "/buyer-dashboard", icon: Briefcase, label: "Buyer Dashboard", roles: ['buyer'] },
  { href: "/farmer-dashboard", icon: Tractor, label: "Producer Dashboard", roles: [...producerRoles] },
  { href: "/supplies-market", icon: ShoppingBasket, label: "Pasar Kebutuhan", roles: ['exporter', 'admin', ...producerRoles] },
  { href: "/vendors", icon: Factory, label: "Mitra Pemasok", roles: ['exporter', 'admin', ...producerRoles] },
  { href: "/membership-card", icon: CreditCard, label: "Membership Card", roles: ['exporter', 'buyer', 'admin', ...producerRoles] },
  { href: "/farmer-guide", icon: BookMarked, label: "Panduan Petani", roles: ['admin', ...producerRoles] },
  { href: "/find-market", icon: Compass, label: "Find Market", roles: ['exporter', 'admin'] },
  { href: "/commodities", icon: Leaf, label: "Commodities", roles: ['exporter', 'buyer', 'admin', ...producerRoles] },
  { href: "/offers", icon: ArrowRightLeft, label: "Offers & Requests", roles: ['exporter', 'buyer', 'admin'] },
  { href: "/tracking", icon: Truck, label: "Shipment Tracking", roles: ['exporter', 'buyer', 'admin', ...producerRoles] },
  { href: "/shipping-partners", icon: Ship, label: "Shipping Partners", roles: ['exporter', 'admin'] },
  { href: "/payment-tracking", icon: Landmark, label: "Payment Tracking", roles: ['exporter', 'buyer', 'admin', ...producerRoles] },
  { href: "/prediction", icon: TrendingUp, label: "Demand Prediction", roles: ['exporter', 'admin'] },
  { href: "/value-chain", icon: Spline, label: "Value Chain", roles: ['exporter', 'buyer', 'admin', ...producerRoles] },
  { href: "/fee-calculator", icon: Wallet, label: "Fee & Payouts", roles: ['exporter', 'admin', ...producerRoles] },
  { href: "/packaging-recommender", icon: Box, label: "Packaging Recommender", roles: ['exporter', 'admin'] },
  { href: "/exporter-guide", icon: BookCheck, label: "Panduan Ekspor", roles: ['exporter', 'admin'] },
  { href: "/buyer-info", icon: BookUser, label: "Info Buyer", roles: ['buyer', 'admin'] },
  { href: "/notifications", icon: Bell, label: "Notifications", roles: ['exporter', 'buyer', 'admin', ...producerRoles] },
]

const roleInfo: { [key: string]: { name: string, email: string } } = {
  exporter: { name: "Exporter", email: "exporter@serenity.com" },
  buyer: { name: "Buyer", email: "buyer@serenity.com" },
  farmer: { name: "Farmer", email: "farmer@serenity.com" },
  peternak: { name: "Livestock Farmer", email: "peternak@serenity.com" },
  nelayan: { name: "Fisherman", email: "nelayan@serenity.com" },
  pengelola_hasil_hutan: { name: "Forest Manager", email: "hutan@serenity.com" },
  pengelola_hasil_kebun: { name: "Plantation Manager", email: "kebun@serenity.com" },
  admin: { name: "Admin", email: "admin@serenity.com" },
}

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isAuthenticating, setIsAuthenticating] = useState(true)

  useEffect(() => {
    // On component mount, read the role from localStorage.
    const role = localStorage.getItem("userRole")
    if (role && roleInfo[role]) {
      setUserRole(role)
    } else {
      // If no role or invalid role, redirect to login
      router.replace("/login")
    }
    setIsAuthenticating(false)
  }, [router])

  // Filter navigation items based on the user's role.
  const navItems = allNavItems.filter(item => userRole && item.roles.includes(userRole))
  const currentUser = userRole ? roleInfo[userRole] : null

  if (isAuthenticating) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

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
            <UserNav role={currentUser?.name} email={currentUser?.email} />
          </header>
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
