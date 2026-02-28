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
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-black hover:bg-black/90 text-white rounded-full px-6 font-bold">
            <Link href="/login">Get Started Free</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Parallax */}
        <section className="relative py-24 lg:py-40 overflow-hidden px-6">
          <div 
            className="max-w-7xl mx-auto text-center space-y-8 relative z-10"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-primary border border-primary/20 animate-pulse">
              <Star className="w-4 h-4 fill-primary" />
              <span className="text-xs font-bold uppercase tracking-wider">The Future of Talent Acquisition</span>
            </div>
            
            <h1 className="text-6xl lg:text-[120px] font-black tracking-tighter text-black leading-[0.85] mb-4">
              HIRE BETTER, <br />
              <span className="bg-gradient-to-r from-black via-primary to-primary bg-clip-text text-transparent">SMARTER, FASTER.</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Eliminate guesswork with AI-driven screening. Extract deep talent insights and match candidates with 99% accuracy.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
              <Button asChild size="lg" className="h-20 px-12 text-xl rounded-full font-bold bg-primary hover:bg-primary/90 text-white shadow-2xl hover:scale-105 transition-all">
                <Link href="/login" className="flex items-center gap-2">
                  Launch TalentScout <ArrowRight className="w-6 h-6" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-20 px-12 text-xl rounded-full font-bold border-2 hover:bg-accent transition-all">
                <Link href="#features">See it in action</Link>
              </Button>
            </div>
          </div>
          
          {/* Decorative Parallax Background Elements */}
          <div 
            className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10 transition-transform duration-75"
            style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.2}px)` }}
          />
          <div 
            className="absolute bottom-40 right-1/4 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-[120px] -z-10 transition-transform duration-75"
            style={{ transform: `translate(-${scrollY * 0.05}px, -${scrollY * 0.1}px)` }}
          />

          {/* Floating Feature Icons (Parallax) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none -z-5 overflow-hidden">
            <ParallaxIcon icon={Cpu} top="15%" left="10%" speed={0.4} scrollY={scrollY} />
            <ParallaxIcon icon={Layers} top="45%" left="5%" speed={0.2} scrollY={scrollY} />
            <ParallaxIcon icon={ShieldCheck} top="20%" right="12%" speed={0.3} scrollY={scrollY} />
            <ParallaxIcon icon={Activity} top="60%" right="8%" speed={0.5} scrollY={scrollY} />
          </div>
        </section>

        {/* Infinite Moving Carousel (Marquee) */}
        <section className="py-12 bg-black border-y border-white/10 overflow-hidden relative">
          <div className="flex whitespace-nowrap animate-marquee items-center gap-24 py-4">
            {[...brands, ...brands].map((brand, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-2xl lg:text-4xl font-black text-white/40 uppercase tracking-widest hover:text-primary transition-colors cursor-default">
                  {brand}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
        </section>

        {/* Dynamic Dashboard Preview with Hover Effects */}
        <section className="py-24 px-6 bg-white relative">
          <div className="max-w-6xl mx-auto">
            <div className="relative group rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border-8 border-black">
              <div className="bg-black p-4 flex items-center gap-2 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="ml-4 h-6 w-1/3 bg-white/10 rounded-full" />
              </div>
              <div className="aspect-[16/9] bg-muted relative group-hover:scale-[1.02] transition-transform duration-700">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-gradient-to-br from-white to-accent/20">
                  <div className="p-8 bg-white rounded-3xl shadow-2xl border mb-6 animate-bounce">
                    <Zap className="w-16 h-16 text-primary" />
                  </div>
                  <h3 className="text-3xl font-black text-black mb-4">Precision Intelligence Engine</h3>
                  <p className="max-w-md text-muted-foreground font-medium text-lg">
                    Real-time candidate scoring, automated skill verification, and strategic hiring analytics delivered instantly.
                  </p>
                  <div className="mt-8 flex gap-4">
                    <div className="h-12 w-32 bg-black rounded-lg" />
                    <div className="h-12 w-48 bg-primary rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Features Grid */}
        <section id="features" className="py-32 bg-black text-white px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-5xl lg:text-7xl font-black tracking-tighter">ENGINEERED FOR <br /><span className="text-primary">ELITE TEAMS.</span></h2>
                <p className="text-xl text-muted-foreground max-w-xl">TalentScout AI isn't just a tool; it's your unfair advantage in the global hunt for top talent.</p>
              </div>
              <FeatureCard 
                icon={Search} 
                title="Semantic Search" 
                description="Our AI understands context, not just keywords. It finds the talent others miss by understanding career trajectories."
              />
              <FeatureCard 
                icon={Globe} 
                title="Bias Neutralizer" 
                description="Advanced anonymization and objective scoring ensure you hire based purely on performance and potential."
              />
              <FeatureCard 
                icon={BarChart3} 
                title="Predictive Analytics" 
                description="Forecast candidate performance and retention based on historical data patterns and market trends."
              />
              <FeatureCard 
                icon={Users} 
                title="Automated Matching" 
                description="Instantly rank your entire talent pool against new job descriptions with granular compatibility scores."
              />
            </div>
          </div>
        </section>

        {/* Testimonial / Trust Section */}
        <section className="py-24 px-6 bg-accent/20">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-3xl lg:text-5xl font-bold text-black italic tracking-tight leading-tight">
              "TalentScout AI cut our screening time by 85%. We found our Head of Engineering in 48 hours instead of weeks."
            </p>
            <div>
              <p className="text-xl font-black text-black">MARCUS CHEN</p>
              <p className="text-sm font-bold text-primary tracking-widest uppercase">VP of Engineering, Solstice Cloud</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6 max-w-xs">
            <div className="flex items-center gap-2 font-bold text-2xl">
              <Zap className="text-primary fill-primary w-8 h-8" />
              <span>TalentScout AI</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Modernizing the way the world builds teams through precision generative AI and deep data intelligence.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 md:gap-24">
            <FooterLinkGroup title="Product" links={["Features", "Enterprise", "Pricing", "Roadmap"]} />
            <FooterLinkGroup title="Company" links={["About", "Careers", "Press", "Contact"]} />
            <FooterLinkGroup title="Legal" links={["Privacy", "Terms", "Security"]} />
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-widest">
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
        transform: `translateY(${scrollY * speed}px) rotate(${scrollY * 0.05}deg)`
      }}
    >
      <Icon className="w-8 h-8 text-primary" />
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all group hover:bg-white/10 cursor-default">
      <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-[0_0_25px_rgba(249,115,22,0.4)]">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-lg">{description}</p>
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