import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, Bell } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

export default function RemindersPage() {
  return (
    <div className="container mx-auto py-8">
       <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">Set Reminders</h1>
        <p className="text-lg text-muted-foreground mt-2">Stay on track with your goals.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card>
            <CardHeader className="items-center">
                <CalendarIcon className="h-10 w-10 text-primary mb-4"/>
                <CardTitle className="font-headline">Schedule a Reminder</CardTitle>
                <CardDescription>Select a date and time.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                 <Calendar
                    mode="single"
                    className="rounded-md border"
                />
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="items-center">
                <Bell className="h-10 w-10 text-primary mb-4"/>
                <CardTitle className="font-headline">Reminder Details</CardTitle>
                <CardDescription>What should we remind you about?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <Input type="time" />
                 <Input placeholder="Reminder details..."/>
                 <Button className="w-full">Set Reminder</Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
