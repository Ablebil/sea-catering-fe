import { useState, useEffect } from "react";
import { MealPlanModal, HorizontalScroll } from "../components";
import { mealPlanService } from "../services/mealPlanService";
import type { MealPlan } from "../types/MealPlan";

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
    return <div className="text-center py-10">Loading meal plans...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-900">
        Our Meal Plans
      </h1>

      <HorizontalScroll plans={plans} onSeeMore={handleSeeMore} />

      {selectedPlan && (
        <MealPlanModal plan={selectedPlan} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default MealPlansPage;
