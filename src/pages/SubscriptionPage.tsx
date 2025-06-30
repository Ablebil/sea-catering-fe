import SubscriptionForm from "../components/subscription/SubscriptionForm";

const SubscriptionPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-2">
            Create Your Subscription
          </h1>
        </div>

        <SubscriptionForm />
      </div>
    </div>
  );
};

export default SubscriptionPage;
