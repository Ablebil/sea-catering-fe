import {
  HeroSection,
  FeaturesSection,
  WelcomeSection,
  HowItWorksSection,
  WhyChooseUsSection,
  TestimonialSection,
  CTASection,
} from "../components";

const HomePage = () => {
  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-800">
      <HeroSection />

      <section className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <FeaturesSection />
        <WelcomeSection />
      </section>

      <HowItWorksSection />
      <WhyChooseUsSection />
      <TestimonialSection />
      <CTASection />
    </main>
  );
};

export default HomePage;
