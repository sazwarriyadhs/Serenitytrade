
'use client'

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, Tractor, Briefcase, Globe, Handshake, ShieldCheck } from "lucide-react"

const roles = [
  {
    icon: Tractor,
    name: "Farmer",
    description: "Produces and harvests high-quality agricultural commodities.",
    responsibilities: [
      "Crop cultivation & harvesting",
      "Initial quality control",
      "Partnership with exporters"
    ]
  },
  {
    icon: Briefcase,
    name: "Exporter (Seller)",
    description: "Aggregates products from farmers, manages export processes, and sells to international buyers.",
     responsibilities: [
      "Manages export documents (PEB, COO)",
      "Handles logistics and shipping",
      "Negotiates with buyers"
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
        description: "Connects all parties in a secure and transparent B2B environment."
    },
    {
        icon: ShieldCheck,
        title: "Service Provider & Validator",
        description: "Offers value-added services like secure payments (Escrow, L/C), and logistics tracking. All transaction agreements are validated by the admin to ensure compliance with regulations in the Republic of Indonesia."
    }
]

export default function ValueChainPage() {
  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Export Commodity Value Chain</h1>
        <p className="text-muted-foreground">
          Understanding the roles of Farmer, Exporter, and Buyer in our marketplace model.
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
    </div>
  )
}
