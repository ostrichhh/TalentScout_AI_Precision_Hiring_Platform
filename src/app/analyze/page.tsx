"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Upload, 
  Search, 
  FileText, 
  CheckCircle2, 
  Loader2, 
  Sparkles,
  Trophy,
  Target,
  User,
  GraduationCap,
  Briefcase
} from "lucide-react"
import { fileToDataUri } from "@/lib/file-utils"
import { analyzeResume, FullAnalysisResult } from "@/services/analyzer"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

export default function AnalyzePage() {
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<FullAnalysisResult | null>(null)
  const { toast } = useToast()

  const handleAnalyze = async () => {
    if (!file || !jobDescription) {
      toast({
        title: "Missing Information",
        description: "Please upload a resume and provide a job description.",
        variant: "destructive"
      })
      return
    }

    setIsAnalyzing(true)
    try {
      const fileUri = await fileToDataUri(file)
      // Call the functional analyzer
      const analysisResult = await analyzeResume(fileUri, jobDescription)
      
      setResult(analysisResult)
      toast({
        title: "Analysis Complete",
        description: "Resume has been successfully processed and scored.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Analysis Failed",
        description: "There was an error processing the resume. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-black flex items-center gap-3">
          <Search className="w-10 h-10 text-primary" />
          AI Resume Analyzer
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Upload a resume and paste a job description to get instant AI matching and feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-none shadow-lg bg-white overflow-hidden">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Upload Resume
            </CardTitle>
            <CardDescription>Upload PDF or DOCX file (Max 5MB)</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                file ? "border-primary bg-accent/30" : "border-muted-foreground/20 hover:border-primary/50"
              }`}
            >
              <Input 
                type="file" 
                id="resume-upload" 
                className="hidden" 
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept=".pdf,.docx,.doc"
              />
              <Label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center gap-4">
                <div className={`p-4 rounded-full ${file ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold text-lg text-black">{file ? file.name : "Choose a file or drag it here"}</p>
                  <p className="text-sm text-muted-foreground">Supported: PDF, DOCX</p>
                </div>
              </Label>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white flex flex-col">
          <CardHeader className="bg-black/5 border-b border-black/10">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <FileText className="w-5 h-5 text-black" />
              Job Description
            </CardTitle>
            <CardDescription>Paste the target job description here</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex-1">
            <Textarea 
              className="min-h-[200px] h-full resize-none border-muted-foreground/20 focus:border-primary"
              placeholder="Responsibilities, requirements, skills..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button 
          size="lg" 
          className="h-14 px-12 rounded-full font-bold text-lg bg-primary hover:bg-primary/90 text-white shadow-xl hover:shadow-2xl transition-all disabled:opacity-50"
          onClick={handleAnalyze}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-3 h-6 w-6 animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Sparkles className="mr-3 h-6 w-6" />
              Generate Match Report
            </>
          )}
        </Button>
      </div>

      {result && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Separator className="bg-muted" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1 border-none shadow-xl bg-black text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <Trophy className="text-primary h-8 w-8" />
                  Match Scores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <ScoreCard label="Overall Fit" score={result.scores.overallFitScore} />
                <ScoreCard label="Skill Match" score={result.scores.skillMatchScore} />
                <ScoreCard label="Experience Match" score={result.scores.experienceMatchScore} />
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 border-none shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <User className="text-primary h-8 w-8" />
                  {result.extracted.name}
                </CardTitle>
                <CardDescription>Candidate Profile Summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-bold text-black flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      Key Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.extracted.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="bg-accent text-accent-foreground font-medium">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-bold text-black flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      Education
                    </h3>
                    <ul className="space-y-2">
                      {result.extracted.education.map((edu, idx) => (
                        <li key={idx} className="text-sm">
                          <span className="font-bold block">{edu.degree}</span>
                          <span className="text-muted-foreground">{edu.institution}, {edu.year}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="font-bold text-black flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      Relevant Experience
                    </h3>
                    <div className="space-y-4">
                      {result.extracted.experience.map((exp, idx) => (
                        <div key={idx} className="text-sm p-3 bg-muted rounded-lg border border-border">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-bold text-black">{exp.title}</span>
                            <span className="text-xs font-semibold text-primary">{exp.duration}</span>
                          </div>
                          <p className="text-muted-foreground text-xs font-medium mb-1">{exp.company}</p>
                          <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <CheckCircle2 className="text-primary h-8 w-8" />
                AI Feedback Report
              </CardTitle>
              <CardDescription>Strategic advice and match analysis generated by HireFlow AI.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                <h3 className="font-bold text-black mb-2">Overall Summary</h3>
                <p className="text-muted-foreground leading-relaxed">{result.feedback.overallSummary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeedbackList title="Strong Matches" items={result.feedback.strongMatches} color="text-green-600" />
                <FeedbackList title="Suggested Improvements" items={result.feedback.suggestedImprovements} color="text-primary" />
                <FeedbackList title="Missing Qualifications" items={result.feedback.missingQualifications} color="text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

function ScoreCard({ label, score }: { label: string, score: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="text-3xl font-black text-primary">{score}%</span>
      </div>
      <Progress value={score} className="h-2 bg-white/20" />
    </div>
  )
}

function FeedbackList({ title, items, color }: { title: string, items: string[], color: string }) {
  return (
    <div className="space-y-4">
      <h3 className={`font-bold text-black flex items-center gap-2`}>
        <div className={`w-1.5 h-6 rounded-full bg-current ${color}`} />
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
            <span className="text-black font-bold select-none">•</span>
            {item}
          </li>
        ))}
        {items.length === 0 && <li className="text-sm italic text-muted-foreground">None identified</li>}
      </ul>
    </div>
  )
}
