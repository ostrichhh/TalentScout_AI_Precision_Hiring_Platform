
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Users, 
  FileCheck, 
  TrendingUp, 
  Clock,
  Briefcase,
  ArrowUpRight,
  UserPlus
} from "lucide-react"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const stats = [
  { name: "Total Candidates", value: "1,284", icon: Users, change: "+12.5%", color: "text-primary" },
  { name: "Resumes Analyzed", value: "842", icon: FileCheck, change: "+18.2%", color: "text-primary" },
  { name: "Average Match", value: "76%", icon: TrendingUp, change: "+4.3%", color: "text-primary" },
  { name: "Time Saved", value: "128h", icon: Clock, change: "+22h", color: "text-primary" },
]

const recentActivity = [
  { name: "Jane Cooper", role: "Sr. Frontend Engineer", score: 94, time: "2 hours ago" },
  { name: "Cody Fisher", role: "Product Manager", score: 82, time: "5 hours ago" },
  { name: "Esther Howard", role: "UX Designer", score: 78, time: "1 day ago" },
  { name: "Jenny Wilson", role: "DevOps Engineer", score: 89, time: "2 days ago" },
]

const chartData = [
  { name: "Mon", count: 45 },
  { name: "Tue", count: 52 },
  { name: "Wed", count: 38 },
  { name: "Thu", count: 65 },
  { name: "Fri", count: 48 },
  { name: "Sat", count: 24 },
  { name: "Sun", count: 18 },
]

const chartConfig = {
  count: {
    label: "Applications",
    color: "hsl(var(--primary))",
  },
}

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-black">Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-lg">Welcome back. Here's what's happening with your recruitment flow.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-11 px-6 font-semibold">
            <Briefcase className="mr-2 h-4 w-4" />
            Manage Jobs
          </Button>
          <Button asChild className="h-11 px-6 font-semibold bg-primary hover:bg-primary/90 text-white">
            <Link href="/analyze">
              <UserPlus className="mr-2 h-4 w-4" />
              Analyze New Resume
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-none shadow-md bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center">
                <span className="text-primary font-bold mr-1">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Analysis Volume</CardTitle>
            <CardDescription>Number of resumes processed over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#666', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#666', fontSize: 12 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Top Talent Candidates</CardTitle>
            <CardDescription>Highest scoring candidates this week.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivity.map((candidate) => (
                <div key={candidate.name} className="flex items-center justify-between group">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold leading-none text-black group-hover:text-primary transition-colors">{candidate.name}</p>
                    <p className="text-xs text-muted-foreground">{candidate.role}</p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div className="text-sm font-bold bg-accent text-accent-foreground px-2 py-1 rounded">
                      {candidate.score}%
                    </div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{candidate.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="link" className="w-full mt-6 text-primary font-bold" asChild>
              <Link href="/candidates">
                View All Talent <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
