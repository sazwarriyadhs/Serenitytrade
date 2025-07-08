
"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const roleInfo = {
  exporter: {
    title: "Exporter",
    description: "Login to manage your commodities, offers, and exports.",
    email: "exporter@serenity.com"
  },
  buyer: {
    title: "Overseas Buyer",
    description: "Login to browse commodities and manage your requests.",
    email: "buyer@serenity.com"
  },
  farmer: {
    title: "Farmer",
    description: "Login to log your harvests and manage partnerships.",
    email: "farmer@serenity.com"
  },
  peternak: {
    title: "Livestock Farmer",
    description: "Login to manage your livestock products and partnerships.",
    email: "peternak@serenity.com"
  },
  nelayan: {
    title: "Fisherman",
    description: "Login to manage your catch and partnerships.",
    email: "nelayan@serenity.com"
  },
  pengelola_hasil_hutan: {
    title: "Forest Manager",
    description: "Login to manage your forest products and partnerships.",
    email: "hutan@serenity.com"
  },
  pengelola_hasil_kebun: {
    title: "Plantation Manager",
    description: "Login to manage your plantation products and partnerships.",
    email: "kebun@serenity.com"
  },
  vendor: {
    title: "Supplies Vendor",
    description: "Login to manage your product listings and orders.",
    email: "vendor@serenity.com"
  },
  admin: {
    title: "Admin",
    description: "Login to access all dashboards and system settings.",
    email: "admin@serenity.com"
  },
}

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = useState("exporter")

  const handleLogin = () => {
    // Store role in localStorage to be used by the layout
    localStorage.setItem("userRole", role)

    const producerRoles = ['farmer', 'peternak', 'nelayan', 'pengelola_hasil_hutan', 'pengelola_hasil_kebun'];

    if (role === "admin") {
      router.push("/admin-dashboard")
    } else if (producerRoles.includes(role)) {
      router.push("/farmer-dashboard")
    } else if (role === "buyer") {
      router.push("/buyer-dashboard")
    } else if (role === "vendor") {
      router.push("/vendor-dashboard")
    } else { // exporter
      router.push("/dashboard")
    }
  }

  const handleRoleChange = (newRole: string) => {
    if (newRole in roleInfo) {
      setRole(newRole)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto w-full max-w-sm shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Logo size="large" />
          </div>
          <CardTitle className="text-2xl font-headline text-center">Login as {roleInfo[role as keyof typeof roleInfo].title}</CardTitle>
          <CardDescription className="text-center">
            {roleInfo[role as keyof typeof roleInfo].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  key={role} // Re-renders the input when role changes to update defaultValue
                  defaultValue={roleInfo[role as keyof typeof roleInfo].email}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required defaultValue="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={handleRoleChange}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farmer">Farmer (Petani)</SelectItem>
                    <SelectItem value="peternak">Livestock Farmer (Peternak)</SelectItem>
                    <SelectItem value="nelayan">Fisherman (Nelayan)</SelectItem>
                    <SelectItem value="pengelola_hasil_hutan">Forest Manager (Pengelola Hutan)</SelectItem>
                    <SelectItem value="pengelola_hasil_kebun">Plantation Manager (Pengelola Kebun)</SelectItem>
                    <SelectItem value="vendor">Supplies Vendor</SelectItem>
                    <SelectItem value="exporter">Exporter</SelectItem>
                    <SelectItem value="buyer">Overseas Buyer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full" type="button" onClick={handleLogin}>
                Login with Google
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
