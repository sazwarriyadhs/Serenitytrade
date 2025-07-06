import Image from "next/image"
import { PlusCircle, MoreHorizontal, File } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const commodities = [
  {
    name: "Organic Hass Avocado",
    description: "Creamy, nutrient-rich avocados from certified organic farms.",
    price: 2.50,
    stock: 1500,
    origin: "Mexico",
    certifications: ["USDA Organic", "Fair Trade"],
    image: "https://placehold.co/600x400.png",
    imageHint: "avocado fruit",
    status: "active"
  },
  {
    name: "Arabica Coffee Beans",
    description: "High-altitude grown, medium roast with notes of chocolate and citrus.",
    price: 15.00,
    stock: 800,
    origin: "Colombia",
    certifications: ["Rainforest Alliance"],
    image: "https://placehold.co/600x400.png",
    imageHint: "coffee beans",
    status: "active"
  },
  {
    name: "King Quinoa",
    description: "Versatile and protein-packed quinoa, pre-washed and ready to cook.",
    price: 8.75,
    stock: 2200,
    origin: "Peru",
    certifications: ["Non-GMO Project"],
    image: "https://placehold.co/600x400.png",
    imageHint: "quinoa seeds",
    status: "archived"
  },
    {
    name: "Sun-dried Tomatoes",
    description: "Rich, intense flavor. Perfect for pastas, salads, and sauces.",
    price: 12.20,
    stock: 650,
    origin: "Italy",
    certifications: [],
    image: "https://placehold.co/600x400.png",
    imageHint: "dried tomatoes",
    status: "active"
  },
];

export default function CommoditiesPage() {
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Commodity
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {commodities.map((item) => (
             <Card key={item.name}>
              <CardHeader className="relative">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        className="absolute top-4 right-4 h-6 w-6"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                <div className="relative h-40 w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="rounded-md object-cover"
                    data-ai-hint={item.imageHint}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-headline">{item.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.certifications.map(cert => (
                    <Badge key={cert} variant="secondary">{cert}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-sm">
                <div className="font-semibold">${item.price.toFixed(2)}/kg</div>
                <div className="text-muted-foreground">{item.stock} kg in stock</div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="active">
         <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {commodities.filter(c => c.status === 'active').map((item) => (
             <Card key={item.name}>
              <CardHeader className="relative">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        className="absolute top-4 right-4 h-6 w-6"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                <div className="relative h-40 w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="rounded-md object-cover"
                    data-ai-hint={item.imageHint}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-headline">{item.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                 <div className="mt-4 flex flex-wrap gap-2">
                  {item.certifications.map(cert => (
                    <Badge key={cert} variant="secondary">{cert}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-sm">
                <div className="font-semibold">${item.price.toFixed(2)}/kg</div>
                <div className="text-muted-foreground">{item.stock} kg in stock</div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
