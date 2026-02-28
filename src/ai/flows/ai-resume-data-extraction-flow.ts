'use server';
/**
 * @fileOverview This file defines a Genkit flow for extracting structured data from a resume.
 *
 * - extractResumeData - A function that handles the resume data extraction process.
 * - ResumeDataExtractionInput - The input type for the extractResumeData function.
 * - ResumeDataExtractionOutput - The return type for the extractResumeData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeDataExtractionInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "A resume document, as a data URI that must include a MIME type (e.g., 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ResumeDataExtractionInput = z.infer<
  typeof ResumeDataExtractionInputSchema
>;

const ResumeDataExtractionOutputSchema = z.object({
  name: z.string().describe("The candidate's full name."),
  contactInfo: z.object({
    email: z.string().email().optional().describe("The candidate's email address."),
    phone: z.string().optional().describe("The candidate's phone number."),
    linkedin: z.string().url().optional().describe("The candidate's LinkedIn profile URL."),
  }).describe("Contact information for the candidate."),
  skills: z.array(z.string()).describe("A list of key skills extracted from the resume."),
  experience: z.array(
    z.object({
      title: z.string().describe("Job title."),
      company: z.string().describe("Company name."),
      duration: z.string().describe("Employment duration (e.g., 'Jan 2020 - Dec 2022', '2 years')."),
      description: z.string().describe("Key responsibilities and achievements."),
    })
  ).describe("A list of work experiences."),
  education: z.array(
    z.object({
      degree: z.string().describe("Degree or certification obtained."),
      institution: z.string().describe("Educational institution name."),
      year: z.string().describe("Graduation year or completion date."),
    })
  ).describe("A list of educational background."),
});
export type ResumeDataExtractionOutput = z.infer<
  typeof ResumeDataExtractionOutputSchema
>;

export async function extractResumeData(
  input: ResumeDataExtractionInput
): Promise<ResumeDataExtractionOutput> {
  return resumeDataExtractionFlow(input);
}

const resumeDataExtractionPrompt = ai.definePrompt({
  name: 'resumeDataExtractionPrompt',
  input: {schema: ResumeDataExtractionInputSchema},
  output: {schema: ResumeDataExtractionOutputSchema},
  prompt: `You are an expert HR assistant tasked with accurately extracting structured data from a resume.

Carefully parse the provided resume and extract the following information:
-   The candidate's full name.
-   Contact information including email, phone number, and LinkedIn profile URL (if available).
-   A comprehensive list of key skills.
-   Detailed work experience, including job title, company name, employment duration, and a summary of responsibilities/achievements for each role.
-   Educational background, including degree/certification, institution name, and completion year.

Ensure that the extracted data strictly adheres to the provided JSON schema for ResumeDataExtractionOutput.

Resume: {{media url=resumeDataUri}}`,
});

const resumeDataExtractionFlow = ai.defineFlow(
  {
    name: 'resumeDataExtractionFlow',
    inputSchema: ResumeDataExtractionInputSchema,
    outputSchema: ResumeDataExtractionOutputSchema,
  },
  async input => {
    const {output} = await resumeDataExtractionPrompt(input);
    return output!;
  }
);
