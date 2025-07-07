'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { recommendPackaging, type RecommendPackagingOutput } from "@/ai/flows/recommend-packaging-flow"
import { Loader2, Box, Weight, Ruler, Scaling, AlertTriangle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

const RecommendPackagingInputSchema = z.object({
  commodityName: z.string().min(1, { message: "Commodity name is required." }),
  unitWeightKg: z.coerce.number().positive({ message: "Unit weight must be a positive number." }),
  quantity: z.coerce.number().int().positive({ message: "Quantity must be a positive integer." }),
  productType: z.enum(['Fresh Fruit/Vegetable', 'Grains/Seeds', 'Powder', 'Liquid', 'Processed/Dried Goods'], {
    required_error: "Please select a product type.",
  }),
  fragility: z.enum(['Low', 'Medium', 'High'], {
    required_error: "Please select a fragility level.",
  }),
});

type PackagingFormValues = z.infer<typeof RecommendPackagingInputSchema>

export default function PackagingRecommenderPage() {
  const [recommendation, setRecommendation] = useState<RecommendPackagingOutput | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<PackagingFormValues>({
    resolver: zodResolver(RecommendPackagingInputSchema),
    defaultValues: {
      commodityName: "",
      unitWeightKg: 1,
      quantity: 100,
    },
  })

  async function onSubmit(data: PackagingFormValues) {
    setError(null)
    setLoading(true)
    setRecommendation(null)
    try {
      const result = await recommendPackaging(data)
      setRecommendation(result)
    } catch (e) {
      console.error(e)
      setError("Failed to get packaging recommendation. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Packaging Recommender</h1>
        <p className="text-muted-foreground">
          Get AI-powered recommendations for optimal export packaging.
        </p>
      </div>

      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>
                Provide details about your product to generate a packaging solution.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="commodityName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Commodity Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Green Coffee Beans" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select product type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Fresh Fruit/Vegetable">Fresh Fruit/Vegetable</SelectItem>
                          <SelectItem value="Grains/Seeds">Grains/Seeds</SelectItem>
                          <SelectItem value="Powder">Powder</SelectItem>
                          <SelectItem value="Liquid">Liquid</SelectItem>
                          <SelectItem value="Processed/Dried Goods">Processed/Dried Goods</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="unitWeightKg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity (units)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fragility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fragility</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select fragility level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Low">Low (e.g., Grains, Beans)</SelectItem>
                          <SelectItem value="Medium">Medium (e.g., Apples, Oranges)</SelectItem>
                          <SelectItem value="High">High (e.g., Berries, Eggs)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get Recommendation
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading && (
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Calculating optimal packaging... This may take a moment.</p>
          </CardContent>
        </Card>
      )}

      {recommendation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Box className="h-6 w-6 text-primary"/>
              Packaging Recommendation
            </CardTitle>
            <CardDescription>
              {recommendation.summary}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <Card className="p-4">
                    <CardHeader className="p-2">
                        <Weight className="mx-auto h-8 w-8 text-muted-foreground" />
                        <CardTitle className="text-lg mt-2">Total Gross Weight</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                        <p className="text-2xl font-bold">{recommendation.totalGrossWeightKg.toFixed(2)} kg</p>
                    </CardContent>
                </Card>
                 <Card className="p-4">
                    <CardHeader className="p-2">
                        <Scaling className="mx-auto h-8 w-8 text-muted-foreground" />
                        <CardTitle className="text-lg mt-2">Total Volume</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                        <p className="text-2xl font-bold">{recommendation.totalVolumeM3.toFixed(3)} m³</p>
                    </CardContent>
                </Card>
                <Card className="p-4">
                    <CardHeader className="p-2">
                        <Box className="mx-auto h-8 w-8 text-muted-foreground" />
                        <CardTitle className="text-lg mt-2">Package Type</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                        <p className="text-xl font-semibold">{recommendation.packagingType}</p>
                    </CardContent>
                </Card>
                <Card className="p-4">
                    <CardHeader className="p-2">
                        <Ruler className="mx-auto h-8 w-8 text-muted-foreground" />
                        <CardTitle className="text-lg mt-2">Dimensions (cm)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                        <p className="text-xl font-semibold">{recommendation.primaryDimensionsCm.length} x {recommendation.primaryDimensionsCm.width} x {recommendation.primaryDimensionsCm.height}</p>
                    </CardContent>
                </Card>
            </div>
            
            <Separator />

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2"><Info className="h-5 w-5" />Recommended Material</h4>
                    <p className="text-muted-foreground">{recommendation.recommendedMaterial}</p>
                </div>
                 <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2"><AlertTriangle className="h-5 w-5" />Handling Instructions</h4>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                        {recommendation.handlingInstructions.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
