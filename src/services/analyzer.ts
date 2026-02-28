"use server"

import { extractResumeData, ResumeDataExtractionOutput } from "@/ai/flows/ai-resume-data-extraction-flow";
import { matchAndScoreSkills, ResumeJobMatchOutput } from "@/ai/flows/ai-skill-matching-and-scoring";
import { aiGenerateCandidateFeedback, AiGenerateCandidateFeedbackOutput } from "@/ai/flows/ai-generate-candidate-feedback";

// Single Responsibility: Interface for analysis results
export interface FullAnalysisResult {
  extracted: ResumeDataExtractionOutput;
  scores: ResumeJobMatchOutput;
  feedback: AiGenerateCandidateFeedbackOutput;
  timestamp: number;
}

/**
 * Orchestrates the full resume analysis process using multiple AI flows.
 * This is implemented as a Server Action to ensure sequential steps occur on the backend,
 * minimizing client-server roundtrips and avoiding common network-related failures.
 * 
 * @param fileUri The resume file as a data URI.
 * @param jobDescription The target job description text.
 * @returns A comprehensive analysis result.
 */
export async function analyzeResume(fileUri: string, jobDescription: string): Promise<FullAnalysisResult> {
  console.log("Starting full resume analysis orchestration...");
  
  try {
    // 1. Extract structured data from the resume
    // The resumeDataUri contains the base64 encoded file
    const extracted = await extractResumeData({ resumeDataUri: fileUri });
    
    if (!extracted || !extracted.name) {
      throw new Error("Could not extract candidate information. Please ensure the file is a valid resume document.");
    }

    // Defensive data mapping to ensure arrays exist for subsequent processing
    const skillsList = Array.isArray(extracted.skills) ? extracted.skills : [];
    const experienceList = Array.isArray(extracted.experience) ? extracted.experience : [];
    const educationList = Array.isArray(extracted.education) ? extracted.education : [];

    // 2. Prepare a textual representation of the resume for semantic matching
    // This provides the model with a clear context for the scoring phase
    const resumeText = `
      Candidate Name: ${extracted.name}
      Skills: ${skillsList.join(", ")}
      Experience Summary: ${experienceList.map(e => `${e.title} at ${e.company} (${e.duration}): ${e.description}`).join("; ")}
      Education Summary: ${educationList.map(e => `${e.degree} from ${e.institution} (${e.year})`).join("; ")}
    `;

    // 3. Match the resume against the job description to generate match scores
    const scores = await matchAndScoreSkills({
      resumeText,
      jobDescription
    });

    if (!scores) {
      throw new Error("Failed to generate match scores for the provided resume.");
    }

    // 4. Generate a detailed strategic feedback report
    // We pass extracted summaries to provide context to the report generator
    const feedback = await aiGenerateCandidateFeedback({
      candidateName: extracted.name,
      resumeSkills: skillsList,
      resumeExperienceSummary: experienceList.map(e => e.title).join(", "),
      resumeEducationSummary: educationList.map(e => e.degree).join(", "),
      jobDescription,
      skillMatchScore: scores.skillMatchScore || 0,
      experienceMatchScore: scores.experienceMatchScore || 0,
      overallFitScore: scores.overallFitScore || 0
    });

    if (!feedback) {
      throw new Error("Failed to generate final analysis report.");
    }

    // Return the final consolidated result object
    return {
      extracted: {
        ...extracted,
        skills: skillsList,
        experience: experienceList,
        education: educationList
      },
      scores: {
        ...scores,
        skillMatchScore: scores.skillMatchScore || 0,
        experienceMatchScore: scores.experienceMatchScore || 0,
        overallFitScore: scores.overallFitScore || 0
      },
      feedback: {
        ...feedback,
        strongMatches: Array.isArray(feedback.strongMatches) ? feedback.strongMatches : [],
        suggestedImprovements: Array.isArray(feedback.suggestedImprovements) ? feedback.suggestedImprovements : [],
        missingQualifications: Array.isArray(feedback.missingQualifications) ? feedback.missingQualifications : []
      },
      timestamp: Date.now()
    };
  } catch (error: any) {
    console.error("Analysis failure in analyzer.ts:", error);
    // Throw a user-friendly error that will be caught by the UI toast
    throw new Error(error.message || "Resume analysis failed due to an internal processing error.");
  }
}
