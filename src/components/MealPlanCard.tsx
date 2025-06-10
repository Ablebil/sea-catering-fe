import React from "react";
import type { MealPlan } from "../types/MealPlan";

interface MealPlanCardProps {
  plan: MealPlan;
  onSeeMore: (plan: MealPlan) => void;
}

const MealPlanCard: React.FC<MealPlanCardProps> = ({ plan, onSeeMore }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
      <img
        src={plan.image}
        alt={plan.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-green-900 mb-2">
          {plan.name}
        </h2>
        <p className="text-green-700 font-bold mb-2">{plan.price}</p>
        <p className="text-gray-700 flex-grow">{plan.description}</p>
        <button
          onClick={() => onSeeMore(plan)}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          See More Details
        </button>
      </div>
    </div>
  );
};

export default MealPlanCard;
