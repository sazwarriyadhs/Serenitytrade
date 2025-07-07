'use server';
/**
 * @fileOverview An AI flow for recommending optimal packaging for agricultural products.
 *
 * - recommendPackaging - A function that provides packaging recommendations.
 * - RecommendPackagingInput - The input type for the recommendPackaging function.
 * - RecommendPackagingOutput - The return type for the recommendPackaging function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const RecommendPackagingInputSchema = z.object({
  commodityName: z.string().describe('The name of the agricultural commodity.'),
  unitWeightKg: z.coerce.number().positive().describe('The weight of a single unit or a small consumer package in kilograms.'),
  quantity: z.coerce.number().int().positive().describe('The total number of units to be packaged.'),
  productType: z.enum(['Fresh Fruit/Vegetable', 'Grains/Seeds', 'Powder', 'Liquid', 'Processed/Dried Goods']).describe('The physical nature of the product.'),
  fragility: z.enum(['Low', 'Medium', 'High']).describe('The fragility level of the product.'),
});
export type RecommendPackagingInput = z.infer<typeof RecommendPackagingInputSchema>;

export const RecommendPackagingOutputSchema = z.object({
  packagingType: z.string().describe("The type of primary packaging recommended (e.g., 'Cardboard Box', 'Jute Sack', 'Plastic Drum')."),
  primaryDimensionsCm: z.object({
    length: z.number(),
    width: z.number(),
    height: z.number(),
  }).describe("Recommended dimensions (L x W x H) in centimeters for a single primary package."),
  totalGrossWeightKg: z.number().describe("The total estimated gross weight in kilograms, including the product and all packaging materials."),
  totalVolumeM3: z.number().describe("The total estimated shipping volume in cubic meters."),
  recommendedMaterial: z.string().describe("Specific recommended packaging material (e.g., 'Double-walled corrugated cardboard', 'Food-grade polypropylene')."),
  handlingInstructions: z.array(z.string()).describe("A list of key handling, stacking, and storage instructions to ensure product safety."),
  summary: z.string().describe("A brief summary of the recommendation, explaining the choices made."),
});
export type RecommendPackagingOutput = z.infer<typeof RecommendPackagingOutputSchema>;

export async function recommendPackaging(input: RecommendPackagingInput): Promise<RecommendPackagingOutput> {
  return recommendPackagingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendPackagingPrompt',
  input: { schema: RecommendPackagingInputSchema },
  output: { schema: RecommendPackagingOutputSchema },
  prompt: `You are a world-class logistics and packaging expert specializing in international agricultural exports.
Your task is to provide an optimal packaging recommendation based on the product details provided.

Your recommendation must prioritize:
1.  **Product Protection:** Prevent spoilage, contamination, and physical damage during long-distance transit.
2.  **Cost-Effectiveness:** Balance material cost with protection.
3.  **Shipping Efficiency:** Optimize dimensions and weight for container or air freight palletization (calculating total volume and weight).

Analyze the following product information:
- Commodity: {{{commodityName}}}
- Weight per Unit: {{{unitWeightKg}}} kg
- Total Quantity: {{{quantity}}} units
- Product Type: {{{productType}}}
- Fragility: {{{fragility}}}

Based on this, generate a detailed packaging solution. For 'totalGrossWeightKg', estimate the weight of the packaging itself and add it to the total product weight ({{{unitWeightKg}}} * {{{quantity}}}). For 'totalVolumeM3', calculate based on the recommended primary package dimensions and quantity, considering how many units might fit in one primary package.
`,
});

const recommendPackagingFlow = ai.defineFlow(
  {
    name: 'recommendPackagingFlow',
    inputSchema: RecommendPackagingInputSchema,
    outputSchema: RecommendPackagingOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
        throw new Error("Failed to get a packaging recommendation from the AI model.");
    }
    return output;
  }
);
