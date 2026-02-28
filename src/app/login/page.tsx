"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Loader2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulating authentication delay
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/30 p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 font-black text-3xl">
            <Zap className="text-primary fill-primary w-10 h-10 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
            <span className="bg-gradient-to-r from-black to-primary bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]">
              TalentScout AI
            </span>
          </Link>
          <p className="text-muted-foreground font-medium">Precision Hiring Powered by GenAI</p>
        </div>

        <Card className="border-none shadow-2xl bg-white overflow-hidden">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-none h-14 bg-muted/50">
              <TabsTrigger value="signin" className="data-[state=active]:bg-white data-[state=active]:text-primary font-bold text-sm uppercase tracking-wider">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:text-primary font-bold text-sm uppercase tracking-wider">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="p-8 pt-6">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Work Email</Label>
                  <Input id="email" type="email" placeholder="name@company.com" required className="h-12" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button variant="link" className="px-0 font-bold text-xs text-primary h-auto">Forgot Password?</Button>
                  </div>
                  <Input id="password" type="password" required className="h-12" />
                </div>
                <Button disabled={isLoading} type="submit" className="w-full h-14 rounded-full bg-black hover:bg-black/90 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="p-8 pt-6">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Work Email</Label>
                  <Input id="signup-email" type="email" placeholder="name@company.com" required className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" required className="h-12" />
                </div>
                <Button disabled={isLoading} type="submit" className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <CardFooter className="bg-muted/30 border-t p-6 text-center">
            <p className="text-xs text-muted-foreground w-full">
              By continuing, you agree to our <Link href="#" className="underline font-bold hover:text-black">Terms of Service</Link> and <Link href="#" className="underline font-bold hover:text-black">Privacy Policy</Link>.
            </p>
          </CardFooter>
        </Card>

        <div className="text-center pt-4">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-black">
            <Link href="/" className="flex items-center gap-2">
              Back to Home <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
