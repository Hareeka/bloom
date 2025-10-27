import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Video } from "lucide-react";
import Link from "next/link";

export default function SessionsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold font-headline">Live Sessions</h1>
          <p className="text-lg text-muted-foreground mt-2">Connect 1:1 with your mentor.</p>
        </div>
        <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule New Session
        </Button>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold font-headline mb-4">Upcoming Session</h2>
          <Card>
            <CardHeader>
                <CardTitle>Career Path Discussion</CardTitle>
                <CardDescription>with Dr. Alisha Grant</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
                 <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-5 w-5 text-primary"/> <span>Tomorrow, June 25th</span></div>
                 <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-5 w-5 text-primary"/> <span>4:00 PM (your time)</span></div>
                 <Button asChild>
                    <Link href="/session/career-path-discussion">
                        <Video className="mr-2 h-4 w-4"/>
                        Join Video Call
                    </Link>
                 </Button>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold font-headline mb-4">Past Sessions</h2>
            <Card className="opacity-70">
                <CardHeader>
                    <CardTitle>Project Brainstorming</CardTitle>
                    <CardDescription>with Dr. Alisha Grant</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-4 items-center">
                    <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-5 w-5 text-primary"/> <span>June 18th</span></div>
                    <div className="flex items-center gap-2 text-muted-foreground"><Badge variant="outline">Completed</Badge></div>
                    <Button variant="secondary">View Notes</Button>
                </CardContent>
            </Card>
        </section>
      </div>
    </div>
  );
}
