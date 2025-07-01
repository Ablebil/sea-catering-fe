import { useState, useEffect } from "react";
import { subscriptionService } from "../../api/services/subscriptionService";
import type { Subscription } from "../../types/Subscription";
import LoadingSpinner from "../common/LoadingSpinner";
import SubscriptionCard from "./SubscriptionCard";

const SubscriptionsSection = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const data = await subscriptionService.getUserSubscriptions();
      setSubscriptions(data);
      setError("");
    } catch (err) {
      setError("Failed to load subscriptions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  if (loading) return <LoadingSpinner text="Loading subscriptions..." />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-green-900">
          My Subscriptions
        </h2>
        <button
          onClick={fetchSubscriptions}
          className="text-green-600 hover:text-green-700 text-sm font-medium cursor-pointer transition duration-200"
        >
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Subscriptions List */}
      {subscriptions.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <div className="max-w-sm mx-auto">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No subscriptions yet
            </h3>
            <p className="text-gray-600 mb-4">
              You don't have any subscriptions yet. Create your first
              subscription to get started.
            </p>
            <a
              href="/subscription"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
            >
              Create Your First Subscription
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              onUpdate={fetchSubscriptions}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionsSection;
