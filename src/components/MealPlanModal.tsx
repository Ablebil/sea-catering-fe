import React from "react";
import type { MealPlan } from "../types/MealPlan";

interface MealPlanModalProps {
  plan: MealPlan;
  onClose: () => void;
}

const MealPlanModal: React.FC<MealPlanModalProps> = ({ plan, onClose }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>

      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            &times;
          </button>
          <img
            src={plan.image}
            alt={plan.name}
            className="h-48 w-full object-cover rounded mb-4"
          />
          <h2 className="text-2xl font-semibold text-green-900 mb-2">
            {plan.name}
          </h2>
          <p className="text-green-700 font-bold mb-2">{plan.price}</p>
          <p className="text-gray-700 mb-4">{plan.details}</p>
          <button
            onClick={onClose}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 w-full"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default MealPlanModal;
