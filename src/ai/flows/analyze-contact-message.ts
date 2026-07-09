'use server';
/**
 * @fileOverview A Genkit flow for analyzing contact form messages.
 *
 * - analyzeContactMessage - A function that handles the analysis of a contact form message.
 * - ContactMessageInput - The input type for the analyzeContactMessage function.
 * - ContactMessageOutput - The return type for the analyzeContactMessage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ContactMessageInputSchema = z.object({
  message: z.string().describe('The content of the contact form message.'),
});
export type ContactMessageInput = z.infer<typeof ContactMessageInputSchema>;

const ContactMessageOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the contact message.'),
  categories: z
    .array(z.string())
    .describe(
      "Suggested categories for the message, e.g., 'Job Inquiry', 'Collaboration Request', 'General Feedback', 'Recruitment', 'Partnership', 'Support', 'Other'."
    ),
});
export type ContactMessageOutput = z.infer<typeof ContactMessageOutputSchema>;

export async function analyzeContactMessage(
  input: ContactMessageInput
): Promise<ContactMessageOutput> {
  return analyzeContactMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeContactMessagePrompt',
  input: { schema: ContactMessageInputSchema },
  output: { schema: ContactMessageOutputSchema },
  prompt: `You are an AI assistant for Mohith's personal portfolio website.
Your task is to analyze an incoming contact form message, provide a concise summary, and suggest relevant categories for the message.

Here are the categories you should consider:
- 'Job Inquiry'
- 'Collaboration Request'
- 'General Feedback'
- 'Recruitment'
- 'Partnership'
- 'Support'
- 'Other'

Message: {{{message}}}

Provide the summary and categories in the specified JSON format.`,
});

const analyzeContactMessageFlow = ai.defineFlow(
  {
    name: 'analyzeContactMessageFlow',
    inputSchema: ContactMessageInputSchema,
    outputSchema: ContactMessageOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
