import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Tag, User } from "lucide-react";
import Image from "next/image";

const workshops = [
    {
        title: "Mastering Public Speaking",
        host: "Dr. Alisha Grant",
        category: "Soft Skills",
        duration: "1 hour",
        image: PlaceHolderImages.find(img => img.id === 'workshop-1')
    },
    {
        title: "Intro to Agile Project Management",
        host: "Sofia Rodriguez",
        category: "Career",
        duration: "1.5 hours",
        image: PlaceHolderImages.find(img => img.id === 'workshop-2')
    },
    {
        title: "Mindfulness for Students",
        host: "David Chen",
        category: "Wellness",
        duration: "45 mins",
        image: PlaceHolderImages.find(img => img.id === 'workshop-3')
    }
]

export default function WorkshopsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">Workshops & Demos</h1>
        <p className="text-lg text-muted-foreground mt-2">Level up your skills with expert-led sessions.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {workshops.map((workshop, index) => (
            <Card key={index} className="overflow-hidden flex flex-col">
                {workshop.image && (
                    <div className="relative aspect-video">
                        <Image src={workshop.image.imageUrl} alt={workshop.title} fill className="object-cover" data-ai-hint={workshop.image.imageHint}/>
                    </div>
                )}
                <CardHeader>
                    <CardTitle className="font-headline">{workshop.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground"><User className="h-4 w-4"/><span>Hosted by {workshop.host}</span></div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4"/><span>{workshop.duration}</span></div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground"><Tag className="h-4 w-4"/><span><Badge variant="outline">{workshop.category}</Badge></span></div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Register Now</Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
