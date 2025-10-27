import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Globe, Link, Lock, Users } from "lucide-react";

export default function GroupStudyPage() {
  return (
    <div className="container mx-auto py-8">
       <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">Group Study</h1>
        <p className="text-lg text-muted-foreground mt-2">Collaborate, learn, and grow together.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
            <CardHeader className="items-center">
                <Globe className="h-10 w-10 text-primary mb-4"/>
                <CardTitle className="font-headline">Join a Public Room</CardTitle>
                <CardDescription>Study with random people.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Button className="w-full">Find a Room</Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="items-center">
                <Link className="h-10 w-10 text-primary mb-4"/>
                <CardTitle className="font-headline">Join with Link</CardTitle>
                <CardDescription>Enter a private room link.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                 <Input placeholder="Enter room link or code"/>
                 <Button className="w-full">Join</Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="items-center">
                <Lock className="h-10 w-10 text-primary mb-4"/>
                <CardTitle className="font-headline">Create a Private Room</CardTitle>
                <CardDescription>Invite your friends to study.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Button className="w-full">Create Room</Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
