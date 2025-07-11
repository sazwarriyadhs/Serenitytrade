
'use client'

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, Tractor, Briefcase, Globe, Handshake, ShieldCheck, Beef, Fish, Sprout, TreeDeciduous } from "lucide-react"

const roles = [
  {
    icon: Tractor,
    name: "Producer (Farmer, Fisherman, etc.)",
    description: "Produces and harvests high-quality agricultural, fishery, or forestry commodities. For international sales, producers can partner with top-rated exporters recommended by the platform admin based on performance.",
    responsibilities: [
      "Crop cultivation, harvesting, or production of goods",
      "Initial quality control",
      "Can partner with admin-recommended exporters for international sales",
      "Hanya dapat bekerja sama dengan 1 eksportir.",
    ]
  },
  {
    icon: Briefcase,
    name: "Exporter (Seller)",
    description: "Aggregates products from producers, manages export processes, and sells to international buyers.",
     responsibilities: [
      "Manages export documents (PEB, COO)",
      "Handles logistics and shipping",
      "Negotiates with buyers",
      "Can partner with producers to facilitate their international sales",
      "Dapat bekerja sama dengan maksimal 10 produsen yang berbeda untuk menjaga fokus dan kualitas layanan.",
    ]
  },
  {
    icon: Globe,
    name: "Overseas Buyer",
    description: "Imports commodities for distribution or processing in their home country.",
     responsibilities: [
      "Issues purchase orders",
      "Manages import customs clearance",
      "Makes payments for goods"
    ]
  }
];

const platformRoles = [
    {
        icon: Handshake,
        title: "Facilitator",
        description: "Connects all parties in a secure and transparent B2B environment. For producers, the platform facilitates international transactions by recommending top-rated exporters based on performance and rating to assist with logistics and documentation. Kemitraan hanya berlaku untuk eksportir dan produsen yang terverifikasi oleh Serenity AgriExport Hub."
    },
    {
        icon: ShieldCheck,
        title: "Service Provider & Validator",
        description: "Offers value-added services like secure payments (Escrow, L/C), and logistics tracking. All transaction agreements are validated by the admin to ensure compliance with regulations in the Republic of Indonesia. Kemitraan akan berakhir setelah 1 tahun atau dapat diakhiri lebih awal berdasarkan kesepakatan kedua belah pihak yang disetujui oleh admin."
    }
]

const producerTypes = [
  {
    icon: Tractor,
    name: "Petani (Farmer)",
    description: "Cultivating food crops like rice, corn, and vegetables.",
  },
  {
    icon: Beef,
    name: "Peternak (Livestock Farmer)",
    description: "Raising livestock for meat, dairy, and other animal products.",
  },
  {
    icon: Fish,
    name: "Nelayan (Fisherman)",
    description: "Harvesting fish and other seafood from marine and freshwater sources.",
  },
  {
    icon: Sprout,
    name: "Pengelola Kebun / Peladang",
    description: "Managing plantations for commodities like coffee, palm oil, and cocoa.",
  },
  {
    icon: TreeDeciduous,
    name: "Pengelola Hasil Hutan",
    description: "Sustainably managing and harvesting timber and non-timber forest products.",
  },
]

export default function ValueChainPage() {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Export Commodity Value Chain</h1>
        <p className="text-muted-foreground">
          Understanding the roles of Producer, Exporter, and Buyer in our marketplace model.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Key Participants in the Chain</CardTitle>
          <CardDescription>
            The journey of a commodity from farm to global market involves three key participants.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-around gap-4 text-center">
            {roles.map((role, index) => (
              <React.Fragment key={role.name}>
                <div className="flex-1 max-w-sm">
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex justify-center mb-4">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                          <role.icon className="w-8 h-8" />
                        </div>
                      </div>
                      <CardTitle className="font-headline text-xl">{role.name}</CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h4 className="font-semibold mb-2 text-left">Key Responsibilities:</h4>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground text-left space-y-1">
                            {role.responsibilities.map(resp => <li key={resp}>{resp}</li>)}
                        </ul>
                    </CardContent>
                  </Card>
                </div>
                {index < roles.length - 1 && (
                  <div className="my-4 md:my-0">
                    <ArrowRight className="w-8 h-8 text-muted-foreground rotate-90 md:rotate-0" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>The Role of Serenity AgriExport Hub</CardTitle>
          <CardDescription>
            Our platform acts as a digital intermediary and service provider to ensure smooth and secure transactions.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
           {platformRoles.map(role => (
             <div key={role.title} className="flex items-start gap-4 p-4 rounded-lg border bg-secondary/50">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
                    <role.icon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold font-headline">{role.title}</h3>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
            </div>
           ))}
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Types of Producers on Our Platform</CardTitle>
          <CardDescription>
            We connect a diverse range of producers to the global market.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {producerTypes.map(type => (
             <div key={type.name} className="flex items-start gap-4 p-4 rounded-lg border bg-secondary/50">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary shrink-0">
                    <type.icon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold font-headline">{type.name}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
            </div>
           ))}
        </CardContent>
      </Card>

    </div>
  )
}
