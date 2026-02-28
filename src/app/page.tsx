
"use client"

import { Button } from "@/components/ui/button"
import { Zap, Search, Users, BarChart3, ArrowRight, CheckCircle2, Star } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <header className="px-6 lg:px-12 h-20 flex items-center justify-between border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <Zap className="text-primary fill-primary w-8 h-8 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
          <span className="bg-gradient-to-r from-black to-primary bg-clip-text text-transparent">
            TalentScout AI
          </span>
        </Link>
        <nav className="hidden md:flex gap-8 font-medium">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
          <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild className="hidden sm:inline-flex font-bold">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-black hover:bg-black/90 text-white rounded-full px-6 font-bold">
            <Link href="/login">Get Started Free</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden px-6">
          <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-primary border border-primary/20 animate-bounce">
              <Star className="w-4 h-4 fill-primary" />
              <span className="text-xs font-bold uppercase tracking-wider">Next Gen Recruitment AI</span>
            </div>
            <h1 className="text-5xl lg:text-8xl font-black tracking-tighter text-black leading-none">
              HIRE BETTER, <br />
              <span className="bg-gradient-to-r from-black via-primary to-primary bg-clip-text text-transparent">SMARTER, FASTER.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Automate resume screening, extract deep talent insights, and find your perfect candidate in seconds using advanced generative AI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Button asChild size="lg" className="h-16 px-10 text-lg rounded-full font-bold bg-primary hover:bg-primary/90 text-white shadow-2xl hover:scale-105 transition-transform">
                <Link href="/login" className="flex items-center gap-2">
                  Start Analyzing Now <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-16 px-10 text-lg rounded-full font-bold border-2 hover:bg-accent transition-all">
                <Link href="#features">Explore Features</Link>
              </Button>
            </div>
            
            {/* Visual Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
          </div>

          <div className="mt-20 max-w-5xl mx-auto relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-primary to-orange-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
             <div className="relative bg-white border rounded-2xl shadow-2xl overflow-hidden aspect-video flex items-center justify-center p-8">
               <div className="w-full h-full bg-muted rounded-xl border border-dashed flex flex-col items-center justify-center text-muted-foreground gap-4">
                  <div className="p-6 bg-white rounded-full shadow-lg">
                    <Zap className="w-12 h-12 text-primary" />
                  </div>
                  <p className="font-bold text-xl text-black">TalentScout AI Dashboard Preview</p>
                  <p className="max-w-xs text-center">Interactive analytics and deep candidate matching at your fingertips.</p>
               </div>
             </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-black text-white px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold">Powerful AI Toolset</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to modernize your hiring pipeline and beat the competition.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={Search} 
                title="Deep Extraction" 
                description="Our AI parses resumes with human-like understanding, pulling out skills, experience, and education details automatically."
              />
              <FeatureCard 
                icon={Users} 
                title="Smart Matching" 
                description="Get an instant compatibility score (0-100%) between any candidate and your specific job description."
              />
              <FeatureCard 
                icon={BarChart3} 
                title="Hiring Analytics" 
                description="Visualize your talent pool with strategic insights, score distributions, and pipeline bottlenecks identified for you."
              />
            </div>
          </div>
        </section>

        {/* Benefits List */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black text-black leading-tight">
                Why TalentScout AI <br />
                is a <span className="text-primary underline decoration-primary/20">Game Changer</span>
              </h2>
              <ul className="space-y-6">
                <BenefitItem title="Save 100+ Hours" description="Skip the manual screening. Let AI handle the first pass and deliver only the top 10% to your desk." />
                <BenefitItem title="Unbiased Screening" description="Focus on skills and experience. Our AI matching helps reduce unconscious bias in the initial filtering stage." />
                <BenefitItem title="Strategic Feedback" description="Generate personalized, constructive feedback for candidates automatically to maintain a great employer brand." />
              </ul>
            </div>
            <div className="bg-primary/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden group">
               <div className="space-y-6 relative z-10">
                  <div className="bg-white p-6 rounded-2xl shadow-xl border border-primary/10 transition-all group-hover:scale-105">
                     <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-bold text-muted-foreground">Match Score</span>
                        <span className="text-2xl font-black text-primary">94%</span>
                     </div>
                     <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[94%]"></div>
                     </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-xl border border-primary/10 translate-x-4 lg:translate-x-12 transition-all group-hover:translate-x-16">
                     <p className="font-bold text-black mb-1">Jane Cooper</p>
                     <p className="text-xs text-muted-foreground mb-3">Sr. Frontend Engineer</p>
                     <div className="flex gap-2">
                        <span className="px-2 py-1 rounded bg-accent text-[10px] font-bold text-primary">React</span>
                        <span className="px-2 py-1 rounded bg-accent text-[10px] font-bold text-primary">TypeScript</span>
                        <span className="px-2 py-1 rounded bg-accent text-[10px] font-bold text-primary">Next.js</span>
                     </div>
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-0"></div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Zap className="text-primary fill-primary w-6 h-6" />
            <span>TalentScout AI</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2024 TalentScout AI. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-black">Terms</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-black">Privacy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-black">Twitter</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all group hover:bg-white/10">
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(249,115,22,0.3)]">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

function BenefitItem({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1">
        <CheckCircle2 className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h4 className="font-bold text-black text-lg">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
