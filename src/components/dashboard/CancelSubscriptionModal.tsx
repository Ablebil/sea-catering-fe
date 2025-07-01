import { useState } from "react";
import type { Subscription } from "../../types/Subscription";
import { subscriptionService } from "../../api/services/subscriptionService";

interface CancelSubscriptionModalProps {
  subscription: Subscription;
  onClose: () => void;
  onSuccess: () => void;
}

const CancelSubscriptionModal = ({
  subscription,
  onClose,
  onSuccess,
}: CancelSubscriptionModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmText, setConfirmText] = useState("");

  const isConfirmValid = confirmText.toLowerCase() === "cancel";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConfirmValid) {
      setError('Please type "cancel" to confirm');
      return;
    }

    setLoading(true);
    setError("");

    try {
      await subscriptionService.cancelSubscription(subscription.id);
      onSuccess();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
          {/* Header */}
          <h3 className="text-lg font-semibold text-red-900 mb-4">
            Cancel Subscription
          </h3>

          {/* Warning */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-medium mb-2">⚠️ Warning</p>
            <p className="text-red-700 text-sm">
              This action cannot be undone. Once cancelled, you will need to
              create a new subscription if you want to resume the service.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Confirmation Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type "cancel" to confirm cancellation:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="cancel"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-300 cursor-pointer"
              >
                Keep Subscription
              </button>
              <button
                type="submit"
                disabled={loading || !isConfirmValid}
                className={`flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ${
                  loading || !isConfirmValid
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {loading ? "Cancelling..." : "Cancel Subscription"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CancelSubscriptionModal;
