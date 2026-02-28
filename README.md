# TalentScout AI - Precision Hiring Platform

TalentScout AI is a modern, AI-driven recruitment platform designed to eliminate guesswork in talent acquisition. By leveraging Google's Genkit and Gemini models, the platform provides semantic resume analysis, granular skill matching, and strategic candidate feedback.

## 🚀 Features

- **Semantic Resume Analysis**: Deep understanding of career trajectories beyond simple keywords.
- **Automated Data Extraction**: Instant extraction of contact info, skills, experience, and education from PDF/DOCX.
- **Precision Match Scoring**: Comparative scoring of candidates against specific job descriptions.
- **Strategic AI Feedback**: Actionable insights for recruiters to provide constructive feedback to candidates.
- **Talent Pool Management**: A centralized dashboard to track and rank candidates in your pipeline.
- **Hiring Insights**: Visual analytics on quality of hire, time-to-hire, and source efficacy.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **AI Engine**: [Genkit](https://firebase.google.com/docs/genkit) with Gemini 2.5 Flash
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Getting Started

### Prerequisites

- Node.js 20 or later
- A Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd talentscout-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables in a `.env` file:
   ```env
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 📈 Architecture

The application uses **Genkit Flows** as Server Actions to orchestrate multi-step AI processes:
1. **Extraction**: Parses raw resume data into structured JSON.
2. **Matching**: Compares extracted data against a job description.
3. **Feedback**: Generates a final strategic report for the hiring team.

## 📄 License

This project is licensed under the MIT License.
