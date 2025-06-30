import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { subscriptionService } from "../../api/services/subscriptionService";
import { mealPlanService } from "../../api/services/mealPlanService";
import type { MealPlan } from "../../types/MealPlan";
import { LoadingSpinner, CustomDropdown } from "../index";
import { loadMidtransScript } from "../../utils/midtrans";
import {
  type MidtransSnap,
  type MidtransCallbackResult,
} from "../../types/midtrans";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../hooks/useAuth";

interface SubscriptionFormState {
  name: string;
  phone_number: string;
  delivery_address: string;
  delivery_notes: string;
  meal_plan_id: string;
  meal_types: string[];
  delivery_days: string[];
  allergies: string;
}

declare global {
  interface Window {
    snap: MidtransSnap;
  }
}

const mealTypeOptions = ["breakfast", "lunch", "dinner"];
const dayOptions = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const SubscriptionForm = () => {
  const [form, setForm] = useState<SubscriptionFormState>({
    name: "",
    phone_number: "",
    delivery_address: "",
    delivery_notes: "",
    meal_plan_id: "",
    meal_types: [],
    delivery_days: [],
    allergies: "",
  });

  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        await loadMidtransScript();
        const data = await mealPlanService.getAllMealPlans();
        setMealPlans(data);
      } catch {
        setError("Failed to load meal plans. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchMealPlans();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      const { checked } = e.target;
      if (name === "meal_types" || name === "delivery_days") {
        setForm((prev) => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter((v: string) => v !== value),
        }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const payload = {
        ...form,
        delivery_notes: form.delivery_notes || undefined,
        allergies: form.allergies || undefined,
      };

      const res = await subscriptionService.createSubscription(payload);

      if (res.payload?.token) {
        window.snap.pay(res.payload.token, {
          onSuccess: (result: MidtransCallbackResult) => {
            console.log("Payment success:", result);
            navigate("/dashboard");
          },
          onPending: (result: MidtransCallbackResult) => {
            console.log("Payment pending:", result);
            navigate("/dashboard");
          },
          onError: (result: MidtransCallbackResult) => {
            console.error("Payment error:", result);
            setError(
              result.status_message || "Payment failed. Please try again."
            );
          },
          onClose: () => {
            console.log("Payment popup closed by user.");
          },
        });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading meal plans..." />;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-lg">
          <div className="flex">
            <div className="ml-3">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="e.g., 081234567890"
              />
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Delivery Information
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="delivery_address"
                value={form.delivery_address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                placeholder="Enter your complete delivery address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Notes <span className="text-gray-400">(Optional)</span>
              </label>
              <textarea
                name="delivery_notes"
                value={form.delivery_notes}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                placeholder="Any special instructions for delivery (e.g., gate code, building info)"
              />
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Meal Plan Selection
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Your Meal Plan <span className="text-red-500">*</span>
            </label>
            <CustomDropdown
              placeholder="Select a meal plan"
              options={mealPlans.map((plan) => ({
                value: plan.id,
                label: `${plan.name} - Rp${plan.price.toLocaleString()}`,
              }))}
              value={form.meal_plan_id}
              onChange={(selectedValue) =>
                handleChange({
                  target: { name: "meal_plan_id", value: selectedValue },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
            />
          </div>
        </div>

        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Meal Preferences
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Meal Types <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {mealTypeOptions.map((type) => (
                  <label
                    key={type}
                    className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      form.meal_types.includes(type)
                        ? "border-green-500 bg-green-50 ring-2 ring-green-500 ring-opacity-20"
                        : "border-gray-200 hover:border-green-300 hover:bg-green-25"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="meal_types"
                      value={type}
                      checked={form.meal_types.includes(type)}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-colors ${
                        form.meal_types.includes(type)
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {form.meal_types.includes(type) && (
                        <CheckIcon className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Delivery Days <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {dayOptions.map((day) => (
                  <label
                    key={day}
                    className={`relative flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      form.delivery_days.includes(day)
                        ? "border-green-500 bg-green-50 ring-2 ring-green-500 ring-opacity-20"
                        : "border-gray-200 hover:border-green-300 hover:bg-green-25"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="delivery_days"
                      value={day}
                      checked={form.delivery_days.includes(day)}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`flex-shrink-0 w-4 h-4 rounded border-2 mr-2 flex items-center justify-center transition-colors ${
                        form.delivery_days.includes(day)
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {form.delivery_days.includes(day) && (
                        <CheckIcon className="w-2.5 h-2.5 text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Additional Information
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allergies & Dietary Restrictions{" "}
              <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              type="text"
              name="allergies"
              value={form.allergies}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="e.g., Peanuts, Shellfish, Gluten-free"
            />
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 cursor-pointer"
          >
            {submitting ? "Processing..." : "Create Subscription & Pay"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubscriptionForm;
