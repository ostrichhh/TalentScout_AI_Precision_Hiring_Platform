'use server';
/**
 * @fileOverview A Genkit flow that generates an automated feedback report for candidates.
 *
 * - aiGenerateCandidateFeedback - A function that generates a candidate feedback report.
 * - AiGenerateCandidateFeedbackInput - The input type for the aiGenerateCandidateFeedback function.
 * - AiGenerateCandidateFeedbackOutput - The return type for the aiGenerateCandidateFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiGenerateCandidateFeedbackInputSchema = z.object({
  candidateName: z.string().describe('The name of the candidate.'),
  resumeSkills: z.array(z.string()).describe('A list of skills extracted from the candidate\'s resume.'),
  resumeExperienceSummary: z.string().describe('A summary of the candidate\'s work experience from the resume.'),
  resumeEducationSummary: z.string().describe('A summary of the candidate\'s education from the resume.'),
  jobDescription: z.string().describe('The job description against which the resume is being analyzed.'),
  skillMatchScore: z.number().describe('A score (0-100) indicating how well the candidate\'s skills match the job requirements.'),
  experienceMatchScore: z.number().describe('A score (0-100) indicating how well the candidate\'s experience matches the job requirements.'),
  overallFitScore: z.number().describe('An overall fit score (0-100) for the candidate for the given job description.'),
});
export type AiGenerateCandidateFeedbackInput = z.infer<typeof AiGenerateCandidateFeedbackInputSchema>;

const AiGenerateCandidateFeedbackOutputSchema = z.object({
  overallSummary: z.string().describe('A concise overall summary of the candidate\'s fit for the role.'),
  strongMatches: z.array(z.string()).describe('A list of bullet points highlighting strong matching areas between the resume and job description.'),
  suggestedImprovements: z.array(z.string()).describe('A list of bullet points suggesting skills or experiences the candidate could improve upon or acquire.'),
  missingQualifications: z.array(z.string()).describe('A list of bullet points identifying key qualifications or requirements explicitly mentioned in the job description that are missing from the resume.'),
});
export type AiGenerateCandidateFeedbackOutput = z.infer<typeof AiGenerateCandidateFeedbackOutputSchema>;

export async function aiGenerateCandidateFeedback(input: AiGenerateCandidateFeedbackInput): Promise<AiGenerateCandidateFeedbackOutput> {
  return generateCandidateFeedbackFlow(input);
}

const generateCandidateFeedbackPrompt = ai.definePrompt({
  name: 'generateCandidateFeedbackPrompt',
  input: {schema: AiGenerateCandidateFeedbackInputSchema},
  output: {schema: AiGenerateCandidateFeedbackOutputSchema},
  prompt: `You are an AI assistant specialized in providing constructive feedback on resumes based on a given job description.
Your goal is to help an HR team member provide actionable insights to candidates.
Analyze the provided candidate resume data, job description, and various match scores to generate a detailed feedback report.

Candidate Name: {{{candidateName}}}

---
Job Description:
{{{jobDescription}}}
---

---
Candidate Resume Details:
Skills: {{{resumeSkills}}}
Experience Summary: {{{resumeExperienceSummary}}}
Education Summary: {{{resumeEducationSummary}}}
---

---
Match Scores:
Skill Match Score: {{{skillMatchScore}}}/100
Experience Match Score: {{{experienceMatchScore}}}/100
Overall Fit Score: {{{overallFitScore}}}/100
---

Based on the above information, generate a feedback report focusing on:
1.  An overall summary of the candidate's fit.
2.  Specific strong matching areas.
3.  Actionable suggestions for skill improvements.
4.  Clearly identified missing qualifications.

Ensure the output is structured as a JSON object matching the provided schema, with each list item as a separate string in the array.`,
});

const generateCandidateFeedbackFlow = ai.defineFlow(
  {
    name: 'generateCandidateFeedbackFlow',
    inputSchema: AiGenerateCandidateFeedbackInputSchema,
    outputSchema: AiGenerateCandidateFeedbackOutputSchema,
  },
  async (input) => {
    const {output} = await generateCandidateFeedbackPrompt(input);
    if (!output) {
      throw new Error('Failed to generate candidate feedback report.');
    }
    return output;
  }
);
