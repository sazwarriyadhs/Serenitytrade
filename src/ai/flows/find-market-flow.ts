'use server';
/**
 * @fileOverview An AI flow for finding potential export markets for a given commodity.
 *
 * - findMarket - A function that suggests potential export markets.
 * - FindMarketInput - The input type for the findMarket function.
 * - FindMarketOutput - The return type for the findMarket function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const FindMarketInputSchema = z.object({
  commodityName: z.string().describe('The name of the agricultural commodity.'),
  description: z.string().describe('A brief description of the commodity, including its unique qualities or certifications.'),
});
type FindMarketInput = z.infer<typeof FindMarketInputSchema>;

const PotentialMarketSchema = z.object({
    country: z.string().describe("The suggested destination country."),
    rationale: z.string().describe("The reasoning behind why this country is a good potential market."),
    potentialDemand: z.string().describe("An estimate of the demand level (e.g., High, Medium, Low)."),
    keyConsiderations: z.array(z.string()).describe("A list of key considerations or challenges for exporting to this country."),
});

const FindMarketOutputSchema = z.object({
  commodityName: z.string().describe("The name of the commodity analyzed."),
  summary: z.string().describe("A brief overall summary of the market potential for this commodity."),
  potentialMarkets: z.array(PotentialMarketSchema).describe('A list of top 3-5 potential export markets.'),
});
type FindMarketOutput = z.infer<typeof FindMarketOutputSchema>;

export async function findMarket(input: FindMarketInput): Promise<FindMarketOutput> {
  return findMarketFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findMarketPrompt',
  input: { schema: FindMarketInputSchema },
  output: { schema: FindMarketOutputSchema },
  prompt: `You are an expert international trade analyst specializing in agricultural exports.
Your task is to identify and analyze the top 3-5 potential export markets for a new or existing agricultural commodity.

Use the provided commodity information to perform your analysis. Consider factors such as:
- Existing import data for similar products in various countries.
- Consumer trends and preferences.
- Potential trade agreements or barriers.
- Economic indicators.

For each suggested market, provide a clear rationale, an estimate of demand, and key considerations for an exporter.

Commodity Name: {{{commodityName}}}
Description: {{{description}}}
`,
});

const findMarketFlow = ai.defineFlow(
  {
    name: 'findMarketFlow',
    inputSchema: FindMarketInputSchema,
    outputSchema: FindMarketOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
        throw new Error("Failed to get a market analysis from the AI model.");
    }
    return output;
  }
);
