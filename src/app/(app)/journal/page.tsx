import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen } from "lucide-react";

export default function JournalPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
              <BookOpen className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">My Daily Journal</CardTitle>
          <CardDescription>
            Reflect on your day, track your experiences, and nurture your growth.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <Textarea 
             placeholder="How was your day? What did you learn? What challenges did you face?" 
             className="min-h-[300px] text-base"
           />
           <Button className="w-full" size="lg">Save Entry</Button>
        </CardContent>
      </Card>
    </div>
  );
}
