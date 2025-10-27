
import { FirebaseClientProvider } from "@/firebase";
import { OnboardingFormComponent } from "@/app/onboarding/onboarding-form";

export default function OnboardingPage() {
    return (
        <FirebaseClientProvider>
            <OnboardingFormComponent />
        </FirebaseClientProvider>
    );
}
