'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { findMarket, type FindMarketOutput } from "@/ai/flows/find-market-flow"
import { Loader2, Compass, MapPin, BarChart, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export default function FindMarketPage() {
  const [commodityName, setCommodityName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [analysis, setAnalysis] = useState<FindMarketOutput | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleFindMarket = async () => {
    if (!commodityName) {
      setError("Please enter a commodity name.")
      return
    }
    setError(null)
    setLoading(true)
    setAnalysis(null)
    try {
      const result = await findMarket({ commodityName, description })
      setAnalysis(result)
    } catch (e) {
      console.error(e)
      setError("Failed to get market analysis. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Find New Markets</h1>
        <p className="text-muted-foreground">
          Use AI to discover potential export markets for your agricultural products.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commodity Details</CardTitle>
          <CardDescription>
            Provide details about your commodity to get a market analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="commodity-name">Commodity Name</Label>
            <Input 
              id="commodity-name" 
              placeholder="e.g., Organic Dragon Fruit" 
              value={commodityName}
              onChange={(e) => setCommodityName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe your product's unique qualities, certifications (e.g., Organic, Fair Trade), or variety."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
             <p className="text-xs text-muted-foreground">
              More detail helps generate a more accurate analysis.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleFindMarket} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Find Markets
          </Button>
        </CardFooter>
      </Card>
      
      {error && (
         <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading && (
        <Card>
          <CardContent className="p-6 flex items-center justify-center">
            <Loader2 className="mr-2 h-8 w-8 animate-spin text-primary" />
             <p className="text-muted-foreground">Analyzing global markets...</p>
          </CardContent>
        </Card>
      )}

      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Compass className="h-6 w-6 text-primary"/>
              Market Analysis for {analysis.commodityName}
            </CardTitle>
            <CardDescription>
              {analysis.summary}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <h3 className="font-semibold text-lg">Top Potential Markets</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysis.potentialMarkets.map((market, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <MapPin className="h-5 w-5" />
                            {market.country}
                        </CardTitle>
                        <div className="flex items-center gap-2 pt-1">
                             <BarChart className="h-4 w-4 text-muted-foreground" />
                             <span className="text-sm font-medium">Potential Demand:</span>
                             <Badge>{market.potentialDemand}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h4 className="font-semibold mb-1">Rationale</h4>
                            <p className="text-sm text-muted-foreground">{market.rationale}</p>
                        </div>
                         <div>
                            <h4 className="font-semibold mb-1 flex items-center gap-2"><AlertTriangle className="h-4 w-4" />Key Considerations</h4>
                            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                                {market.keyConsiderations.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
