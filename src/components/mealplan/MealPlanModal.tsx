import type { MealPlan } from "../../types/MealPlan";
import { formatCurrency } from "../../utils/formatCurrency";

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
          <img
            src={plan.photo_url}
            alt={plan.name}
            className="h-48 w-full object-cover rounded mb-4"
          />
          <h2 className="text-2xl font-semibold text-green-900 mb-2">
            {plan.name}
          </h2>
          <p className="text-green-700 font-bold mb-2">
            {formatCurrency(plan.price)}
          </p>
          <p className="text-gray-700 mb-4">{plan.description}</p>
          <button
            onClick={onClose}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 w-full cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default MealPlanModal;
