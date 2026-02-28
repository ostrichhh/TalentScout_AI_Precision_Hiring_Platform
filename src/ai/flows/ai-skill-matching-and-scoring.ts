'use server';
/**
 * @fileOverview A Genkit flow for comparing candidate skills and experience against a job description.
 *
 * - matchAndScoreSkills - A function that handles the skill matching and scoring process.
 * - ResumeJobMatchInput - The input type for the matchAndScoreSkills function.
 * - ResumeJobMatchOutput - The return type for the matchAndScoreSkills function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeJobMatchInputSchema = z.object({
  resumeText: z.string().describe('The full text content extracted from the candidate\'s resume.'),
  jobDescription: z.string().describe('The full text content of the job description.'),
});
export type ResumeJobMatchInput = z.infer<typeof ResumeJobMatchInputSchema>;

const ResumeJobMatchOutputSchema = z.object({
  skillMatchScore: z
    .number()
    .min(0)
    .max(100)
    .describe('A score between 0 and 100 representing how well the candidate\'s skills match the job requirements.'),
  experienceMatchScore: z
    .number()
    .min(0)
    .max(100)
    .describe('A score between 0 and 100 representing how well the candidate\'s experience matches the job requirements.'),
  overallFitScore: z
    .number()
    .min(0)
    .max(100)
    .describe('An overall score between 0 and 100 representing the candidate\'s total fit for the role.'),
  feedback: z.string().describe('A brief textual summary of the match, highlighting strengths and potential gaps.'),
});
export type ResumeJobMatchOutput = z.infer<typeof ResumeJobMatchOutputSchema>;

export async function matchAndScoreSkills(input: ResumeJobMatchInput): Promise<ResumeJobMatchOutput> {
  return resumeJobMatchFlow(input);
}

const resumeJobMatchPrompt = ai.definePrompt({
  name: 'resumeJobMatchPrompt',
  input: {schema: ResumeJobMatchInputSchema},
  output: {schema: ResumeJobMatchOutputSchema},
  prompt: `You are an expert HR recruitment specialist. Your task is to analyze a candidate's resume and a job description,
  then provide a relevance score for skills and experience, and an overall fit score. Also, provide brief feedback on the match.
  The scores should be between 0 and 100, where 100 is a perfect match.

  Resume:
  {{{resumeText}}}

  Job Description:
  {{{jobDescription}}}`,
});

const resumeJobMatchFlow = ai.defineFlow(
  {
    name: 'resumeJobMatchFlow',
    inputSchema: ResumeJobMatchInputSchema,
    outputSchema: ResumeJobMatchOutputSchema,
  },
  async input => {
    const {output} = await resumeJobMatchPrompt(input);
    return output!;
  }
);
