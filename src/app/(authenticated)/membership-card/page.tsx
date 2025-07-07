
'use client'

import { useState, useEffect, useRef } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Image from "next/image"
import { toPng } from 'html-to-image'
import { QRCodeSVG } from 'qrcode.react'

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Upload, Download } from "lucide-react"
import { useToast } from '@/hooks/use-toast'
import { Logo } from '@/components/logo'

const membershipFormSchema = z.object({
  membershipType: z.enum(['individual', 'company'], { required_error: "Please select a membership type." }),
  idNumber: z.string().min(8, "ID Number must be at least 8 characters."),
  name: z.string().min(3, "Name must be at least 3 characters."),
  address: z.string().min(10, "Address is required."),
  nib: z.string().optional(),
  taxNumber: z.string().min(10, "Tax number is required."),
  photo: z.any()
    .refine((files) => files?.length === 1, "Photo is required.")
    .refine((files) => files?.[0]?.size <= 2000000, "Max file size is 2MB.")
    .refine(
      (files) => ["image/jpeg", "image/png", "image/webp"].includes(files?.[0]?.type),
      ".jpg, .png and .webp files are accepted."
    ),
}).refine(data => data.membershipType === 'individual' || (data.membershipType === 'company' && data.nib && data.nib.length > 0), {
  message: "NIB is required for company membership.",
  path: ["nib"],
});

type MembershipFormValues = z.infer<typeof membershipFormSchema>

const ExpiryDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

const roleDisplayNames = {
    farmer: "PETANI",
    exporter: "EKSPORTIR / BUYER",
    buyer: "EKSPORTIR / BUYER",
    admin: "ADMIN",
};

const MemberCard = React.forwardRef<HTMLDivElement, {
  role?: keyof typeof roleDisplayNames;
  isVerified?: boolean;
  photo?: string | null;
  name: string;
  idNumber: string;
  type: string;
  address: string;
  nib?: string;
  npwp: string;
}>(({
  role = 'exporter',
  isVerified = false,
  photo,
  name,
  idNumber,
  type,
  address,
  nib,
  npwp,
}, ref) => {
  const qrValue = JSON.stringify({ id: idNumber, role, name });

  return (
    <Card ref={ref} className="overflow-hidden shadow-lg w-full max-w-xl mx-auto bg-white">
      <div className="flex">
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
            <AvatarImage src={photo || "https://placehold.co/150x150.png"} alt="User photo" data-ai-hint={role === 'farmer' ? "person farmer" : "person avatar"} />
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


export default function MembershipCardPage() {
  const { toast } = useToast()
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const form = useForm<MembershipFormValues>({
    resolver: zodResolver(membershipFormSchema),
    defaultValues: {
      membershipType: 'individual',
      idNumber: "",
      name: "",
      address: "",
      nib: "",
      taxNumber: "",
    },
  })

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  const membershipType = form.watch('membershipType')

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDownload = () => {
    if (cardRef.current === null) {
      return
    }

    toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'membership-card.png'
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

  function onSubmit(data: MembershipFormValues) {
    console.log(data)
    toast({
      title: "Registration Submitted",
      description: "Your membership card application is under review. You will be notified within 3 business days.",
    })
    form.reset()
    setPhotoPreview(null)
  }

  const getCost = () => {
    const cost = membershipType === 'individual' ? 25000 : 50000
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(cost)
  }

  if (userRole === 'farmer') {
    return (
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Farmer Membership Status</h1>
          <p className="text-muted-foreground">Your verified membership details.</p>
        </div>
        <MemberCard 
            ref={cardRef}
            role="farmer"
            isVerified
            photo="https://placehold.co/150x150.png"
            name="Sunrise Farms"
            idNumber="FARM-2025-00005"
            type="Petani Terverifikasi"
            address="Desa Makmur, Kec. Sejahtera, Kab. Subur, Indonesia"
            npwp="01.234.567.8-910.000"
        />
        <Card className="max-w-xl mx-auto">
            <CardContent className="p-4 flex justify-center">
                 <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Card
                </Button>
            </CardContent>
            <CardFooter className="pt-0 pb-4">
                 <p className="text-xs text-muted-foreground text-center w-full">Membership is free for all verified farmers to support and empower local agriculture.</p>
            </CardFooter>
        </Card>
      </div>
    );
  }

  if (userRole === null) {
      return null; // Or a loading skeleton
  }

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Membership Card Registration</h1>
        <p className="text-muted-foreground">Register to get your official AgriExport Hub membership card.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3">
           <Card>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                  <CardTitle>Registration Details</CardTitle>
                  <CardDescription>
                    Please fill out the form below. Ensure all data is accurate and corresponds to your country's official documents.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="membershipType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Membership Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="individual" />
                              </FormControl>
                              <FormLabel className="font-normal">Individual</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="company" />
                              </FormControl>
                              <FormLabel className="font-normal">Company / Enterprise</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{membershipType === 'individual' ? 'Full Name' : 'Company Name'}</FormLabel>
                          <FormControl>
                            <Input placeholder={membershipType === 'individual' ? 'e.g., John Doe' : 'e.g., Green Valley Exports'} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="idNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID Number (No. Induk)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your national ID or registration number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your full registered address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    {membershipType === 'company' && (
                      <FormField
                        control={form.control}
                        name="nib"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NIB (Business Identification No.)</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter company NIB" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormField
                      control={form.control}
                      name="taxNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tax Number (NPWP)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your tax identification number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Photo</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20 border">
                                <AvatarImage src={photoPreview || undefined} alt="Photo Preview" />
                                <AvatarFallback><Upload className="h-8 w-8 text-muted-foreground" /></AvatarFallback>
                            </Avatar>
                            <Input
                                type="file"
                                accept="image/png, image/jpeg, image/webp"
                                onChange={(e) => {
                                    field.onChange(e.target.files);
                                    handlePhotoChange(e);
                                }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex-col items-start gap-4">
                    <div className="w-full p-4 rounded-lg bg-secondary/50 border">
                        <h4 className="font-semibold">Registration Fee: {getCost()}</h4>
                        <p className="text-sm text-muted-foreground">
                            1 year validity. Review and approval within 3 working days.
                        </p>
                    </div>
                  <Button type="submit">Submit for Review</Button>
                </CardFooter>
              </form>
            </Form>
           </Card>
        </div>
        <div className="lg:col-span-2">
            <div className="sticky top-20">
                <MemberCard 
                    ref={cardRef}
                    role={userRole as keyof typeof roleDisplayNames}
                    isVerified={false}
                    photo={photoPreview}
                    name={form.watch('name') || 'Nama Anda / Perusahaan'}
                    idNumber={form.watch('idNumber') || 'SER-EXP-2025-00123'}
                    type={form.watch('membershipType') === 'company' ? 'Perusahaan' : 'Perorangan'}
                    address={form.watch('address') || 'Alamat lengkap Anda akan muncul di sini.'}
                    nib={membershipType === 'company' ? form.watch('nib') || '9123456789123' : undefined}
                    npwp={form.watch('taxNumber') || '01.234.567.8-910.000'}
                />
            </div>
        </div>
      </div>
    </div>
  )
}
