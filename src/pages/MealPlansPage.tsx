import { useState } from "react";
import { MealPlanModal, HorizontalScroll } from "../components";
import type { MealPlan } from "../types/MealPlan";
import healthyFoodImg from "../assets/healthy-food.jpg";
import ketoFoodImg from "../assets/keto-food.jpg";
import veganFoodImg from "../assets/vegan-food.jpg";
import familyFoodImg from "../assets/family-food.jpg";

const mealPlans: MealPlan[] = [
  {
    id: 1,
    name: "Healthy Plan",
    price: 1500000,
    description: "Balanced meals for a healthy lifestyle.",
    details: "Includes breakfast, lunch, and dinner with balanced nutrients.",
    image: healthyFoodImg,
  },
  {
    id: 2,
    name: "Keto Plan",
    price: 1800000,
    description: "Low-carb, high-fat meals for ketogenic diet.",
    details: "Focus on high-fat, low-carb meals to promote ketosis.",
    image: ketoFoodImg,
  },
  {
    id: 3,
    name: "Vegan Plan",
    price: 1200000,
    description: "Delicious and nutritious plant-based meals.",
    details: "100% plant-based ingredients. Suitable for vegans.",
    image: veganFoodImg,
  },
  {
    id: 4,
    name: "Family Menu Plan",
    price: 2000000,
    description: "Wholesome family-friendly meals for 3-4 persons.",
    details:
      "Includes a variety of family-friendly meals with options for kids and adults. Ideal for busy households.",
    image: familyFoodImg,
  },
];

const MealPlansPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<MealPlan | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-900">
        Our Meal Plans
      </h1>

      <HorizontalScroll plans={mealPlans} onSeeMore={setSelectedPlan} />

      {selectedPlan && (
        <MealPlanModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
};

export default MealPlansPage;
