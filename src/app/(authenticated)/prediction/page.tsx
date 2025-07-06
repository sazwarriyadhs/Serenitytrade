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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { predictDemand, type PredictDemandOutput } from "@/ai/flows/predict-demand-flow"
import { Loader2, TrendingUp } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data, can be expanded
const countries = [
  { value: "USA", label: "United States" },
  { value: "European Union", label: "European Union" },
  { value: "China", label: "China" },
  { value: "Japan", label: "Japan" },
  { value: "South Korea", label: "South Korea" },
]

const commodities = [
  { value: "Organic Hass Avocado", label: "Organic Hass Avocado" },
  { value: "Arabica Coffee Beans", label: "Arabica Coffee Beans" },
  { value: "King Quinoa", label: "King Quinoa" },
  { value: "Sun-dried Tomatoes", label: "Sun-dried Tomatoes" },
]

export default function PredictionPage() {
  const [country, setCountry] = useState<string>("")
  const [commodity, setCommodity] = useState<string>("")
  const [prediction, setPrediction] = useState<PredictDemandOutput | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handlePredict = async () => {
    if (!country || !commodity) {
      setError("Please select a country and a commodity.")
      return
    }
    setError(null)
    setLoading(true)
    setPrediction(null)
    try {
      const result = await predictDemand({ country, commodity })
      setPrediction(result)
    } catch (e) {
      console.error(e)
      setError("Failed to get prediction. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Demand Prediction</h1>
        <p className="text-muted-foreground">
          Predict commodity demand in destination countries using AI.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prediction Parameters</CardTitle>
          <CardDescription>
            Select a destination country and a commodity to forecast demand.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="country">Destination Country</Label>
              <Select onValueChange={setCountry} value={country}>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="commodity">Commodity</Label>
              <Select onValueChange={setCommodity} value={commodity}>
                <SelectTrigger id="commodity">
                  <SelectValue placeholder="Select a commodity" />
                </SelectTrigger>
                <SelectContent>
                  {commodities.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handlePredict} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Predict Demand
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
             <p className="text-muted-foreground">Generating prediction...</p>
          </CardContent>
        </Card>
      )}

      {prediction && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary"/>
              Prediction for {prediction.commodity} in {prediction.country}
            </CardTitle>
            <CardDescription>
              AI-powered demand forecast for the next quarter.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <h3 className="font-semibold mb-2">Demand Forecast</h3>
              <p className="text-2xl font-bold text-primary">{prediction.predictedDemand.volume} <span className="text-lg font-normal text-muted-foreground">{prediction.predictedDemand.unit}</span></p>
              <p className="text-sm text-muted-foreground">Confidence: {prediction.confidenceLevel}</p>
            </div>
             <div>
              <h3 className="font-semibold mb-2">Summary</h3>
              <p className="text-sm text-muted-foreground">{prediction.summary}</p>
            </div>
             <div>
              <h3 className="font-semibold mb-2">Key Factors</h3>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                {prediction.keyFactors.map((factor, index) => (
                  <li key={index}>{factor}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Recommended Actions</h3>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                 {prediction.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
