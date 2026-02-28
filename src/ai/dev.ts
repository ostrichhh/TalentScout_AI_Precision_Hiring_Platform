import { config } from 'dotenv';
config();

import '@/ai/flows/ai-resume-data-extraction-flow.ts';
import '@/ai/flows/ai-skill-matching-and-scoring.ts';
import '@/ai/flows/ai-generate-candidate-feedback.ts';