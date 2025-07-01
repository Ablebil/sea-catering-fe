import {
  UserPlusIcon,
  ClipboardDocumentListIcon,
  TruckIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const HowItWorksSection = () => {
  const steps = [
    {
      step: "1",
      title: "Sign Up & Choose Plan",
      description:
        "Create your account and select the meal plan that fits your lifestyle and dietary needs.",
      icon: <UserPlusIcon className="h-8 w-8" />,
    },
    {
      step: "2",
      title: "Customize Your Meals",
      description:
        "Pick your preferred meal types, delivery days, and let us know about any allergies or restrictions.",
      icon: <ClipboardDocumentListIcon className="h-8 w-8" />,
    },
    {
      step: "3",
      title: "We Deliver Fresh",
      description:
        "Our team prepares and delivers fresh, healthy meals right to your doorstep on your chosen schedule.",
      icon: <TruckIcon className="h-8 w-8" />,
    },
    {
      step: "4",
      title: "Enjoy & Stay Healthy",
      description:
        "Simply heat and enjoy your delicious, nutritious meals. Track your health journey with us!",
      icon: <HeartIcon className="h-8 w-8" />,
    },
  ];

  return (
    <section className="bg-gray-50 py-16" id="how-it-works">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started with SEA Catering is simple. Follow these easy steps
            to begin your healthy eating journey.
          </p>
        </div>

        {/* Desktop Layout with connecting lines */}
        <div className="hidden lg:flex justify-between items-start">
          {steps.map((step, index) => (
            <div key={index} className="relative flex-1 text-center px-4">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-1/2 w-full h-0.5 bg-green-200 z-10" />
              )}

              <div className="relative inline-block mb-6">
                {/* Main Icon Circle */}
                <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto relative z-20 shadow-lg">
                  {step.icon}
                </div>
                {/* Step Number */}
                <div className="absolute -top-2 -left-2 bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold border-2 border-white shadow-md z-30">
                  {step.step}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-green-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile & Tablet Layout */}
        <div className="block lg:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm"
              >
                <div className="flex-shrink-0 relative">
                  {/* Main Icon Circle */}
                  <div className="bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center relative z-20">
                    {step.icon}
                  </div>
                  {/* Step Number */}
                  <div className="absolute -top-2 -left-2 bg-green-100 text-green-700 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold border-2 border-white z-30">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="/subscription"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 text-lg"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
