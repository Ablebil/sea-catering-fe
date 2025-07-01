import {
  DocumentTextIcon,
  CreditCardIcon,
  TruckIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const SubscriptionStepsSection = () => {
  const steps = [
    {
      step: "1",
      title: "Fill Out the Form",
      description:
        "Complete the subscription form above with your personal details, meal preferences, and delivery information.",
      icon: <DocumentTextIcon className="h-8 w-8" />,
      color: "blue",
    },
    {
      step: "2",
      title: "Secure Payment",
      description:
        "Make your payment securely through our encrypted payment gateway powered by Midtrans.",
      icon: <CreditCardIcon className="h-8 w-8" />,
      color: "green",
    },
    {
      step: "3",
      title: "Receive Your Meals",
      description:
        "Get fresh, delicious meals delivered to your doorstep according to your chosen schedule.",
      icon: <TruckIcon className="h-8 w-8" />,
      color: "yellow",
    },
    {
      step: "4",
      title: "Enjoy & Manage",
      description:
        "Enjoy your meals and easily manage your subscription through your personal dashboard.",
      icon: <StarIcon className="h-8 w-8" />,
      color: "purple",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-100",
          text: "text-blue-600",
          border: "border-blue-200",
        };
      case "green":
        return {
          bg: "bg-green-100",
          text: "text-green-600",
          border: "border-green-200",
        };
      case "yellow":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-600",
          border: "border-yellow-200",
        };
      case "purple":
        return {
          bg: "bg-purple-100",
          text: "text-purple-600",
          border: "border-purple-200",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          border: "border-gray-200",
        };
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-900 mb-4">
            How Your Subscription Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started is simple. Follow these easy steps to begin your
            healthy meal journey.
          </p>
        </div>

        <div className="hidden lg:flex justify-between items-start">
          {steps.map((step, index) => {
            const colors = getColorClasses(step.color);
            return (
              <div key={index} className="relative flex-1 text-center px-4">
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 z-10" />
                )}

                <div className="relative mb-6">
                  <div
                    className={`absolute -top-3 -left-3 ${colors.bg} ${colors.text} rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold border-2 border-white shadow-md z-30`}
                  >
                    {step.step}
                  </div>

                  <div
                    className={`${colors.bg} ${colors.text} rounded-full w-16 h-16 flex items-center justify-center mx-auto relative z-20 shadow-lg border-2 ${colors.border}`}
                  >
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="block lg:hidden space-y-6">
          {steps.map((step, index) => {
            const colors = getColorClasses(step.color);
            return (
              <div
                key={index}
                className={`flex items-start space-x-4 p-6 bg-gray-50 rounded-xl border-l-4 ${colors.border}`}
              >
                <div className="flex-shrink-0 relative">
                  <div
                    className={`absolute -top-2 -left-2 ${colors.bg} ${colors.text} rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold border-2 border-white z-30`}
                  >
                    {step.step}
                  </div>

                  <div
                    className={`${colors.bg} ${colors.text} rounded-full w-12 h-12 flex items-center justify-center relative z-20`}
                  >
                    {step.icon}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionStepsSection;
