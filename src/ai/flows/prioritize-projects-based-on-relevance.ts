'use server';
/**
 * @fileOverview This file defines a Genkit flow to prioritize projects based on relevance.
 *
 * The flow takes a list of projects and a user description as input, and returns a prioritized list of projects.
 * It uses a tool to determine the relevance of each project to the user description.
 *
 * @interface PrioritizeProjectsInput - The input type for the prioritizeProjects function.
 * @interface PrioritizeProjectsOutput - The output type for the prioritizeProjects function.
 * @function prioritizeProjects - A function that handles the project prioritization process.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  githubLink: z.string().url().optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

const PrioritizeProjectsInputSchema = z.object({
  projects: z.array(ProjectSchema).describe('An array of projects to prioritize.'),
  userDescription: z
    .string()
    .describe(
      'A description of the user, their interests, and what they are looking for.'
    ),
});
export type PrioritizeProjectsInput = z.infer<typeof PrioritizeProjectsInputSchema>;

const PrioritizeProjectsOutputSchema = z.array(ProjectSchema);
export type PrioritizeProjectsOutput = z.infer<typeof PrioritizeProjectsOutputSchema>;

export async function prioritizeProjects(
  input: PrioritizeProjectsInput
): Promise<PrioritizeProjectsOutput> {
  return prioritizeProjectsFlow(input);
}

const assessProjectRelevance = ai.defineTool({
  name: 'assessProjectRelevance',
  description:
    'Determines the relevance of a project to a user based on the project description and user description.',
  inputSchema: z.object({
    project: ProjectSchema,
    userDescription: z.string(),
  }),
  outputSchema: z.number().describe('A number between 0 and 1 indicating relevance. Higher is more relevant.'),
},
async (input) => {
    // Placeholder implementation - replace with actual relevance assessment logic
    // This dummy implementation always returns 0.5
    return 0.5;
});

const prioritizeProjectsPrompt = ai.definePrompt({
  name: 'prioritizeProjectsPrompt',
  input: {schema: PrioritizeProjectsInputSchema},
  output: {schema: PrioritizeProjectsOutputSchema},
  tools: [assessProjectRelevance],
  prompt: `Given the following user description: {{{userDescription}}}, and the following list of projects: {{#each projects}}{{{this.title}}}: {{{this.description}}} {{/each}}, prioritize the projects based on their relevance to the user description. Use the assessProjectRelevance tool to determine the relevance of each project. Return the projects in order of relevance, with the most relevant projects first.`,
});

const prioritizeProjectsFlow = ai.defineFlow(
  {
    name: 'prioritizeProjectsFlow',
    inputSchema: PrioritizeProjectsInputSchema,
    outputSchema: PrioritizeProjectsOutputSchema,
  },
  async input => {
    const {output} = await prioritizeProjectsPrompt(input);
    return output!;
  }
);
