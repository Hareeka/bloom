"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Award,
  BookOpen,
  HeartPulse,
  Smile,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  BarChart,
  XAxis,
  YAxis,
  Bar,
} from "recharts";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const lifeBalanceData = [
  { name: "Academics", value: 40, color: "hsl(var(--chart-1))" },
  { name: "Health", value: 30, color: "hsl(var(--chart-2))" },
  { name: "Happiness", value: 30, color: "hsl(var(--chart-3))" },
];

const progressData = [
    { name: 'Mon', completed: 2 },
    { name: 'Tue', completed: 3 },
    { name: 'Wed', completed: 1 },
    { name: 'Thu', completed: 4 },
    { name: 'Fri', completed: 3 },
    { name: 'Sat', completed: 5 },
    { name: 'Sun', completed: 2 },
];


function LifeBalanceMeter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <HeartPulse className="h-5 w-5" />
          Life Balance Meter
        </CardTitle>
        <CardDescription>Your weekly balance across key areas.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-60 w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={lifeBalanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {lifeBalanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-around text-sm">
            <div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-[hsl(var(--chart-1))]"/>Academics</div>
            <div className="flex items-center gap-2"><HeartPulse className="h-4 w-4 text-[hsl(var(--chart-2))]"/>Health</div>
            <div className="flex items-center gap-2"><Smile className="h-4 w-4 text-[hsl(var(--chart-3))]"/>Happiness</div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProgressOverview() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Weekly Progress
                </CardTitle>
                <CardDescription>Tasks completed this week.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="h-60 w-full">
                    <ResponsiveContainer>
                        <BarChart data={progressData}>
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <RechartsTooltip />
                            <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}

function GamificationStatus() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Your Status
                </CardTitle>
                <CardDescription>Keep up the great work!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                        <span>Level 3: Rising Star</span>
                        <span>1250 / 2000 XP</span>
                    </div>
                    <Progress value={62.5} />
                </div>
                <div className="flex justify-around text-center">
                    <div>
                        <p className="text-2xl font-bold">1250</p>
                        <p className="text-sm text-muted-foreground">Total Points</p>
                    </div>
                    <div className="flex items-center">
                         <div className="h-12 border-l"></div>
                    </div>
                    <div>
                        <p className="text-2xl font-bold flex items-center justify-center gap-1">
                            <Zap className="h-6 w-6 text-yellow-500" /> 5 days
                        </p>
                        <p className="text-sm text-muted-foreground">Current Streak</p>
                    </div>
                </div>
                 <div className="space-y-2">
                    <h4 className="font-semibold">Recent Badges</h4>
                    <div className="flex gap-2">
                        <Badge variant="secondary" className="text-base p-2"><span className="mr-1">🚀</span> Quick Starter</Badge>
                        <Badge variant="secondary" className="text-base p-2"><span className="mr-1">🎯</span> Goal-Getter</Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function MotivationalQuote() {
    return (
        <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6">
                <blockquote className="text-lg font-semibold text-center">
                "The secret of getting ahead is getting started."
                </blockquote>
                <p className="text-right text-sm opacity-80 mt-2">- Mark Twain</p>
            </CardContent>
        </Card>
    )
}


export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="col-span-1 xl:col-span-3">
            <h1 className="text-3xl font-bold font-headline">Welcome back, Student!</h1>
            <p className="text-muted-foreground">Here's a snapshot of your journey with Bloom.</p>
        </div>
      
        <div className="lg:col-span-2 xl:col-span-1">
            <LifeBalanceMeter />
        </div>
        
        <div className="lg:col-span-2 xl:col-span-2">
            <ProgressOverview />
        </div>

        <div className="lg:col-span-1 xl:col-span-2">
            <GamificationStatus />
        </div>

        <div className="lg:col-span-1 xl:col-span-1">
             <MotivationalQuote />
        </div>

    </div>
  );
}
