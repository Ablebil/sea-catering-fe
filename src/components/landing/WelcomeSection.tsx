const WelcomeSection = () => {
  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col justify-center rounded-xl p-0 md:p-0 shadow-none">
      <h2 className="text-3xl font-bold text-green-800 mb-4">
        Welcome to SEA Catering!
      </h2>
      <p className="text-lg leading-relaxed text-gray-700 mb-6">
        SEA Catering provides{" "}
        <span className="font-semibold text-green-700">
          customizable healthy meal plans
        </span>{" "}
        delivered right to your door, anywhere in Indonesia. Our mission is to
        make eating healthy easy, accessible, and delicious for everyone. Join
        thousands who have made the switch to a healthier lifestyle with us!
      </p>
      <button
        onClick={scrollToHowItWorks}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 w-fit text-lg cursor-pointer"
      >
        How It Works
      </button>
    </div>
  );
};

export default WelcomeSection;
