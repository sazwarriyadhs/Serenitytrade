
'use client'

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Image from "next/image"

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
import { QrCode, Upload } from "lucide-react"
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

export default function MembershipCardPage() {
  const { toast } = useToast()
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  
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

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Membership Card Registration</h1>
        <p className="text-muted-foreground">Register to get your official AgriExport Hub membership card.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
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
        <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <Logo className="h-8" />
                  <div className="text-right">
                    <Badge variant="outline">Preview</Badge>
                    <p className="text-xs text-muted-foreground mt-2">
                      {membershipType === 'individual' ? 'Individual Member' : 'Company Member'}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 shadow">
                    <AvatarImage src={photoPreview || "https://placehold.co/100x100.png"} alt="User Photo" data-ai-hint="person avatar" />
                    <AvatarFallback>
                      {form.watch('name')?.substring(0, 2).toUpperCase() || 'SA'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-bold text-lg truncate">{form.watch('name') || 'Your Name / Company'}</p>
                    <p className="text-sm text-muted-foreground truncate">ID: {form.watch('idNumber') || '123456789'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {membershipType === 'company' && (
                        <div>
                            <Label className="text-xs text-muted-foreground">NIB</Label>
                            <p className="font-mono text-sm truncate">{form.watch('nib') || '987654321'}</p>
                        </div>
                    )}
                    <div>
                        <Label className="text-xs text-muted-foreground">Tax ID</Label>
                        <p className="font-mono text-sm truncate">{form.watch('taxNumber') || '1122334455'}</p>
                    </div>
                </div>
                <div>
                    <Label className="text-xs text-muted-foreground">Address</Label>
                    <p className="text-sm line-clamp-2">{form.watch('address') || 'Your full registered address will appear here.'}</p>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t">
                    <div>
                        <p className="text-xs text-muted-foreground">Expires:</p>
                        <p className="text-sm font-medium">{new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}</p>
                    </div>
                    <div className="text-center">
                        <Image src="https://placehold.co/80x80.png" alt="QR Code" width={80} height={80} data-ai-hint="qr code" />
                    </div>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
