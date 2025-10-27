import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Leaf, Zap, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Logo } from "@/components/logo";

const features = [
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: "Personalized Growth Plans",
    description: "AI-powered 7-day plans tailored to your goals, generated from expert mentor advice.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Stay Motivated",
    description: "Earn points, level up, and unlock badges. Our gamified system keeps you engaged.",
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Track Your Progress",
    description: "Visualize your success with intuitive dashboards and a unique Life Balance Meter.",
  },
];

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Logo />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/onboarding">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/onboarding">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
                Nurturing Growth, One Goal at a Time.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Bloom transforms mentor advice into actionable plans. Match with experts, get AI-powered guidance, and watch yourself flourish.
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link href="/onboarding">Start Your Journey Free</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary/50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Why Choose Bloom?</h2>
              <p className="text-lg text-muted-foreground mt-4">
                We provide the structure and motivation you need to turn aspirations into achievements.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="items-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="font-headline text-xl text-center">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container py-8 flex items-center justify-between">
          <Logo />
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Bloom. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
