"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const students = [
  { name: 'Alex Johnson', completion: 85, streak: 12, missed: 1 },
  { name: 'Maria Garcia', completion: 62, streak: 3, missed: 5 },
  { name: 'Chen Wei', completion: 95, streak: 25, missed: 0 },
  { name: 'Fatima Al-Sayed', completion: 78, streak: 8, missed: 2 },
];

const engagementData = [
  { student: 'Alex', timeSpent: 5.5 },
  { student: 'Maria', timeSpent: 3.2 },
  { student: 'Chen', timeSpent: 6.8 },
  { student: 'Fatima', timeSpent: 4.9 },
];

export default function MentorDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
          <h1 className="text-4xl font-bold font-headline">Mentor Dashboard</h1>
          <p className="text-lg text-muted-foreground mt-2">Overview of your students' progress.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Completion Rate</TableHead>
                <TableHead className="text-center">Streak</TableHead>
                <TableHead className="text-center">Missed Tasks (7d)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map(student => (
                <TableRow key={student.name}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`https://picsum.photos/seed/${student.name}/40/40`} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {student.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <Progress value={student.completion} className="w-40" />
                        <span>{student.completion}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">{student.streak} days</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                     <Badge variant={student.missed > 3 ? "destructive" : "outline"}>
                        {student.missed}
                     </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Engagement (Time Spent this Week)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer>
              <BarChart data={engagementData}>
                <XAxis dataKey="student" />
                <YAxis unit="h" />
                <Tooltip cursor={{fill: 'hsl(var(--muted))'}} contentStyle={{backgroundColor: 'hsl(var(--background))'}}/>
                <Bar dataKey="timeSpent" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
