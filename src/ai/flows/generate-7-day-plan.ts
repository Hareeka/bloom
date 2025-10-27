'use server';

/**
 * @fileOverview Converts mentor's advice into a structured 7-day plan.
 *
 * - generate7DayPlan - A function that generates a 7-day plan from mentor advice.
 * - Generate7DayPlanInput - The input type for the generate7DayPlan function.
 * - Generate7DayPlanOutput - The return type for the generate7DayPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const Generate7DayPlanInputSchema = z.object({
  mentorAdvice: z.string().describe('The advice provided by the mentor.'),
});
export type Generate7DayPlanInput = z.infer<typeof Generate7DayPlanInputSchema>;

const Generate7DayPlanOutputSchema = z.object({
  plan: z.array(
    z.object({
      day: z.number().describe('The day number (1-7).'),
      tasks: z.array(
        z.object({
          task: z.string().describe('A specific task to be completed.'),
          timing: z.string().describe('The estimated time to complete the task.'),
          priority: z.enum(['high', 'medium', 'low']).describe('The priority of the task.'),
          milestone: z.string().describe('The milestone this task contributes to.'),
          risks: z.string().describe('Potential risks associated with the task.'),
          mitigation: z.string().describe('Tips to mitigate the risks.'),
        })
      ).describe('A list of tasks for the day.'),
    })
  ).describe('A structured 7-day plan.'),
});
export type Generate7DayPlanOutput = z.infer<typeof Generate7DayPlanOutputSchema>;

export async function generate7DayPlan(input: Generate7DayPlanInput): Promise<Generate7DayPlanOutput> {
  return generate7DayPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generate7DayPlanPrompt',
  input: {schema: Generate7DayPlanInputSchema},
  output: {schema: Generate7DayPlanOutputSchema},
  prompt: `You are an AI assistant designed to convert mentor's advice into a structured 7-day plan.

  The plan should include tasks, timings, priorities (high, medium, low), milestones, risks, and mitigation tips for each day.

  Mentor's Advice: {{{mentorAdvice}}}

  Ensure that the plan is detailed and actionable, providing clear steps for the student to follow.
  The output should be a JSON array where each entry is a day and that day includes a list of tasks.
  Each task should include the fields: task, timing, priority, milestone, risks, and mitigation.
  The day field should be an integer from 1 to 7.
  Priorities should be either high, medium, or low.
  Milestones should be a very short objective that completing the task helps achieve.
  Risks should be a short potential obstacle to completing the task.
  Mitigation should be a short tip on how to avoid or overcome that obstacle.
  `,
});

const generate7DayPlanFlow = ai.defineFlow(
  {
    name: 'generate7DayPlanFlow',
    inputSchema: Generate7DayPlanInputSchema,
    outputSchema: Generate7DayPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
