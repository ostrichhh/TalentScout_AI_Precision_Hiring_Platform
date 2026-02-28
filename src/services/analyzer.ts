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
 * @param fileUri The resume file as a data URI.
 * @param jobDescription The target job description text.
 * @returns A comprehensive analysis result.
 */
export async function analyzeResume(fileUri: string, jobDescription: string): Promise<FullAnalysisResult> {
  // 1. Extract structured data from the resume
  const extracted = await extractResumeData({ resumeDataUri: fileUri });

  // 2. Prepare a textual representation of the resume for semantic matching
  const resumeText = `
    Name: ${extracted.name}
    Skills: ${extracted.skills.join(", ")}
    Experience: ${extracted.experience.map(e => `${e.title} at ${e.company} (${e.duration}): ${e.description}`).join("; ")}
    Education: ${extracted.education.map(e => `${e.degree} from ${e.institution} (${e.year})`).join("; ")}
  `;

  // 3. Match the resume against the job description to generate scores
  const scores = await matchAndScoreSkills({
    resumeText,
    jobDescription
  });

  // 4. Generate a detailed feedback report for the candidate
  const feedback = await aiGenerateCandidateFeedback({
    candidateName: extracted.name,
    resumeSkills: extracted.skills,
    resumeExperienceSummary: extracted.experience.map(e => e.title).join(", "),
    resumeEducationSummary: extracted.education.map(e => e.degree).join(", "),
    jobDescription,
    skillMatchScore: scores.skillMatchScore,
    experienceMatchScore: scores.experienceMatchScore,
    overallFitScore: scores.overallFitScore
  });

  return {
    extracted,
    scores,
    feedback,
    timestamp: Date.now()
  };
}
