import {
  CalendarDaysIcon,
  TruckIcon,
  CurrencyDollarIcon,
  PhoneIcon,
  ShieldCheckIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const SubscriptionBenefitsSection = () => {
  const benefits = [
    {
      icon: <CalendarDaysIcon className="h-8 w-8" />,
      title: "Flexible Scheduling",
      description:
        "Choose your delivery days and meal types. Change anytime through your dashboard.",
    },
    {
      icon: <TruckIcon className="h-8 w-8" />,
      title: "Reliable Delivery",
      description:
        "Fresh meals delivered right to your door on schedule, with real-time tracking.",
    },
    {
      icon: <CurrencyDollarIcon className="h-8 w-8" />,
      title: "No Hidden Fees",
      description:
        "Transparent pricing with no setup fees, delivery charges, or cancellation penalties.",
    },
    {
      icon: <PhoneIcon className="h-8 w-8" />,
      title: "24/7 Support",
      description:
        "Our customer service team is always here to help with any questions or concerns.",
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: "Quality Guarantee",
      description:
        "100% satisfaction guarantee. Not happy? We'll make it right or refund your money.",
    },
    {
      icon: <HeartIcon className="h-8 w-8" />,
      title: "Health First",
      description:
        "Nutritionist-approved meals designed to support your health and wellness goals.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-green-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-900 mb-4">
            Subscription Benefits
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the convenience and peace of mind that comes with our
            premium meal subscription service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-green-100"
            >
              <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-green-900 mb-3 text-center">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-center">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-green-100 p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                1000+
              </div>
              <div className="text-gray-600">Active Subscribers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">4.9★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                99.5%
              </div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionBenefitsSection;
