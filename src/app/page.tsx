import { Button } from "@/components/ui/button";
import { Leaf, Award, Zap } from "lucide-react";
import Link from "next/link";
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

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
        <section className="py-24 md:py-32 lg:py-40 text-center">
          <div className="container">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tighter">
              Nurturing Growth, One Goal at a Time.
            </h1>
            <p className="max-w-3xl mx-auto mt-6 text-lg md:text-xl text-muted-foreground">
              Bloom transforms mentor advice into actionable plans. Match with experts, get AI-powered guidance, and watch yourself flourish.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/onboarding">I'm a Student</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/mentor-onboarding">I'm a Mentor</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-card/50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col items-center text-center p-6 border border-border/50 rounded-lg">
                  <div className="bg-secondary p-3 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-headline text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="container py-8 flex items-center justify-between">
          <Logo />
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Bloom. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
