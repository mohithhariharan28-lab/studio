'use server';

import { prioritizeProjects, PrioritizeProjectsInput, PrioritizeProjectsOutput } from '@/ai/flows/prioritize-projects-based-on-relevance';
import { z } from 'zod';

export async function getPrioritizedProjects(input: PrioritizeProjectsInput): Promise<{ success: boolean; data?: PrioritizeProjectsOutput; error?: string; }> {
  try {
    // The AI flow can sometimes be slow, so we'll add a timeout.
    const output = await Promise.race([
        prioritizeProjects(input),
        new Promise<PrioritizeProjectsOutput>((_, reject) => setTimeout(() => reject(new Error('Request timed out')), 15000))
    ]);
    return { success: true, data: output };
  } catch (error) {
    console.error("Error prioritizing projects:", error);
    if (error instanceof z.ZodError) {
        return { success: false, error: 'Invalid input provided.' };
    }
    if (error instanceof Error && error.message === 'Request timed out') {
        return { success: false, error: 'The AI service took too long to respond. Please try again later.' };
    }
    return { success: false, error: 'Failed to prioritize projects due to an AI service error.' };
  }
}
