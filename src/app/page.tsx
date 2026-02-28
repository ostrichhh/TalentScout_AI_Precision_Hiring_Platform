"use client"

import { Button } from "@/components/ui/button"
import { Zap, Search, Users, BarChart3, ArrowRight, CheckCircle2, Star, Globe, Cpu, Layers, ShieldCheck, Activity } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const brands = [
    "TechGlobal", "NextHire", "Quantos", "Vertex", "Solstice", "Prism AI", "Aether", "Velocity"
  ]

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
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild className="bg-black hover:bg-black/90 text-white rounded-full px-6 font-bold shadow-lg transition-transform hover:scale-105">
            <Link href="/login">Get Started Free</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Parallax */}
        <section className="relative py-24 lg:py-40 overflow-hidden px-6">
          <div 
            className="max-w-7xl mx-auto text-center space-y-8 relative z-10"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-primary border border-primary/20 animate-pulse">
              <Star className="w-4 h-4 fill-primary" />
              <span className="text-xs font-bold uppercase tracking-wider">The Future of Talent Acquisition</span>
            </div>
            
            <h1 className="text-6xl lg:text-[110px] font-black tracking-tighter text-black leading-[0.9] mb-4">
              PRECISION HIRING <br />
              <span className="bg-gradient-to-r from-black via-primary to-primary bg-clip-text text-transparent">REIMAGINED.</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Eliminate guesswork with AI-driven screening. Extract deep talent insights and match candidates with unprecedented accuracy.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
              <Button asChild size="lg" className="h-16 px-10 text-lg rounded-full font-bold bg-primary hover:bg-primary/90 text-white shadow-2xl hover:scale-105 transition-all">
                <Link href="/login" className="flex items-center gap-2">
                  Launch TalentScout <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-16 px-10 text-lg rounded-full font-bold border-2 hover:bg-accent transition-all">
                <Link href="#features">Explore Features</Link>
              </Button>
            </div>
          </div>
          
          {/* Decorative Parallax Background Elements */}
          <div 
            className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10"
            style={{ transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.1}px)` }}
          />
          <div 
            className="absolute bottom-40 right-1/4 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-[150px] -z-10"
            style={{ transform: `translate(-${scrollY * 0.03}px, -${scrollY * 0.05}px)` }}
          />

          {/* Floating Feature Icons (Parallax) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none -z-5 overflow-hidden">
            <ParallaxIcon icon={Cpu} top="15%" left="10%" speed={0.2} scrollY={scrollY} />
            <ParallaxIcon icon={Layers} top="45%" left="5%" speed={0.15} scrollY={scrollY} />
            <ParallaxIcon icon={ShieldCheck} top="20%" right="12%" speed={0.25} scrollY={scrollY} />
            <ParallaxIcon icon={Activity} top="60%" right="8%" speed={0.3} scrollY={scrollY} />
          </div>
        </section>

        {/* Infinite Moving Carousel (Marquee) - Now on Light Background */}
        <section className="py-16 bg-muted/30 border-y overflow-hidden relative">
          <div className="flex whitespace-nowrap animate-marquee items-center gap-24">
            {[...brands, ...brands].map((brand, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary/40" />
                <span className="text-2xl lg:text-4xl font-black text-muted-foreground/40 uppercase tracking-widest hover:text-primary transition-colors cursor-default">
                  {brand}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-muted/30 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-muted/30 to-transparent z-10" />
        </section>

        {/* Dynamic Dashboard Preview */}
        <section className="py-24 px-6 bg-white relative">
          <div className="max-w-6xl mx-auto">
            <div className="relative group rounded-3xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border-4 border-muted">
              <div className="bg-muted/50 p-4 flex items-center gap-2 border-b">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="ml-4 h-5 w-1/3 bg-white rounded-full border" />
              </div>
              <div className="aspect-[16/9] bg-white relative group-hover:scale-[1.01] transition-transform duration-700">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-gradient-to-br from-white via-white to-accent/20">
                  <div className="p-8 bg-white rounded-3xl shadow-xl border mb-6">
                    <Zap className="w-16 h-16 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-3xl font-black text-black mb-4 uppercase tracking-tight">Intelligence at Scale</h3>
                  <p className="max-w-md text-muted-foreground font-medium text-lg">
                    Real-time candidate scoring and strategic hiring analytics delivered instantly through our proprietary GenAI engine.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Features Grid - Now on Light Background */}
        <section id="features" className="py-32 bg-white px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="w-12 h-1.5 bg-primary rounded-full" />
                <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-black uppercase">
                  Modern Tools for <br /><span className="text-primary">Modern Teams.</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-xl font-medium">
                  TalentScout AI leverages advanced semantic matching to ensure your team finds the perfect fit, every time.
                </p>
              </div>
              <FeatureCard 
                icon={Search} 
                title="Semantic Matching" 
                description="Our AI understands career trajectories and potential, not just keywords, finding talent that others miss."
              />
              <FeatureCard 
                icon={Globe} 
                title="Bias Neutralizer" 
                description="Objective scoring ensures hiring decisions are based purely on performance and verified skills."
              />
              <FeatureCard 
                icon={BarChart3} 
                title="Hiring Analytics" 
                description="Forecast candidate performance and retention based on historical patterns and market trends."
              />
              <FeatureCard 
                icon={Users} 
                title="Talent Pool" 
                description="Rank your entire database against new roles instantly with granular compatibility scoring."
              />
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-24 px-6 bg-accent/30 border-y">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-3xl lg:text-5xl font-bold text-black italic tracking-tight leading-tight">
              "TalentScout AI cut our screening time by 85%. We found our Head of Engineering in 48 hours instead of weeks."
            </p>
            <div className="pt-4">
              <p className="text-xl font-black text-black uppercase">Marcus Chen</p>
              <p className="text-sm font-bold text-primary tracking-widest uppercase mt-1">VP of Engineering, Solstice Cloud</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 bg-white border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6 max-w-xs">
            <div className="flex items-center gap-2 font-bold text-2xl">
              <Zap className="text-primary fill-primary w-8 h-8" />
              <span>TalentScout AI</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              Modernizing the way the world builds teams through precision generative AI and deep data intelligence.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 md:gap-24">
            <FooterLinkGroup title="Product" links={["Features", "Enterprise", "Pricing", "Roadmap"]} />
            <FooterLinkGroup title="Company" links={["About", "Careers", "Press", "Contact"]} />
            <FooterLinkGroup title="Legal" links={["Privacy", "Terms", "Security"]} />
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
          <span>© 2024 TalentScout AI</span>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link>
            <Link href="#" className="hover:text-primary transition-colors">Github</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ParallaxIcon({ icon: Icon, top, left, right, speed, scrollY }: { icon: any, top: string, left?: string, right?: string, speed: number, scrollY: number }) {
  return (
    <div 
      className="absolute p-4 bg-white rounded-2xl shadow-xl border border-primary/10 transition-transform duration-75"
      style={{ 
        top, 
        left, 
        right,
        transform: `translateY(${scrollY * speed}px) rotate(${scrollY * 0.02}deg)`
      }}
    >
      <Icon className="w-8 h-8 text-primary" />
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="p-10 rounded-3xl bg-white border border-muted hover:border-primary/50 transition-all group hover:shadow-xl cursor-default">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-all">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-xl font-black mb-4 tracking-tight uppercase text-black">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-base font-medium">{description}</p>
    </div>
  )
}

function FooterLinkGroup({ title, links }: { title: string, links: string[] }) {
  return (
    <div className="space-y-6">
      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-black">{title}</h4>
      <ul className="space-y-4">
        {links.map(link => (
          <li key={link}>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
