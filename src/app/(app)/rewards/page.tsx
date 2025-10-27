
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, Star, Zap } from "lucide-react";
import Link from "next/link";

const premiumFeatures = [
    "Unlimited AI Plan Generations",
    "Advanced Analytics & Insights",
    "Priority Mentor Matching",
    "Exclusive Workshops",
    "Track Soft-Skills Development",
    "Ad-free Experience"
];

const requiredPoints = 1000;

// TODO: Replace with actual user points from your backend
const currentUserPoints = 850; 

export default function RewardsPage() {
    const canUpgrade = currentUserPoints >= requiredPoints;
    const progressPercentage = (currentUserPoints / requiredPoints) * 100;

  return (
    <div className="container mx-auto py-8 flex justify-center">
        <Card className="w-full max-w-2xl text-center shadow-lg">
            <CardHeader>
                <div className="mx-auto bg-yellow-400/10 p-4 rounded-full w-fit mb-4">
                    <Star className="h-10 w-10 text-yellow-400" />
                </div>
                <CardTitle className="font-headline text-3xl">Unlock Bloom Premium</CardTitle>
                <CardDescription>
                    Supercharge your growth with exclusive features and rewards by earning points.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="p-6 bg-secondary/50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-primary">{currentUserPoints} / {requiredPoints}</p>
                    <p className="text-sm font-medium text-muted-foreground">Reward Points</p>
                    <Progress value={progressPercentage} className="mt-2" />
                    <p className="text-xs text-muted-foreground mt-2">Earn points by attending workshops and completing sessions!</p>
                </div>
                <ul className="space-y-2 text-left">
                    {premiumFeatures.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-green-500" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
               
                <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black" disabled={!canUpgrade}>
                    {canUpgrade ? (
                        <>
                            <Zap className="mr-2 h-4 w-4" />
                            Upgrade to Premium for Free!
                        </>
                    ): (
                        <>
                            <Zap className="mr-2 h-4 w-4" />
                            Upgrade Now
                        </>
                    )}
                </Button>
                 {!canUpgrade && (
                    <p className="text-sm text-muted-foreground">
                        You need {requiredPoints - currentUserPoints} more points to unlock Premium for free.
                    </p>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
