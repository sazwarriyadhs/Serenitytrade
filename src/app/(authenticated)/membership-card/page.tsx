
'use client'

import React, { useState, useEffect, useRef } from 'react'
import { toPng } from 'html-to-image'
import { QRCodeSVG } from 'qrcode.react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Download, RefreshCw, Loader2 } from "lucide-react"
import { useToast } from '@/hooks/use-toast'
import { Logo } from '@/components/logo'
import { cn } from "@/lib/utils"

const ExpiryDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

const roleDisplayNames: { [key: string]: string } = {
    farmer: "PETANI",
    peternak: "PETERNAK",
    nelayan: "NELAYAN",
    pengelola_hasil_hutan: "PENGELOLA HASIL HUTAN",
    pengelola_hasil_kebun: "PENGELOLA HASIL KEBUN",
    exporter: "EKSPORTIR / BUYER",
    buyer: "EKSPORTIR / BUYER",
    admin: "ADMIN",
    vendor: "VENDOR PENYEDIA",
};

const membershipData = {
  farmer: { name: "Sunrise Farms", id: "FARM-2025-00005", type: "Petani Terverifikasi", address: "Desa Makmur, Kec. Sejahtera, Kab. Subur, Indonesia", npwp: "01.234.567.8-910.000", photo: "https://placehold.co/150x150.png", photoHint: "farm landscape" },
  peternak: { name: "Jaya Beef", id: "LSTK-2025-00012", type: "Peternak Terverifikasi", address: "Jl. Peternakan No. 1, Kab. Boyolali, Indonesia", npwp: "02.345.678.9-101.000", photo: "https://placehold.co/150x150.png", photoHint: "cattle farm" },
  nelayan: { name: "Bahari Seafood", id: "FISH-2025-00023", type: "Nelayan Terverifikasi", address: "Desa Pesisir, Kab. Indramayu, Indonesia", npwp: "03.456.789.0-112.000", photo: "https://placehold.co/150x150.png", photoHint: "fishing boat" },
  pengelola_hasil_kebun: { name: "Gayo Highland Coffee", id: "PLNT-2025-00001", type: "Pengelola Kebun", address: "Dataran Tinggi Gayo, Aceh, Indonesia", npwp: "04.567.890.1-223.000", nib: "9123450000123", photo: "https://placehold.co/150x150.png", photoHint: "coffee plantation" },
  pengelola_hasil_hutan: { name: "Borneo Teak Woods", id: "FRST-2025-00008", type: "Pengelola Hutan", address: "Hutan Kalimantan, Indonesia", npwp: "05.678.901.2-334.000", nib: "9123450000456", photo: "https://placehold.co/150x150.png", photoHint: "teak forest" },
  vendor: { name: "Agri-Supply Indonesia", id: "VEND-2025-00077", type: "Vendor Penyedia", address: "Kawasan Industri, Cikarang, Indonesia", npwp: "06.789.012.3-445.000", nib: "9123450000789", photo: "https://placehold.co/150x150.png", photoHint: "warehouse supplies" },
  exporter: { name: "Green Valley Exports", id: "EXP-2025-00101", type: "Eksportir Terverifikasi", address: "Jl. Ekspor No. 1, Jakarta, Indonesia", npwp: "07.890.123.4-556.000", nib: "9123450000999", photo: "https://placehold.co/150x150.png", photoHint: "shipping container" },
  buyer: { name: "FreshMart EU", id: "BUY-2025-00305", type: "Pembeli Internasional", address: "123 Import Lane, Rotterdam, Netherlands", npwp: "NL123456789B01", nib: "87654321", photo: "https://placehold.co/150x150.png", photoHint: "supermarket aisle" },
  admin: { name: "Platform Administrator", id: "ADM-00001", type: "Administrator", address: "Serenity HQ", npwp: "N/A", photo: "https://placehold.co/150x150.png", photoHint: "server room" },
  default: { name: "Serenity Member", id: "GEN-00000", type: "Anggota Terverifikasi", address: "Serenity Hub", npwp: "N/A", photo: "https://placehold.co/150x150.png", photoHint: "abstract logo" }
};


const MemberCard = React.forwardRef<HTMLDivElement, {
  role?: string;
  isVerified?: boolean;
  photo?: string | null;
  photoHint?: string;
  name: string;
  idNumber: string;
  type: string;
  address: string;
  nib?: string;
  npwp: string;
  className?: string;
}>(({
  role = 'exporter',
  isVerified = false,
  photo,
  photoHint,
  name,
  idNumber,
  type,
  address,
  nib,
  npwp,
  className,
}, ref) => {
  const qrValue = JSON.stringify({ id: idNumber, role, name });

  return (
    <Card ref={ref} className={cn("overflow-hidden shadow-lg w-full max-w-xl mx-auto bg-white", className)}>
      <div className="flex h-full">
        {/* Left section */}
        <div className="w-[65%] bg-white p-4 sm:p-6 flex flex-col text-foreground">
          <div className="w-52">
            <Logo size="large" className="!h-auto" />
          </div>
          <div className="mt-6">
            <p className="text-base font-bold tracking-wider text-black">KARTU ANGGOTA</p>
            <p className="text-base font-bold tracking-wider text-black -mt-1">
              {roleDisplayNames[role] || "ANGGOTA"}
            </p>
          </div>
          <div className="mt-4 text-xs space-y-2.5">
            <div className="grid grid-cols-[60px_auto]">
              <span className="font-semibold text-muted-foreground">No. Induk</span>
              <span className="font-mono">: {idNumber}</span>
            </div>
            <div className="grid grid-cols-[60px_auto]">
              <span className="font-semibold text-muted-foreground">Nama</span>
              <span className="font-semibold">: {name}</span>
            </div>
            <div className="grid grid-cols-[60px_auto]">
              <span className="font-semibold text-muted-foreground">Jenis</span>
              <span className="">: {type}</span>
            </div>
            <div className="grid grid-cols-[60px_auto]">
              <span className="font-semibold text-muted-foreground">Alamat</span>
              <span className="line-clamp-2">: {address}</span>
            </div>
            {role !== 'farmer' && nib && (
              <div className="grid grid-cols-[60px_auto]">
                <span className="font-semibold text-muted-foreground">NIB</span>
                <span className="font-mono">: {nib}</span>
              </div>
            )}
            <div className="grid grid-cols-[60px_auto]">
              <span className="font-semibold text-muted-foreground">NPWP</span>
              <span className="font-mono">: {npwp}</span>
            </div>
          </div>
          <div className="mt-auto pt-2">
              {isVerified ? (
                   <Badge variant="default" className="bg-green-600/20 text-green-700 border-green-600/20 hover:bg-green-600/30">Verified Member</Badge>
              ) : (
                  <Badge variant="outline">Preview</Badge>
              )}
          </div>
        </div>
        {/* Right section */}
        <div className="w-[35%] bg-primary p-4 text-primary-foreground flex flex-col items-center justify-between text-center">
          <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-white/80 shadow-md">
            <AvatarImage src={photo || "https://placehold.co/150x150.png"} alt="User photo" data-ai-hint={photoHint || "person avatar"} />
            <AvatarFallback>{name?.substring(0, 2).toUpperCase() || 'SA'}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center">
            <div className="bg-white p-2 rounded-md">
                <QRCodeSVG
                    value={qrValue}
                    size={80}
                    className="h-16 w-16 sm:h-20 sm:w-20"
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                    includeMargin={false}
                />
            </div>
            <p className="text-[10px] mt-2 leading-tight">Scan for verification or login</p>
            <p className="text-[10px] font-semibold">Berlaku s/d: {ExpiryDate}</p>
          </div>
        </div>
      </div>
    </Card>
  )
});
MemberCard.displayName = "MemberCard";


const MemberCardBack = React.forwardRef<HTMLDivElement, { className?: string }>(({ className }, ref) => {
  return (
    <Card ref={ref} className={cn("overflow-hidden shadow-lg w-full max-w-xl mx-auto bg-white", className)}>
         <div className="flex h-full">
            <div className="w-[35%] bg-primary p-4 text-primary-foreground flex flex-col items-center justify-center text-center">
                <div className="w-40">
                     <Logo size="large" className="!h-auto" />
                </div>
            </div>
            <div className="w-[65%] bg-white p-4 sm:p-6 flex flex-col text-foreground">
                <h3 className="text-base font-bold tracking-wider text-black">PERATURAN & REGULASI</h3>
                <p className="text-xs text-muted-foreground mt-1">Serenity AgriExport Hub</p>
                <div className="mt-4 text-[10px] sm:text-xs space-y-2 text-muted-foreground flex-1">
                    <ol className="list-decimal list-inside space-y-1.5">
                        <li>Setiap transaksi wajib dilakukan melalui saluran resmi platform untuk keamanan dan validasi.</li>
                        <li>Anggota diwajibkan menjaga kerahasiaan detail transaksi dan negosiasi.</li>
                        <li>Kepatuhan terhadap hukum perdagangan lokal dan internasional adalah wajib.</li>
                        <li>Platform berhak menangguhkan akun yang terbukti melakukan aktivitas penipuan atau melanggar ketentuan.</li>
                        <li>Kartu keanggotaan ini bersifat pribadi dan tidak dapat dipindahtangankan.</li>
                        <li>Syarat dan ketentuan lengkap tersedia di situs web kami.</li>
                    </ol>
                </div>
                 <div className="mt-auto pt-2 text-xs text-center text-muted-foreground">
                    Kartu ini adalah milik Serenity AgriExport Hub.
                 </div>
            </div>
        </div>
    </Card>
  )
});
MemberCardBack.displayName = "MemberCardBack";


export default function MembershipCardPage() {
  const { toast } = useToast()
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  const handleDownload = () => {
    if (cardRef.current === null) {
      return
    }

    if(isFlipped) {
      toast({
        variant: "destructive",
        title: "Download Not Available",
        description: "Please flip to the front side of the card to download.",
      })
      return
    }

    toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `membership-card-${userRole}.png`
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
        toast({
          variant: "destructive",
          title: "Download Failed",
          description: "Could not generate card image. Please try again.",
        })
      })
  }

  const currentMemberData = userRole ? (membershipData[userRole as keyof typeof membershipData] || membershipData.default) : null;
  
  if (!currentMemberData) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Digital Membership Card</h1>
        <p className="text-muted-foreground">Your official, verified membership card for the Serenity AgriExport Hub.</p>
      </div>
       <div className="relative w-full max-w-xl mx-auto h-[280px] sm:h-[310px] [perspective:1000px]">
          <div 
              className={cn(
                  "relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]",
                  isFlipped && "[transform:rotateY(180deg)]"
              )}
          >
              <div ref={cardRef} className="absolute w-full h-full [backface-visibility:hidden]">
                  <MemberCard 
                      role={userRole || 'default'}
                      isVerified
                      photo={currentMemberData.photo}
                      photoHint={currentMemberData.photoHint}
                      name={currentMemberData.name}
                      idNumber={currentMemberData.id}
                      type={currentMemberData.type}
                      address={currentMemberData.address}
                      nib={currentMemberData.nib}
                      npwp={currentMemberData.npwp}
                      className="h-full"
                  />
              </div>
              <div className="absolute inset-0 h-full w-full [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <MemberCardBack className="h-full"/>
              </div>
          </div>
      </div>
      <Card className="max-w-xl mx-auto">
          <CardContent className="p-4 flex justify-center gap-4">
               <Button onClick={() => setIsFlipped(!isFlipped)}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {isFlipped ? "View Front" : "View Regulations"}
              </Button>
               <Button onClick={handleDownload} disabled={isFlipped}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Card
              </Button>
          </CardContent>
          <CardFooter className="pt-0 pb-4">
               <p className="text-xs text-muted-foreground text-center w-full">This card serves as proof of your verified status on the platform.</p>
          </CardFooter>
      </Card>
    </div>
  )
}
