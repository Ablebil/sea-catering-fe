import {
  ShieldCheckIcon,
  StarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  HeartIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const WhyChooseUsSection = () => {
  const benefits = [
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: "Quality Guaranteed",
      description:
        "Fresh, high-quality ingredients sourced from trusted local suppliers with strict quality control.",
    },
    {
      icon: <StarIcon className="h-8 w-8" />,
      title: "Expert Nutritionists",
      description:
        "Meals designed by certified nutritionists to ensure balanced nutrition and delicious taste.",
    },
    {
      icon: <ClockIcon className="h-8 w-8" />,
      title: "Time Saving",
      description:
        "No more meal planning, grocery shopping, or cooking. Get 5+ hours back in your week.",
    },
    {
      icon: <CurrencyDollarIcon className="h-8 w-8" />,
      title: "Affordable Plans",
      description:
        "Competitive pricing with flexible subscription options. Cancel or pause anytime.",
    },
    {
      icon: <HeartIcon className="h-8 w-8" />,
      title: "Health Focused",
      description:
        "Support your fitness goals with macro-balanced meals and detailed nutritional information.",
    },
    {
      icon: <TruckIcon className="h-8 w-8" />,
      title: "Reliable Delivery",
      description:
        "On-time delivery across Indonesia with eco-friendly packaging and temperature control.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-900 mb-4">
            Why Choose SEA Catering?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have transformed their
            eating habits with our premium meal delivery service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl border border-green-100 hover:border-green-300 hover:shadow-lg transition duration-300"
            >
              <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-green-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
