import {
  HeroSection,
  FeaturesSection,
  WelcomeSection,
  Footer,
} from "../components";

const HomePage = () => {
  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-800">
      <HeroSection />
      <section className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <FeaturesSection />
        <WelcomeSection />
      </section>
      <Footer />
    </main>
  );
};

export default HomePage;
