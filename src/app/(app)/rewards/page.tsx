import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap } from "lucide-react";

const premiumFeatures = [
    "Unlimited AI Plan Generations",
    "Advanced Analytics & Insights",
    "Priority Mentor Matching",
    "Exclusive Workshops",
    "Track Soft-Skills Development",
    "Ad-free Experience"
]

export default function RewardsPage() {
  return (
    <div className="container mx-auto py-8 flex justify-center">
        <Card className="w-full max-w-2xl text-center shadow-lg">
            <CardHeader>
                <div className="mx-auto bg-yellow-400/10 p-4 rounded-full w-fit mb-4">
                    <Star className="h-10 w-10 text-yellow-400" />
                </div>
                <CardTitle className="font-headline text-3xl">Unlock Bloom Premium</CardTitle>
                <CardDescription>
                    Supercharge your growth with exclusive features and rewards.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <ul className="space-y-2 text-left">
                    {premiumFeatures.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-green-500" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
                <div className="p-6 bg-secondary/50 rounded-lg">
                    <p className="font-semibold">Special offer for active users!</p>
                    <p>Upgrade now and get 3 months free.</p>
                </div>
                <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                    <Zap className="mr-2 h-4 w-4" />
                    Upgrade Now
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
