import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Award, GraduationCap, Zap } from "lucide-react";

const mentors = [
  {
    id: 1,
    name: "Dr. Alisha Grant",
    title: "Lead Data Scientist, TechCorp",
    experience: "12+ years in AI & ML",
    specialties: ["Career Growth", "AI/ML", "Python"],
    image: PlaceHolderImages.find(img => img.id === 'mentor-1'),
  },
  {
    id: 2,
    name: "David Chen",
    title: "Professor of HCI, Stanford University",
    experience: "20 years in Academia",
    specialties: ["Research", "Study Skills", "UX Design"],
    image: PlaceHolderImages.find(img => img.id === 'mentor-2'),
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    title: "Senior PM, Creative Solutions",
    experience: "8 years in Product Management",
    specialties: ["Project Mngmt", "Agile", "Leadership"],
    image: PlaceHolderImages.find(img => img.id === 'mentor-3'),
  }
];

export default function MatchingPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">Find Your Perfect Mentor</h1>
        <p className="text-lg text-muted-foreground mt-2">Based on your preferences, here are your top matches.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mentors.map(mentor => (
          <Card key={mentor.id} className="flex flex-col transform hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-2xl">
            <CardHeader className="items-center text-center">
              {mentor.image && (
                <div className="relative h-28 w-28 rounded-full overflow-hidden border-4 border-primary/20">
                    <Image
                      src={mentor.image.imageUrl}
                      alt={`Profile of ${mentor.name}`}
                      fill
                      className="object-cover"
                      data-ai-hint={mentor.image.imageHint}
                    />
                </div>
              )}
              <CardTitle className="font-headline text-2xl mt-4">{mentor.name}</CardTitle>
              <CardDescription>{mentor.title}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">{mentor.experience}</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <div>
                    <div className="flex flex-wrap gap-2">
                        {mentor.specialties.map(spec => <Badge key={spec} variant="secondary">{spec}</Badge>)}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/plan">
                    <Zap className="mr-2 h-4 w-4" />
                    Select & Generate Plan
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
