import { useState } from "react";
import type { Subscription } from "../../types/Subscription";
import { formatCurrency } from "../../utils/formatCurrency";
import PauseSubscriptionModal from "./PauseSubscriptionModal";
import CancelSubscriptionModal from "./CancelSubscriptionModal";

interface SubscriptionCardProps {
  subscription: Subscription;
  onUpdate: () => void;
}

const SubscriptionCard = ({
  subscription,
  onUpdate,
}: SubscriptionCardProps) => {
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "finished":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const canPause = subscription.status === "active";
  const canCancel = ["active", "paused"].includes(subscription.status);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {subscription.meal_plan.name}
            </h3>
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                subscription.status
              )}`}
            >
              {subscription.status.charAt(0).toUpperCase() +
                subscription.status.slice(1)}
            </span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(subscription.total_price)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Meal Types:</p>
            <p className="text-sm text-gray-900">
              {subscription.meal_types
                .map((type) => type.charAt(0).toUpperCase() + type.slice(1))
                .join(", ")}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600">Delivery Days:</p>
            <p className="text-sm text-gray-900">
              {subscription.delivery_days
                .map((day) => day.charAt(0).toUpperCase() + day.slice(1))
                .join(", ")}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600">Start Date:</p>
            <p className="text-sm text-gray-900">
              {formatDate(subscription.start_date)}
            </p>
          </div>

          {subscription.end_date && (
            <div>
              <p className="text-sm font-medium text-gray-600">End Date:</p>
              <p className="text-sm text-gray-900">
                {formatDate(subscription.end_date)}
              </p>
            </div>
          )}
        </div>

        {subscription.status === "paused" &&
          subscription.pause_start_date &&
          subscription.pause_end_date && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-sm font-medium text-yellow-800">
                Paused Period:
              </p>
              <p className="text-sm text-yellow-700">
                {formatDate(subscription.pause_start_date)} -{" "}
                {formatDate(subscription.pause_end_date)}
              </p>
            </div>
          )}

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600">Delivery Address:</p>
          <p className="text-sm text-gray-900">
            {subscription.delivery_address}
          </p>
          {subscription.delivery_notes && (
            <p className="text-xs text-gray-600 mt-1">
              Note: {subscription.delivery_notes}
            </p>
          )}
        </div>

        {subscription.allergies && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-600">Allergies:</p>
            <p className="text-sm text-gray-900">{subscription.allergies}</p>
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          {canPause && (
            <button
              onClick={() => setShowPauseModal(true)}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
            >
              Pause Subscription
            </button>
          )}

          {canCancel && (
            <button
              onClick={() => setShowCancelModal(true)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>

      {showPauseModal && (
        <PauseSubscriptionModal
          subscription={subscription}
          onClose={() => setShowPauseModal(false)}
          onSuccess={() => {
            setShowPauseModal(false);
            onUpdate();
          }}
        />
      )}

      {showCancelModal && (
        <CancelSubscriptionModal
          subscription={subscription}
          onClose={() => setShowCancelModal(false)}
          onSuccess={() => {
            setShowCancelModal(false);
            onUpdate();
          }}
        />
      )}
    </>
  );
};

export default SubscriptionCard;
