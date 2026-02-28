import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, ArrowUpDown, UserCircle, Mail, Phone, Calendar } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const candidates = [
  { id: 1, name: "Jane Cooper", email: "jane.cooper@example.com", phone: "(212) 555-0198", role: "Sr. Frontend Engineer", score: 94, date: "Oct 24, 2023" },
  { id: 2, name: "Cody Fisher", email: "cody.fisher@example.com", phone: "(201) 555-0124", role: "Product Manager", score: 82, date: "Oct 23, 2023" },
  { id: 3, name: "Esther Howard", email: "esther.howard@example.com", phone: "(415) 555-0131", role: "UX Designer", score: 78, date: "Oct 23, 2023" },
  { id: 4, name: "Jenny Wilson", email: "jenny.wilson@example.com", phone: "(650) 555-0112", role: "DevOps Engineer", score: 89, date: "Oct 22, 2023" },
  { id: 5, name: "Kristin Watson", email: "kristin.watson@example.com", phone: "(212) 555-0191", role: "Marketing Specialist", score: 65, date: "Oct 21, 2023" },
  { id: 6, name: "Cameron Williamson", email: "cameron.w@example.com", phone: "(408) 555-0129", role: "Backend Developer", score: 91, date: "Oct 20, 2023" },
  { id: 7, name: "Courtney Henry", email: "courtney.h@example.com", phone: "(212) 555-0187", role: "Business Analyst", score: 74, date: "Oct 19, 2023" },
]

export default function CandidatesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-black">Talent Pool</h1>
        <p className="text-muted-foreground mt-1 text-lg">Manage and view all analyzed candidates in your pipeline.</p>
      </div>

      <Card className="border-none shadow-md bg-white">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-10 h-11 border-muted-foreground/20 focus:border-primary" placeholder="Search candidates, roles, skills..." />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="h-11 font-semibold">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" className="h-11 font-semibold">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sort By Score
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b-2">
                <TableHead className="font-bold text-black h-14">Candidate</TableHead>
                <TableHead className="font-bold text-black h-14">Role Analyzed For</TableHead>
                <TableHead className="font-bold text-black h-14 text-center">AI Score</TableHead>
                <TableHead className="font-bold text-black h-14">Analysis Date</TableHead>
                <TableHead className="font-bold text-black h-14 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidates.map((candidate) => (
                <TableRow key={candidate.id} className="group cursor-pointer hover:bg-accent/30 transition-colors">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white font-bold">
                        {candidate.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-black group-hover:text-primary transition-colors">{candidate.name}</div>
                        <div className="text-xs text-muted-foreground">{candidate.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-black">
                    <Badge variant="outline" className="font-bold text-xs uppercase tracking-wider">
                      {candidate.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className={`inline-flex items-center justify-center h-10 w-10 rounded-full font-black text-sm border-2 ${
                      candidate.score >= 85 ? "bg-primary/10 border-primary text-primary" : 
                      candidate.score >= 70 ? "bg-black/5 border-black/20 text-black" : 
                      "bg-destructive/10 border-destructive text-destructive"
                    }`}>
                      {candidate.score}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm flex items-center h-16">
                    <Calendar className="mr-2 h-3 w-3" />
                    {candidate.date}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" className="font-bold text-primary hover:text-primary hover:bg-primary/5">
                      View Report
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}