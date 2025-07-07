'use server';
/**
 * @fileOverview A flow for predicting commodity demand.
 *
 * - predictDemand - A function that handles the commodity demand prediction.
 * - PredictDemandInput - The input type for the predictDemand function.
 * - PredictDemandOutput - The return type for the predictDemand function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const PredictDemandInputSchema = z.object({
  country: z.string().describe('The destination country for the commodity.'),
  commodity: z.string().describe('The commodity to predict demand for.'),
});
type PredictDemandInput = z.infer<typeof PredictDemandInputSchema>;

const PredictDemandOutputSchema = z.object({
  country: z.string().describe('The destination country.'),
  commodity: z.string().describe('The commodity.'),
  predictedDemand: z.object({
      volume: z.string().describe('The predicted demand volume, as a formatted string (e.g., "10,000 - 12,000").'),
      unit: z.string().describe('The unit of measurement for the volume (e.g., "metric tons").'),
  }),
  confidenceLevel: z.string().describe('The confidence level of the prediction (e.g., "High", "Medium", "Low").'),
  summary: z.string().describe('A brief summary of the demand prediction for the next quarter.'),
  keyFactors: z.array(z.string()).describe('A list of key factors influencing the demand.'),
  recommendations: z.array(z.string()).describe('A list of recommended actions for exporters.'),
});
type PredictDemandOutput = z.infer<typeof PredictDemandOutputSchema>;

export async function predictDemand(input: PredictDemandInput): Promise<PredictDemandOutput> {
  return predictDemandFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictDemandPrompt',
  input: { schema: PredictDemandInputSchema },
  output: { schema: PredictDemandOutputSchema },
  prompt: `You are an expert market analyst specializing in international agricultural commodity trading.
Your task is to predict the demand for a specific commodity in a given country for the next business quarter.

Analyze market trends, economic indicators, historical data, seasonal variations, and any relevant geopolitical factors to generate your prediction.

Provide a detailed forecast including the predicted volume, your confidence in this prediction, a summary, key influencing factors, and actionable recommendations for exporters.

Commodity: {{{commodity}}}
Destination Country: {{{country}}}
`,
});

const predictDemandFlow = ai.defineFlow(
  {
    name: 'predictDemandFlow',
    inputSchema: PredictDemandInputSchema,
    outputSchema: PredictDemandOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
        throw new Error("Failed to get a prediction from the AI model.");
    }
    return output;
  }
);
