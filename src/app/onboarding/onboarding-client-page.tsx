'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const OnboardingFormComponent = dynamic(
  () => import('@/app/onboarding/onboarding-form').then(mod => mod.OnboardingFormComponent),
  { 
    ssr: false,
    loading: () => (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
          <div className="w-full max-w-2xl bg-card rounded-lg">
            <div className="text-center p-6">
              <Skeleton className="h-8 w-32 mx-auto mb-4" />
              <Skeleton className="h-8 w-64 mx-auto" />
              <Skeleton className="h-4 w-80 mx-auto mt-2" />
            </div>
            <div className="p-6 pt-0 space-y-6">
              <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
              <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
              <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
              <Skeleton className="h-11 w-full" />
            </div>
          </div>
       </div>
    ),
  }
);

export default function OnboardingClientPage() {
    return <OnboardingFormComponent />;
}
