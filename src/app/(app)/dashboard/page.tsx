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
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, where, limit, orderBy, Timestamp } from "firebase/firestore";
import { subDays } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

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
  const { user } = useUser();
  const firestore = useFirestore();

  const journalEntriesQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    const sevenDaysAgo = subDays(new Date(), 7);
    return query(
      collection(firestore, `students/${user.uid}/journal_entries`),
      where('date', '>=', Timestamp.fromDate(sevenDaysAgo)),
      orderBy('date', 'desc'),
      limit(7)
    );
  }, [user, firestore]);

  const { data: journalEntries, isLoading } = useCollection(journalEntriesQuery);

  const lifeBalanceData = React.useMemo(() => {
    if (!journalEntries || journalEntries.length === 0) {
      return [
        { name: "Academics", value: 33.3, color: "hsl(var(--chart-1))" },
        { name: "Health", value: 33.3, color: "hsl(var(--chart-2))" },
        { name: "Happiness", value: 33.3, color: "hsl(var(--chart-3))" },
      ];
    }
    
    const totals = journalEntries.reduce((acc, entry) => {
        acc.academics += entry.academicsScore;
        acc.health += entry.healthScore;
        acc.happiness += entry.happinessScore;
        return acc;
    }, {academics: 0, health: 0, happiness: 0});

    const numEntries = journalEntries.length;
    return [
        { name: "Academics", value: totals.academics / numEntries, color: "hsl(var(--chart-1))" },
        { name: "Health", value: totals.health / numEntries, color: "hsl(var(--chart-2))" },
        { name: "Happiness", value: totals.happiness / numEntries, color: "hsl(var(--chart-3))" },
    ];

  }, [journalEntries]);


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
         {isLoading ? (
            <div className="h-60 w-full flex items-center justify-center">
                <Skeleton className="h-48 w-48 rounded-full" />
            </div>
         ) : (
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
                    label={({ name, value }) =>
                    `${name} ${value.toFixed(0)}%`
                    }
                >
                    {lifeBalanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <RechartsTooltip formatter={(value, name) => [`${(value as number).toFixed(1)}%`, name]} />
                </PieChart>
            </ResponsiveContainer>
            </div>
         )}
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
                            <Zap className="h-6 w-6 text-accent" /> 5 days
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
        <Card className="bg-gradient-to-r from-[#FFB6C1] to-[#A16AE8] text-white">
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
    const { user, isUserLoading } = useUser();
    
    if (isUserLoading) {
        return (
             <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <div className="col-span-1 xl:col-span-3">
                    <Skeleton className="h-10 w-1/2" />
                    <Skeleton className="h-6 w-1/3 mt-2" />
                </div>
                 <div className="lg:col-span-2 xl:col-span-1">
                    <Skeleton className="h-96" />
                </div>
                <div className="lg:col-span-2 xl:col-span-2">
                    <Skeleton className="h-96" />
                </div>
                 <div className="lg:col-span-1 xl:col-span-2">
                    <Skeleton className="h-80" />
                </div>
                 <div className="lg:col-span-1 xl:col-span-1">
                    <Skeleton className="h-80" />
                </div>
             </div>
        )
    }

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="col-span-1 xl:col-span-3">
            <h1 className="text-3xl font-bold font-headline">Welcome back, {user?.isAnonymous ? 'Student' : (user?.displayName || 'Student')}!</h1>
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
