import { useState, useEffect } from "react";
import {
  MealPlanModal,
  MealPlanHorizontalScroll,
  StatsSection,
  FAQSection,
} from "../components";
import { mealPlanService } from "../api/services/mealPlanService";
import type { MealPlan } from "../types/MealPlan";
import { LoadingSpinner } from "../components";

const MealPlansPage = () => {
  const [plans, setPlans] = useState<MealPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await mealPlanService.getAllMealPlans();
        setPlans(data);
      } catch (err) {
        setError("Failed to load meal plans. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSeeMore = async (planId: string) => {
    try {
      const planDetails = await mealPlanService.getMealPlanById(planId);
      if (planDetails) {
        setSelectedPlan(planDetails);
      } else {
        setError("Could not find details for the selected plan.");
      }
    } catch (err) {
      setError("Failed to fetch plan details.");
      console.error(err);
    }
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading meal plans..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-2">
            Our Meal Plans
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our variety of healthy and delicious meal plans designed
            by nutritionists to fit your lifestyle and dietary needs.
          </p>
        </div>

        <div className="mb-8">
          <MealPlanHorizontalScroll plans={plans} onSeeMore={handleSeeMore} />
        </div>

        <StatsSection />
        <FAQSection />
        {selectedPlan && (
          <MealPlanModal plan={selectedPlan} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
};

export default MealPlansPage;
