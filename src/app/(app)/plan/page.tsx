'use client';

import React, { useState, useTransition } from 'react';
import { generate7DayPlan, Generate7DayPlanOutput } from '@/ai/flows/generate-7-day-plan';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Zap, Sprout } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const priorityColors = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500',
};

function PlanDisplay({ planData }: { planData: Generate7DayPlanOutput }) {
  return (
    <div className="space-y-8">
       <div className="text-center">
        <h2 className="text-3xl font-bold font-headline">Your 7-Day Bloom Plan</h2>
        <p className="text-muted-foreground">Follow these steps to achieve your goals.</p>
      </div>
      <Accordion type="single" collapsible defaultValue="day-1" className="w-full space-y-4">
        {planData.plan.map((day) => (
          <Card key={day.day}>
            <AccordionItem value={`day-${day.day}`} className="border-b-0">
                <AccordionTrigger className="p-6 text-lg font-headline">
                  Day {day.day}: {day.tasks[0]?.milestone || `Focus for the Day`}
                </AccordionTrigger>
              <AccordionContent className="p-6 pt-0">
                <div className="space-y-4">
                  {day.tasks.map((task, index) => (
                    <Card key={index} className="p-4 bg-background">
                       <div className="flex items-start space-x-4">
                        <Checkbox id={`task-${day.day}-${index}`} className="mt-1" />
                        <div className="grid gap-1.5 w-full">
                          <label
                            htmlFor={`task-${day.day}-${index}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                           {task.task}
                          </label>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'secondary' : 'default'} className="capitalize">{task.priority} Priority</Badge>
                            <span>Est. Time: {task.timing}</span>
                          </div>
                        </div>
                      </div>
                      <Accordion type="single" collapsible className="w-full mt-2">
                          <AccordionItem value="details" className="border-b-0">
                              <AccordionTrigger className="text-xs py-1 justify-start gap-1 text-muted-foreground hover:no-underline">
                                  Show Details
                              </AccordionTrigger>
                              <AccordionContent className="pt-2">
                                <Alert>
                                    <Sprout className="h-4 w-4" />
                                    <AlertTitle>Task Details</AlertTitle>
                                    <AlertDescription>
                                        <p><strong>Milestone:</strong> {task.milestone}</p>
                                        <p><strong>Risks:</strong> {task.risks}</p>
                                        <p><strong>Mitigation:</strong> {task.mitigation}</p>
                                    </AlertDescription>
                                </Alert>
                              </AccordionContent>
                          </AccordionItem>
                      </Accordion>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Card>
        ))}
      </Accordion>
    </div>
  );
}

export default function PlanPage() {
  const [mentorAdvice, setMentorAdvice] = useState('');
  const [plan, setPlan] = useState<Generate7DayPlanOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGeneratePlan = () => {
    if (!mentorAdvice.trim()) {
      toast({
        title: 'Input required',
        description: 'Please enter some advice from your mentor.',
        variant: 'destructive',
      });
      return;
    }
    startTransition(async () => {
      try {
        const result = await generate7DayPlan({ mentorAdvice });
        if (result && result.plan) {
          setPlan(result);
          toast({
            title: 'Plan Generated!',
            description: 'Your 7-day Bloom plan is ready.',
          });
        } else {
          throw new Error('Invalid plan structure received.');
        }
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error Generating Plan',
          description: 'Could not generate the plan. Please try again.',
          variant: 'destructive',
        });
      }
    });
  };

  if (plan) {
    return <PlanDisplay planData={plan} />;
  }

  return (
    <div className="container mx-auto py-8 flex justify-center">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
              <Sprout className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">Generate Your Growth Plan</CardTitle>
          <CardDescription>
            Enter your mentor's advice below. Our AI will craft a personalized 7-day action plan to help you grow.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="e.g., 'Focus on breaking down large problems. Practice one LeetCode problem daily. Spend time reviewing fundamentals of data structures...'"
            value={mentorAdvice}
            onChange={(e) => setMentorAdvice(e.target.value)}
            rows={8}
            className="text-base"
          />
          <Button onClick={handleGeneratePlan} disabled={isPending} className="w-full" size="lg">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
               <>
                <Zap className="mr-2 h-4 w-4" />
                Generate Plan
               </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
