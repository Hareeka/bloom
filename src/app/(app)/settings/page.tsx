import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Accessibility } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
        <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                    <Accessibility className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="font-headline text-3xl">Accessibility Settings</CardTitle>
                <CardDescription>
                    Customize the app's appearance to suit your needs.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="text-size" className="text-base">Text Size</Label>
                        <p className="text-sm text-muted-foreground">Make text larger or smaller.</p>
                    </div>
                    <Select defaultValue="medium">
                        <SelectTrigger id="text-size" className="w-[180px]">
                            <SelectValue placeholder="Select size"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="contrast-mode" className="text-base">High Contrast Mode</Label>
                        <p className="text-sm text-muted-foreground">Increase text and background contrast.</p>
                    </div>
                    <Switch id="contrast-mode" />
                </div>
                 <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="reduce-motion" className="text-base">Reduce Motion</Label>
                        <p className="text-sm text-muted-foreground">Disable decorative animations.</p>
                    </div>
                    <Switch id="reduce-motion" />
                </div>
                <Button className="w-full" size="lg">Save Changes</Button>
            </CardContent>
        </Card>
    </div>
  );
}
