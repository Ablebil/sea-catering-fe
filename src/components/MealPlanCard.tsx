import React from "react";
import type { MealPlan } from "../types/MealPlan";
import { formatCurrency } from "../utils/formatCurrency";

interface MealPlanCardProps {
  plan: MealPlan;
  onSeeMore: (planId: string) => void;
}

const MealPlanCard: React.FC<MealPlanCardProps> = ({ plan, onSeeMore }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
      <img
        src={plan.photo_url}
        alt={plan.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-green-900 mb-2">
          {plan.name}
        </h2>
        <p className="text-green-700 font-bold mb-2">
          {formatCurrency(plan.price)}
        </p>
        <p className="text-gray-700 flex-grow line-clamp-2">
          {plan.description}
        </p>
        <button
          onClick={() => onSeeMore(plan.id)}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
        >
          See More Details
        </button>
      </div>
    </div>
  );
};

export default MealPlanCard;
