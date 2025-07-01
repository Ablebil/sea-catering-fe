import heroImage from "../../assets/hero-image.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden mb-12">
      <img
        src={heroImage}
        alt="Healthy meals from SEA Catering"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-900/70 via-green-900/40 to-green-900/10 z-10" />

      <div className="absolute inset-0 flex flex-col justify-center pl-12 md:pl-20 text-left z-20">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-white drop-shadow-[0_2px_8px_rgba(16,64,16,0.7)]">
          SEA Catering
        </h1>
        <p className="text-2xl md:text-3xl mb-6 text-green-100 drop-shadow-[0_2px_8px_rgba(16,64,16,0.7)]">
          Healthy Meals, Anytime, Anywhere
        </p>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 w-fit text-lg cursor-pointer"
          onClick={() => navigate("/meal-plans")}
        >
          See Pricing & Plans
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
