import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  const features = [
    {
      title: "Customizable Meal Plans",
      description:
        "Tailor your meals to match your dietary preferences and lifestyle needs.",
    },
    {
      title: "Nationwide Delivery",
      description:
        "We deliver to all major cities across Indonesia with fast and reliable service.",
    },
    {
      title: "Nutritional Transparency",
      description:
        "Every meal comes with detailed nutritional information to help you make informed choices.",
    },
  ];

  return (
    <div className="flex flex-col space-y-6">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default FeaturesSection;
