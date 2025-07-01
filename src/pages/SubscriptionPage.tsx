import { SubscriptionForm, FAQSection } from "../components";
import SubscriptionBenefitsSection from "../components/subscription/SubscriptionBenefitsSection";
import SubscriptionStepsSection from "../components/subscription/SubscriptionStepsSection";

const SubscriptionPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-2">
            Create Your Subscription
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start your journey to healthier eating with our personalized meal
            delivery service. Choose your preferences and we'll handle the rest.
          </p>
        </div>

        <SubscriptionForm />
      </div>

      <div className="mt-16">
        <SubscriptionBenefitsSection />
        <SubscriptionStepsSection />

        <div className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <FAQSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
