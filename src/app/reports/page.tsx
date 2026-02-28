"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line
} from "recharts"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"
import { 
  TrendingUp, 
  Users, 
  Target, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Download,
  Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"

const scoreDistribution = [
  { range: "0-20", count: 12, fill: "hsl(var(--destructive))" },
  { range: "21-40", count: 45, fill: "hsl(var(--destructive) / 0.7)" },
  { range: "41-60", count: 156, fill: "hsl(var(--muted-foreground))" },
  { range: "61-80", count: 320, fill: "hsl(var(--primary) / 0.6)" },
  { range: "81-100", count: 184, fill: "hsl(var(--primary))" },
]

const hiringSourceData = [
  { name: "LinkedIn", value: 45, fill: "hsl(var(--primary))" },
  { name: "Referrals", value: 25, fill: "hsl(var(--chart-2))" },
  { name: "Direct", value: 20, fill: "hsl(var(--chart-4))" },
  { name: "Job Boards", value: 10, fill: "hsl(var(--muted))" },
]

const timeToHireData = [
  { month: "Jan", days: 24 },
  { month: "Feb", days: 22 },
  { month: "Mar", days: 28 },
  { month: "Apr", days: 21 },
  { month: "May", days: 19 },
  { month: "Jun", days: 18 },
]

const chartConfig = {
  count: {
    label: "Candidates",
    color: "hsl(var(--primary))",
  },
  days: {
    label: "Avg. Days",
    color: "hsl(var(--primary))",
  }
}

export default function ReportsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-black">Hiring Insights</h1>
          <p className="text-muted-foreground mt-1 text-lg">Detailed analysis of your recruitment pipeline and talent quality.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-11 font-semibold">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="outline" className="h-11 font-semibold">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-md bg-white">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1 font-semibold uppercase tracking-wider text-[10px]">
              <Target className="w-3 h-3 text-primary" />
              Quality of Hire
            </CardDescription>
            <CardTitle className="text-3xl font-black">78.4%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-green-600 font-bold">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              +5.2% vs last month
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md bg-white">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1 font-semibold uppercase tracking-wider text-[10px]">
              <Clock className="w-3 h-3 text-primary" />
              Avg. Time to Close
            </CardDescription>
            <CardTitle className="text-3xl font-black">18 Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-green-600 font-bold">
              <ArrowDownRight className="w-4 h-4 mr-1" />
              -3 days vs last month
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md bg-white">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1 font-semibold uppercase tracking-wider text-[10px]">
              <Users className="w-3 h-3 text-primary" />
              Interview Pass Rate
            </CardDescription>
            <CardTitle className="text-3xl font-black">42.1%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-destructive font-bold">
              <ArrowDownRight className="w-4 h-4 mr-1" />
              -2.4% vs last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Score Distribution</CardTitle>
            <CardDescription>Number of candidates segmented by AI match scores.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart data={scoreDistribution}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {scoreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Time to Hire Trend</CardTitle>
            <CardDescription>Average days from application to offer acceptance.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <LineChart data={timeToHireData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="days" 
                  stroke="var(--color-days)" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: "var(--color-days)" }} 
                  activeDot={{ r: 8, strokeWidth: 2 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Source Efficacy</CardTitle>
            <CardDescription>Top performing channels for quality candidates.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={{}} className="h-full w-full">
              <PieChart>
                <Pie
                  data={hiringSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {hiringSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Strategic Insights</CardTitle>
            <CardDescription>AI-generated recommendations for your workflow.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <h4 className="font-bold text-black text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Talent Density Alert
              </h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Referral quality has increased by 15% this quarter. Consider boosting the internal referral bonus program to maintain this momentum.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-black/5 border border-black/10">
              <h4 className="font-bold text-black text-sm flex items-center gap-2">
                <Filter className="w-4 h-4 text-black" />
                Pipeline Bottleneck
              </h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Technical screening stage is currently taking 6.2 days on average, up from 4.1. This is the primary driver of the slight increase in time-to-hire.
              </p>
            </div>
            <Button variant="link" className="text-primary font-bold p-0 h-auto text-sm">
              View Detailed Pipeline Breakdown <ArrowUpRight className="ml-1 w-3 h-3" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
